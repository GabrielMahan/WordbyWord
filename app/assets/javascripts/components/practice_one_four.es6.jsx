class PracticeOneFour extends React.Component {
  constructor() {
    super();
    this.state = {
      beingDragged: <div> ***This takes a component***</div>,
      sentence: [],
      objects: [],
      nextSet: {},
      allCorrect: false,
      objectsCorrect: false,
      displayFeedback: false,
      objectPromptId: 0
    }
    this.dropIn1 = this.dropIn1.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.replaceWord = this.replaceWord.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.loadNext = this.loadNext.bind(this);
  }

  componentDidMount() {
    $.get('/UnitOneSentence').done((response)=> {
      this.setState({
        sentence: response.sentence,
        objects: response.objects,
        objectPromptId: response.object_prompt_id
        })
    })
    $.get('/UnitOneSentence').done((response) => {
      this.setState({nextSet: response})
    })
  }

  loadNext(ev) {
    ev.preventDefault();
    this.setState({
      objects: this.state.nextSet.objects,
      sentence: this.state.nextSet.sentence,
      objectPromptId: this.state.nextSet.object_prompt_id,
      allCorrect: false,
      objectsCorrect: false,
      displayFeedback: false
    })
    $.get('/UnitOneSentence').done((response)=> {
      this.setState({nextSet: response})
    })
    this.refs.objectBox.innerHTML = ""
  }

  replaceWord(ev) {
    if (this.state.beingDragged.innerText === ev.target.innerText) {
      ev.preventDefault();
      var dragged = this.state.beingDragged
      dragged.className = "draggable"
      ev.target.appendChild(dragged)
    }
  }

  dragStart(ev) {
    this.setState({
      beingDragged: ev.target
    })
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dropIn1(ev) {
    ev.preventDefault();
    var dragged = this.state.beingDragged
    dragged.className = "inBox"
    ev.target.appendChild(dragged)
  }

  handleSubmit(event) {
    event.preventDefault();
    var wordsInObjectBox = Array.from(this.refs.objectBox.children).map(function(element) {
      return element.innerText
    })
    var instantFeedback = {objects: false}
    if (wordsInObjectBox.sort().join() === this.state.objects.sort().join() ) {
      this.setState({ allCorrect: true, objectsCorrect: true })
    }
      if (this.state.displayFeedback === false) {
        $.post('/UnitOne/Attempts',
            { attempts:
              {
                objects:
                  {
                    correct: this.state.objectsCorrect,
                    prompt_id: this.state.objecPromptId
                  }
              }
            }
        )
      }
    this.setState({ displayFeedback: true })
  }

  render() {
    return (
      <div>
        { this.state.displayFeedback ?
          <div id="feedback"> { this.state.allCorrect ?
              <div id="allRight"> you got it!!! </div>
              : <div> So close! View your feedback below  </div>
          }
          { this.state.objectsCorrect ?
            <div className="feedbackMsg"> You got all the objects correct </div>
            : <div>
            Your subject box wasn't quite right. { this.refs.objectBox.children.length > 0 ?
            <div> You included {Array.from(this.refs.objectBox.children).map(function(worddiv) {
                return <div className="littleFeedbackWord"> {worddiv.innerText} </div>
              })} </div> :  <div> </div> }

              The correct contents were {this.state.objects.map(function(word) {
                return <div className="littleFeedbackWord"> {word} </div>
              })}
            </div>
          }
      </div>
      : <div id="openingPrompt"> Find the Subjects and Verbs in the sentence below</div>
  }
        <div id="problemContainer">
          <div id='boxContainer'>
            <div className='boxHeader'>Objects</div>
            <div ref="objectBox" id="dropBox1" className="dropBoxes" onDrop={this.dropIn1} onDragOver={this.allowDrop}>
            </div>
          </div>
        </div>

        {this.state.allCorrect ?
          <div id="proceedeMsg"> <a onClick={this.loadNext} href="/next"> go on to the next question! </a></div>
          :
          <div id="wordBox">
            <div id="promptWrap">
              Drag the subject(s) into the subject box, and drag the verb(s) into the verb box.
            </div>
            <div id="sentenceWrap">
              <h3> Sentence: <em>"{ this.state.sentence.join(" ") }"</em></h3>
            </div>
            <div id="submitContainer" >
              <a href="/submit" onClick={this.handleSubmit}> submit </a>
            </div>
            {this.state.sentence.map( (word, i) => {
              return <Word key= { i } dragFunction={ this.dragStart } allowDrop={this.allowDrop} reDrop={this.replaceWord} word={ word } />
            })}
          </div>
      }
      </div>
    )
  }
}
