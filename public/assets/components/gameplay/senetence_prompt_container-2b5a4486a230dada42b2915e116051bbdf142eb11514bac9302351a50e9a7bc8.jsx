class SentencePromptContainer extends React.Component {

  render() {
    return (
      <div id="wordBox">
        <div id="sentenceWrap">
          <h3 className="sentence"> Sentence: <em>"{ this.props.sentence.join(" ") }"</em></h3>
        </div>

        {this.props.sentence.map( (word, i) => {
          return <Word key= { i } dragFunction={ this.props.dragStart } allowDrop={this.props.allowDrop} reDrop={this.props.replaceWord} word={ word } />
        })}
      </div>
    )
  }
}
