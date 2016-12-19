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
    };
    this.dragStart = this.dragStart.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadNext = loadNext.bind(this);
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

  dragStart(ev) {
    this.setState({
      beingDragged: ev.target
    })
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
                    lessonId={this.props.lessonId}

                    subjects={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.svos.subjects : null }
                    subjectsCorrect={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.svoFeedback.subjectsCorrect : null }
                    subjectsIncluded={ ['1','3','5'].indexOf(this.props.lessonId) >= 0 ? this.refs.dropBoxes.refs.subjectBox.children : null }

                    verbs={ ['2','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.svos.verbs : null }
                    verbsCorrect={ ['2','3','5'].indexOf(this.props.lessonId) >= 0 ? this.state.svoFeedback.verbsCorrect : null }
                    verbsIncluded={ ['2','3','5'].indexOf(this.props.lessonId) >= 0 ? this.refs.dropBoxes.refs.verbBox.children : null }

                    objects={ ['4','5'].indexOf(this.props.lessonId) >= 0 ? this.state.svos.objects : null }
                    objectsCorrect={ ['4','5'].indexOf(this.props.lessonId) >= 0 ? this.state.svoFeedback.objectsCorrect : null }
                    objectsIncluded={ ['4','5'].indexOf(this.props.lessonId) >= 0 ? this.refs.dropBoxes.refs.objectBox.children : null }
                  />
                : null
                }

                {this.state.allCorrect
                  ? null
                  : <SentencePromptContainer
                      handleSubmit={this.handleSubmit}
                      sentence={this.state.sentence}
                      dragStart={this.dragStart}
                      replaceWord={this.replaceWord}
                      beingDragged={this.state.beingDragged}
                    />
                }

              </div>
              <div className="card-action">
                {this.state.allCorrect
                  ? <a className="waves-effect waves-light btn" onClick={this.loadNext} href="/next"> Next&#8594;</a>
                  : <a href="" className="waves-effect waves-light btn" onClick={this.handleSubmit}> submit </a> }
              </div>
            </div>
            <StatusBar
              streak={this.state.streak}
              totalCorrect={this.state.totalCorrect}
              totalAttempts={this.state.totalAttempts} />
          </div>

          <div className="col s6">
            <DropBoxes
              ref="dropBoxes"
              lessonId={this.props.lessonId}
              beingDragged={this.state.beingDragged}
              lessonId={this.props.lessonId}
             />
          </div>

          <Glossary />
        </div>
      </div>
    </div>
    )
  }
}
