class SentencePromptContainer extends React.Component {
  constructor(){
    super()
    this.dropInDropBox = this.dropInDropBox.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.replaceWord = this.replaceWord.bind(this);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dropInDropBox(ev) {
    ev.preventDefault();
    let dragged = this.props.beingDragged
    dragged.className = "draggable inBox"
    ev.target.appendChild(dragged)
  }

  replaceWord(ev) {
    if (this.props.beingDragged.innerText === ev.target.innerText) {
      ev.preventDefault();
      var dragged = this.props.beingDragged
      dragged.className = "draggable inPrompt"
      ev.target.appendChild(dragged)
    }
  }


  render() {
    return (
      <div id="wordBox">
        <div id="sentenceWrap">
          {this.props.displayFeedback
            ? null
            : <h3 className="sentence"> Sentence: <em>"{ this.props.sentence.join(" ") }"</em></h3>
          }
        </div>

        {this.props.sentence.map( (word, i) => {
          return <Word
                    key= { i }
                    dragFunction={ this.props.dragStart }
                    allowDrop={this.allowDrop}
                    reDrop={this.replaceWord}
                    word={ word }
                  />
        })}
      </div>
    )
  }
}
