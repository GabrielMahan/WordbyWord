class FeedbackMessage extends React.Component {


  render() {
    return(
      <div>
        { this.props.correct ?
          <div className="" id=""> You got all the {this.props.wordPart} correct. </div>
        : <div className="" id="">
            Your {this.props.wordPart} box wasn't quite right.
            { this.props.included.length > 0
              ? <div> You included {Array.from(this.props.included).map(function(worddiv) {
                    return <div className="littleFeedbackWord"> {worddiv.innerText} </div>
                  })} </div>
              : null
            }

            The correct contents were {this.props.required.map(function(word) {
              return <div className=""> {word} </div>
            })}
          </div>
        }
      </div>
    )
  }
}
