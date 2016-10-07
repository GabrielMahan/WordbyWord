class PracticeOneTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      beingDragged: <div> ***This takes a component***</div>,
      sentence: [],
      subjects: [],
      verbs: [],
      objects: [],
      nextSet: {},
      allCorrect: false,
      subjectsCorrect: false,
      verbsCorrect: false,
      objectsCorrect: false,
      displayFeedback: false,
      verbPromptId: 0,
      subjectPromptId: 0,
      objecPromptId: 0,
      streak: 0,
      totalCorrect: 0,
      totalAttempts: 0
    }

    this.dragStart = this.dragStart.bind(this)
    this.dropIn2 = this.dropIn2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.replaceWord = this.replaceWord.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.loadNext = this.loadNext.bind(this)
  }

  componentDidMount() {
    $.get('/2/UnitOneSentence').done((response)=> {
      this.setState({
        sentence: response.sentence,
        subjects: response.subjects,
        verbs: response.verbs,
        objects: response.objects,
        verbPromptId: response.verb_prompt_id,
        subjectPromptId: response.subject_prompt_id,
        objecPromptId: response.object_prompt_id
        })
    })
    $.get('/2/UnitOneSentence').done((response) => {
      this.setState({nextSet: response})
    })

  }

  componentWillUpdate() {
    var streakURL = `/units/${this.props.unitId}/lessons/${this.props.lessonId}/attempts/streak`
    $.get(streakURL).done((response) => {
      if (this.state.totalAttempts != response.totalAttempts) {
        this.setState({streak: response.streak, totalCorrect: response.totalCorrect, totalAttempts: response.totalAttempts})
      }
    })
  }

  loadNext(ev) {
    ev.preventDefault();
    this.setState({
      sentence: this.state.nextSet.sentence,
      verbs: this.state.nextSet.verbs,
      subjects: this.state.nextSet.subjects,
      obejcts: this.state.nextSet.objects,
      verbPromptId: this.state.nextSet.verb_prompt_id,
      subjectPromptId: this.state.nextSet.subject_prompt_id,
      objecPromptId: this.state.nextSet.object_prompt_id,
      allCorrect: false,
      subjectsCorrect: false,
      verbsCorrect: false,
      displayFeedback: false
    })
    $.get('/2/UnitOneSentence').done((response)=> {
      this.setState({nextSet: response})
    })
    this.refs.verbBox.innerHTML = "";
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

  dropIn2(ev) {
      ev.preventDefault();
      var dragged = this.state.beingDragged
      dragged.className = "inBox"
      ev.target.appendChild(dragged)
  }

  handleSubmit(event) {
    event.preventDefault();

    var wordsInVerbBox = Array.from(this.refs.verbBox.children).map(function(element) {
      return element.innerText
    })
    var instantFeedback = {subjects: false, verbs: false, objects: false}

    if (wordsInVerbBox.sort().join() === this.state.verbs.sort().join())  {
      this.setState({ allCorrect: true, verbsCorrect: true })
      instantFeedback.verbs = true
    }
    if (this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts',
                {attempts:
                  {verbs:
                      {
                        correct: instantFeedback.verbs,
                        prompt_id: this.state.verbPromptId
                      }
                  }
                })
              }
    this.setState({ displayFeedback: true })
  }

  render() {
    return (
      <div>
      <NavBar/>
        { this.state.displayFeedback ?
          <div id="feedback"> { this.state.allCorrect ?
            <div id="allRight"> You got it! </div>
            : <div id="notRight"> Incorrect. View your feedback below.  </div>
          }

          { this.state.verbsCorrect ?
            <div className="feedbackMsg" id="message-single"> you got all the verbs correct </div>
            : <div className="feedbackMsg" id="message-single">
            Your verb box wasn't quite right. { this.refs.verbBox.children.length  ? <div> You included {Array.from(this.refs.verbBox.children).map(function(word) {
              return <div className="littleFeedbackWord"> {word.innerText} </div>
            })} </div> :  <div> </div> }

            The correct contents were {this.state.verbs.map(function(word) {
              return <div className="littleFeedbackWord"> {word} </div>
            })}
          </div>
        }
      </div>

      : <div id="openingPrompt"> Find the verbs in the sentence below</div>
  }


        <div id="problemContainer">
          <div className="boxContainer" id='boxContainer-single'>
            <div className='boxHeader' id='boxHeader-single'>Verbs</div>
            <div ref="verbBox" className="dropBox" id="dropBox-single" onDrop={this.dropIn2} onDragOver={this.allowDrop}>
            </div>
          </div>
          <StatusBar streak={this.state.streak} totalCorrect={this.state.totalCorrect} totalAttempts={this.state.totalAttempts} />
        </div>
        {this.state.allCorrect ?
          <div id="proceedeMsg"> <a onClick={this.loadNext} href="/next">Next&#8594; </a></div>
          :
          <div id="wordBox">
            <div id="promptWrap">
              Drag the verb(s) into the verb box.
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
