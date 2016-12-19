class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {s: false, v: false, o: false}
  }

  componentDidMount() {
    if (['1','3','5'].indexOf(this.props.lessonId) >= 0) {
      this.setState({s: true})
    }
    if (['2','3','5'].indexOf(this.props.lessonId) >= 0) {
      this.setState({v: true})
    }
    if (['4','5'].indexOf(this.props.lessonId) >= 0) {
      this.setState({o: true})
    }

    // debugger;
  }

  render() {
    return (
      <div id="feedback">
        { this.props.allCorrect
          ? <div> You got it! </div>
          : <div> Incorrect. View your feedback below. </div>
        }

        {this.state.s
          ? <FeedbackMessage
              correct={this.props.subjectsCorrect}
              wordPart="subjects"
              included={this.props.subjectsIncluded}
              required={this.props.subjects}
            />
          : null
        }

        {this.state.v
          ?  <FeedbackMessage
              correct={this.props.verbsCorrect}
              wordPart="verbs"
              included={this.props.verbsIncluded}
              required={this.props.verbs}
            />
          : null
        }

        {this.state.o
          ?  <FeedbackMessage
              correct={this.props.objectsCorrect}
              wordPart="objects"
              included={this.props.objectsIncluded}
              required={this.props.objects}
            />
          : null
        }
      </div>
    )
  }
}
