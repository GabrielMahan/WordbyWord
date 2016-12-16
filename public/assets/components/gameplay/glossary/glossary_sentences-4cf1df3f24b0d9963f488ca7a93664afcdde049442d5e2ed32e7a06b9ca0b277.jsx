class GlossarySentences extends React.Component {
  constructor() {
    super()
    this.state = {displayContent: true}
    this.showState = this.showState.bind(this)
  }

  showState() {
    console.log(this.state.displayContent)
  }
  render() {
    return (
      <div className="activeGlossary">
{this.state.displayContent ?      <div onClick={this.showState}>
        <h1> What's a Sentence? </h1>
        <h3> Sentences are words that say a single, totally complete thought. </h3>
        <div className="glossaryEmphasis">
          "Alberto runs fast."
        </div>
        The subject in a simple English sentence such as John runs,
        John is a teacher, or John was hit by a car is the person or thing about
        whom the statement is made, in this case 'John'. Traditionally the subject is
        the word or phrase which controls the verb in the clause, that is to say with which
        the verb agrees (John is but John and Mary are). If there is no verb, as in John - what an idiot!,
        or if the verb has a different subject, as in John - I can't stand him!, then 'John' is not considered
        to be the grammatical subject, but can be described as the 'topic' of the sentence.

      
      </div>
: <div> </div> }
      </div>
    )
  }
}
