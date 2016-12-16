class GlossaryObjects extends React.Component {
  constructor() {
    super()
    this.state = {displayContent: false}
  }
  render() {
    return (
      <div className="activeGlossary">
{this.state.displayContent ? <div>
        Traditional grammar defines the object in a sentence as the entity that is acted upon by the subject.[1]
         There is thus a primary distinction between subjects and objects that is understood in terms of the
          action expressed by the verb, e.g. Tom studies grammar - Tom is the subject and grammar is the object.
           Traditional theories of sentence structure divide the simple sentence into a subject and a predicate,[2]
            whereby the object is taken to be part of the predicate.[3] Many modern theories of grammar (e.g.
               dependency grammars), in contrast, take the object to be a verb argument like the subject, the
                difference between them being mainly just their prominence; the subject is ranked higher than the
                 object and is thus more prominent.[4]
The main verb in a clause determines whether and what objects are present. Transitive verbs require the presence of
 an object, whereas intransitive verbs block the appearance of an object.[5] The term complement overlaps in
  meaning with object: all objects are complements, but not vice versa. The objects that verbs do and do not take
   is explored in detail in valency theory </div>
 : <div> </div>}

      </div>
    )
  }
}
