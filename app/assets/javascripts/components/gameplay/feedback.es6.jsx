class Feedback extends React.Component {


  render() {
    return (
      <div id="feedback">
        { this.props.allCorrect ?
            <div id="allRight"> You got it! </div>
        :
            <div id="notRight"> Incorrect. View your feedback below.  </div>
        }

        { this.props.subjectsCorrect ?
            <div className="feedbackMsg" id="message-single"> You got all the subjects correct. </div>
        :
            <div className="feedbackMsg" id="message-single">
              Your subject box wasn't quite right.
              { this.props.subjectsIncluded.length > 0 ?
                  <div> You included {Array.from(this.props.subjectsIncluded).map(function(worddiv) {
                      return <div className="littleFeedbackWord"> {worddiv.innerText} </div>
                    })} </div> :  <div> </div> }

                The correct contents were {this.props.subjects.map(function(word) {
                  return <div className="littleFeedbackWord"> {word} </div>
                })}
            </div>
        }

      </div>
    )
  }
}
