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
    this.dropInDropBox = this.dropInDropBox.bind(this);
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
    if (  ['1','3','5'].indexOf(this.props.lessonId) >= 0) {
      this.refs.subjectBox.innerHTML = '' ;
    }
    if (  ['2','3','5'].indexOf(this.props.lessonId) >= 0) {
      this.refs.verbBox.innerHTML = '';
    }
    if (  ['4','5'].indexOf(this.props.lessonId) >= 0 ) {
      this.refs.objectBox.innerHTML = '';
    }
  }


  replaceWord(ev) {
    if (this.state.beingDragged.innerText === ev.target.innerText) {
      ev.preventDefault();
      var dragged = this.state.beingDragged
      dragged.className = "draggable inPrompt"
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

  dropInDropBox(ev) {
    ev.preventDefault();
    var dragged = this.state.beingDragged
    dragged.className = "draggable inBox"
    ev.target.appendChild(dragged)
  }


  render() {
    return (
      <div>
        <NavBar userSignedIn={this.props.userSignedIn} />
        <div className="unitOneContainer">

        <div className="row">
          <div className="col s6">
            <div className="card large">
              <div className="card-content">
                <span className="card-title">Sort the words in the sentence</span>

                { this.state.displayFeedback ?
                  <Feedback

                    allCorrect={this.state.allCorrect}
                    subjects={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.subjects : null }
                    subjectsCorrect={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.subjectsCorrect : null }
                    subjectsIncluded={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.refs.subjectBox.children : null }

                    verbs={ ['2','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.subjects : null }
                    verbsCorrect={ ['2','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.subjectsCorrect : null }
                    verbsIncluded={ ['2','3','5'].indexOf(this.props.lessonId) >= 0 ? this.refs.subjectBox.children : null }

                    objects={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.subjects : null }
                    objectsCorrect={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.subjectsCorrect : null }
                    objectsIncluded={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.refs.subjectBox.children : null }

                  />
                : null
                }

                {this.state.allCorrect
                  ? null
                  : <SentencePromptContainer
                      handleSubmit={this.handleSubmit}
                      sentence={this.state.sentence}
                      dragStart={this.dragStart}
                      allowDrop={this.allowDrop}
                      replaceWord={this.replaceWord}
                    />
                }

              </div>
              <div className="card-action">
                {this.state.allCorrect
                  ? <a className="waves-effect waves-light btn" onClick={this.loadNext} href="/next"> Next&#8594;</a>
                  : <a href="" className="waves-effect waves-light btn" onClick={this.handleSubmit}> submit </a> }
              </div>
            </div>
            <StatusBar streak={this.state.streak} totalCorrect={this.state.totalCorrect} totalAttempts={this.state.totalAttempts} />
          </div>

          <div className="col s6">
            <div className="dropBoxContainer" id=''>
              { ['1','3','5'].indexOf(this.props.lessonId) >= 0
                ? <div className="card small">
                    <span className="card-title senLabel">Subjects</span>
                    <div
                      className="card-content senDb"
                      onDrop={this.dropInDropBox}
                      onDragOver={this.allowDrop}
                      ref="subjectBox">
                    </div>
                  </div>
                : null
              }
              { ['2','3','5'].indexOf(this.props.lessonId)  >= 0 ?
                  <div className="card small">
                    <span className="card-title senLabel">Verbs</span>
                    <div className="card-content senDb" onDrop={this.dropInDropBox} onDragOver={this.allowDrop} ref="verbBox" />
                  </div>

                : null
              }
              { ['4','5'].indexOf(this.props.lessonId) >= 0 ?
                <div className="card small">
                  <span className="card-title senLabel">Objects</span>
                  <div className="card-content senDb" onDrop={this.dropInDropBox} onDragOver={this.allowDrop} ref="objectBox" />
                </div>
                : null
              }
            </div>
          </div>

          <Glossary />
        </div>
      </div>
    </div>
    )
  }
}
