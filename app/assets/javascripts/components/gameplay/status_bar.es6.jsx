class StatusBar extends React.Component {
  render() {
      return (
        <div className="card-panel">
          <div className="statusData">

            <span> 	&#9734; Hot Streak: {this.props.streak} </span>
            <span>  Total Correct: {this.props.totalCorrect} </span>
            <span> Total Attempts: {this.props.totalAttempts}</span>

          </div>
        </div>
      )
  }
}
