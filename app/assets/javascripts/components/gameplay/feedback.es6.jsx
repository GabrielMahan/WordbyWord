class Feedback extends React.Component {


  render() {
    return (
      <div id="feedback">
        { this.props.allCorrect ?
          <div> You got it! </div>
        :
          <div> Incorrect. View your feedback below. </div>
        }


        <FeedbackMessage
          correct={this.props.subjectsCorrect}
          wordPart="subjects" included={this.props.subjectsIncluded}
          required={this.props.subjects}
        />

        <FeedbackMessage
          correct={this.props.verbsCorrect}
          wordPart="subjects" included={this.props.verbsIncluded}
          required={this.props.verbs}
        />

        <FeedbackMessage
          correct={this.props.objectsCorrect}
          wordPart="subjects" included={this.props.objectsIncluded}
          required={this.props.objects}
        />


      </div>
    )
  }
}
