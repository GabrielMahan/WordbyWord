class Word extends React.Component {

  componentDidMount() {
    // debugger;
  }
  render()  {
    return (

          <div className="dragFootprint" onDrop={this.props.reDrop} onDragOver={this.props.allowDrop}>
            {this.props.word}
            <div className="draggable" draggable="true" onDragStart={this.props.dragFunction} >
              {this.props.word}
            </div>
          </div>
    )
  }
}
