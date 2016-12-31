class FeedbackMessage extends React.Component {


  render() {
    return(
      <div className="row compact">
        { this.props.correct ?
          <div className="col" id=""> You got all the {this.props.wordPart} correct. </div>
        : <div className="row compact" id="">

            <div className="row compact">
              Your {this.props.wordPart} box wasn't quite right.
            </div>

            <div className="row compact">
              { this.props.included.length > 0
                ? <div className="col"> You included {Array.from(this.props.included).map((worddiv) => {
                  return <div className="chip">
                            <i className="material-icons done">{ this.props.required.indexOf(worddiv.innerText) > -1 ? "thumb_up" : "thumb_down"}</i>
                            {worddiv.innerText}
                          </div>
                })} </div>
                : null
              }
              <div className="col">
                The correct contents were {this.props.required.map((word) => {
                  return <div className="chip"> {word} </div>
                })}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
