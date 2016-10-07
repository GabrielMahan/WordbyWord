
// import { handleSubmit } from 'hs'
class UnitOne extends React.Component {
  constructor() {
    super();
    this.state = {
      beingDragged: <div>***</div>,
      sentence: [],
      svos: {
        subjects: [],
        verbs: [],
        objects: []
      },
      nextSet: {},
      allCorrect: false,
      svoFeedback: {
        subjectsCorrect: false,
        verbsCorrect: false,
        objectsCorrect: false
      },
      displayFeedback: false,
      svoIds: {
        verbPromptId: 0,
        subjectPromptId: 0,
        objectPromptId: 0
      }
    }
    this.dropIn1 = this.dropIn1.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.replaceWord = this.replaceWord.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadNext = this.loadNext.bind(this);

  }

  componentDidMount() {
    $.get(`/${this.props.lessonId}/UnitOneSentence`).done((response)=> {
      this.setState({
        sentence: response.sentence,
        svos: response.svos,
        svoIds: response.svoIds
      });
    });
    $.get(`/${this.props.lessonId}/UnitOneSentence`).done((response) => {
      this.setState({nextSet: response})
    });
    debugger;
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
      svos: this.state.nextSet.svos,
      svoIds: this.state.nextSet.svoIds,
      allCorrect: false,
      displayFeedback: false,
      svoFeedback: {
        subjectsCorrect: false,
        verbsCorrect: false,
        objectsCorrect: false
      }
    })
    $.get(`/${this.props.lessonId}/UnitOneSentence`).done((response)=> {
      this.setState({nextSet: response})
    })
    this.refs.subjectBox.innerHTML = "";
    this.refs.verbBox.innerHTML = "";
    this.refs.objectBox.innerHTML = "";
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


  render() {
    return (
      <div>
        <NavBar/>
          { this.state.displayFeedback ?
            <Feedback allCorrect={this.state.allCorrect}  subjects={this.state.subjects} subjectsCorrect={this.state.subjectsCorrect} subjectsIncluded={this.refs.subjectBox.children}  />
          :
            <div id="openingPrompt"> Find the Subjects in the sentence below </div>
          }

          {this.state.allCorrect ?
            <div id="proceedeMsg"> <a onClick={this.loadNext} href="/next"> Next&#8594;</a></div>
            :
            <SentencePromptContainer handleSubmit={this.handleSubmit} sentence={this.state.sentence} dragStart={this.dragStart} allowDrop={this.allowDrop} replaceWord={this.replaceWord} />
          }


          <div id="problemContainer">


            <div className="boxContainer" id='boxContainer-triple'>
              { ['1','3','5'].indexOf(this.props.lessonId) >= 0 ?
                <div className='boxHeader' id='boxHeader-triple'>Subjects
                  <div ref="subjectBox" id="dropBox1-triple" className="dropBox" onDrop={this.dropIn1} onDragOver={this.allowDrop}></div>
                </div>
                : null
              }
              { ['2','3','5'].indexOf(this.props.lessonId)  >= 0 ?
                <div className='boxHeader' id='boxHeader-triple'>Verbs
                  <div ref="verbBox" id="dropBox2-triple" className="dropBox" onDrop={this.dropIn1} onDragOver={this.allowDrop}></div>
                </div>
                : null
              }
              { ['4','5'].indexOf(this.props.lessonId) >= 0 ?
                <div className='boxHeader' id='boxHeader-triple'>objects
                  <div ref="objectBox" id="dropBox3-triple" className="dropBox" onDrop={this.dropIn1} onDragOver={this.allowDrop}></div>
                </div>
                : null
              }
            </div>


            <StatusBar streak={this.state.streak} totalCorrect={this.state.totalCorrect} totalAttempts={this.state.totalAttempts} />
            <Glossary />
          </div>

      </div>
    )
  }
}
