class PracticeOneThree extends React.Component {
  constructor() {
    super();
    this.state = {
      beingDragged: <div> ***This takes a component***</div>,
      sentence: [],
      subjects: [],
      verbs: [],
      nextSet: {},
      allCorrect: false,
      subjectsCorrect: false,
      verbsCorrect: false,
      displayFeedback: false,
      verbPromptId: 0,
      subjectPromptId: 0,
      streak: 0,
      totalCorrect: 0,
      totalAttempts: 0
    }
    this.dropIn1 = this.dropIn1.bind(this)
    this.dragStart = this.dragStart.bind(this)
    this.dropIn2 = this.dropIn2.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.replaceWord = this.replaceWord.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.loadNext = this.loadNext.bind(this);
  }

  componentDidMount() {
    $.get('/3/UnitOneSentence').done((response)=> {
      this.setState({
        sentence: response.sentence,
        subjects: response.subjects,
        verbs: response.verbs,
        verbPromptId: response.verb_prompt_id,
        subjectPromptId: response.subject_prompt_id,
        })
    })
    $.get('/3/UnitOneSentence').done((response) => {
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
      verbPromptId: this.state.nextSet.verb_prompt_id,
      subjectPromptId: this.state.nextSet.subject_prompt_id,
      objecPromptId: this.state.nextSet.object_prompt_id,
      allCorrect: false,
      subjectsCorrect: false,
      verbsCorrect: false,
      displayFeedback: false
    })
    $.get('/3/UnitOneSentence').done((response)=> {
      this.setState({nextSet: response})
    })
    this.refs.subjectBox.innerHTML = "";
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

  dropIn1(ev) {
    ev.preventDefault();
    var dragged = this.state.beingDragged
    dragged.className = "inBox"
    ev.target.appendChild(dragged)
  }

  dropIn2(ev) {
      ev.preventDefault();
      var dragged = this.state.beingDragged
      dragged.className = "inBox"
      ev.target.appendChild(dragged)
  }
  handleSubmit(event) {
    event.preventDefault();
    var wordsInSubjectBox = Array.from(this.refs.subjectBox.children).map(function(element) {
      return element.innerText
    })
    var wordsInVerbBox = Array.from(this.refs.verbBox.children).map(function(element) {
      return element.innerText
    })

    var instantFeedback = {subjects: false, verbs: false, objects: false}
    if (wordsInVerbBox.sort().join() === this.state.verbs.sort().join() && wordsInSubjectBox.sort().join() === this.state.subjects.sort().join()) {
      this.setState({ allCorrect: true, subjectsCorrect: true, verbsCorrect: true })
      instantFeedback.subjects = true
      instantFeedback.verbs = true
    }
    else if (wordsInSubjectBox.sort().join() === this.state.subjects.sort().join()) {
      this.setState({subjectsCorrect: true})
      instantFeedback.subjects = true
    }
    else if (wordsInVerbBox.sort().join() === this.state.verbs.sort().join()) {
      this.setState({verbsCorrect: true})
      instantFeedback.verbs = true
    }
      if (this.state.displayFeedback === false) {
        $.post("/UnitOne/Attempts",
          {attempts:
            {
              verbs:
                {
                  correct: instantFeedback.verbs,
                  prompt_id: this.state.verbPromptId
                },
              subjects:
                {
                  correct: instantFeedback.subjects,
                  prompt_id: this.state.subjectPromptId
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
      <NavBar/>
        { this.state.displayFeedback ?
          <div id="feedback"> { this.state.allCorrect ?
            <div id="allRight"> You got it! </div>
            : <div id="notRight"> Incorrect. View your feedback below.  </div>
          }
          { this.state.subjectsCorrect ?
            <div className="feedbackMsg" id="message1"> You got all the subjects correct </div>
            : <div className="feedbackMsg" id="message1">
            Your subject box wasn't quite right. { this.refs.subjectBox.children.length > 0 ?
            <div> You included {Array.from(this.refs.subjectBox.children).map(function(worddiv) {
                return <div className="littleFeedbackWord"> {worddiv.innerText} </div>
              })} </div> :  <div> </div> }

              The correct contents were {this.state.subjects.map(function(word) {
                return <div className="littleFeedbackWord"> {word} </div>
              })}
            </div>
          }
          { this.state.verbsCorrect ?
            <div className="feedbackMsg" id="message2"> you got all the verbs correct </div>
            : <div className="feedbackMsg" id="message2">
            Your verb box wasn't quite right. { this.refs.verbBox.children.length  ? <div> You included {Array.from(this.refs.verbBox.children).map(function(word) {
              return <div className="littleFeedbackWord"> {word.innerText} </div>
            })} </div> :  <div> </div> }

            The correct contents were {this.state.verbs.map(function(word) {
              return <div className="littleFeedbackWord"> {word} </div>
            })}
          </div>
        }
      </div>

      :
      <div id="openingPrompt"> Find the subjects and verbs in the sentence below</div>
  }


        <div id="problemContainer">
          <div className="boxContainer" id='boxContainer-double'>
            <div className='boxHeader' id='boxHeader-double'>Subjects</div>
            <div className='boxHeader' id='boxHeader-double'>Verbs</div>
            <div ref="subjectBox" id="dropBox1-double" className="dropBox" onDrop={this.dropIn1} onDragOver={this.allowDrop}>
            </div>
            <div ref="verbBox" id="dropBox2-double" className="dropBox" onDrop={this.dropIn2} onDragOver={this.allowDrop}>
            </div>
          </div>
            <StatusBar streak={this.state.streak} totalCorrect={this.state.totalCorrect} totalAttempts={this.state.totalAttempts} />
        </div>
        {this.state.allCorrect ?
          <div>
            <div id="proceedeMsg"> <a id="nextLess" onClick={this.loadNext} href="/next"> Next&#8594; </a></div>
          </div>
          :
          <div id="wordBox">
            <div id="promptWrap">
              Drag the subject(s) into the subject box, and drag the verb(s) into the verb box.
            </div>
            <div id="sentenceWrap">
              <h3> Sentence: <em>"{ this.state.sentence.join(" ") }"</em></h3>
            </div>

              {this.state.sentence.map( (word, i) => {
              return <Word key= { i } dragFunction={ this.dragStart } allowDrop={this.allowDrop} reDrop={this.replaceWord} word={ word } /> })}

              <div id="submitContainer" >
                <a href="/submit" onClick={this.handleSubmit}> Submit </a>
              </div>
          </div>

      }


      </div>
    )
  }
}
