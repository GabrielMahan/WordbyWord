class SentencePromptContainer extends React.Component {

  render() {
    return (
      <div id="wordBox">
        <div id="promptWrap">
          Drag the subject(s) into the subject box, and drag the verb(s) into the verb box.
        </div>
        <div id="sentenceWrap">
          <h3 className="sentence"> Sentence: <em>"{ this.props.sentence.join(" ") }"</em></h3>
        </div>
        <div id="submitContainer" >
          <a href="/submit" onClick={this.props.handleSubmit}> submit </a>
        </div>
        {this.props.sentence.map( (word, i) => {
          return <Word key= { i } dragFunction={ this.props.dragStart } allowDrop={this.props.allowDrop} reDrop={this.props.replaceWord} word={ word } />
        })}
      </div>
    )
  }
}
