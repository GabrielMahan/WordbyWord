class DropBoxes extends React.Component {
  constructor(){
    super();
    this.dropInDropBox = this.dropInDropBox.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  dropInDropBox(ev) {
    ev.preventDefault();
    var dragged = this.props.beingDragged
    dragged.className = "draggable inBox"
    ev.target.appendChild(dragged)
  }


  render() {
    return(
      <div className="dropBoxContainer" id=''>
        { ['1','3','5'].indexOf(this.props.lessonId) >= 0
          ? <div className="card small shortDB">
              <span className="card-title senLabel">Subjects</span>
              <div
                className="card-content senDb"
                onDrop={this.dropInDropBox}
                onDragOver={this.allowDrop}
                ref="subjectBox">
              </div>
            </div>
          : null
        }
        { ['2','3','5'].indexOf(this.props.lessonId)  >= 0 ?
            <div className="card small shortDB">
              <span className="card-title senLabel">Verbs</span>
              <div
                className="card-content senDb"
                onDrop={this.dropInDropBox}
                onDragOver={this.allowDrop}
                ref="verbBox" />
            </div>

          : null
        }
        { ['4','5'].indexOf(this.props.lessonId) >= 0 ?
          <div className="card small shortDB">
            <span className="card-title senLabel">Objects</span>
            <div
              className="card-content senDb"
              onDrop={this.dropInDropBox}
              onDragOver={this.allowDrop}
              ref="objectBox"
            />
          </div>
          : null
        }
      </div>
    )
  }
}
