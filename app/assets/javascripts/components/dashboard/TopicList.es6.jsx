class TopicList extends React.Component {
  constructor() {
    super();
    this.state = {
      units: {}
    }
  }
  componentDidMount() {
    $.ajax({
      method: 'get',
      url: '/units/unit_list'
    }).done(function(response) {
      this.setState({
        units: response.units
      })
    }.bind(this))
  }
  render() {
    var linkPartOne = "/units/"
    var linkPartTwo = "/lessons/"
    return (
      <div id="topic-list">
      <h3> Topics </h3>
      { this.state.units.length > 0 ?
      <ol>
        {this.state.units.map((unit, index) => {
          return (
            <li>
              {unit.name}
              <ol>
                {unit.lessons.map((lesson, index) => {
                  return (
                    <li><a href={linkPartOne.concat(lesson.unit_id).concat(linkPartTwo).concat(lesson.id)}>{lesson.name}</a> </li>
                  )
                })}
              </ol>
            </li>
        )})}
        </ol>
      : null
      }
      </div>
    )
  }
}
