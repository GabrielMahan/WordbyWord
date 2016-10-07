class StatusBar extends React.Component {
  render() {
      return (
        <div id="status-bar">
          <ul>
            <li> 	&#9734; Hot Streak: {this.props.streak} </li>
            <li>  Total Correct: {this.props.totalCorrect} </li>
            <li> Total Attempts: {this.props.totalAttempts}</li>
          </ul>
        </div>
      )
  }
}
