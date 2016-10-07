class TeacherDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      teacher: {},
      teacherHasCohorts: false,
      teacherCohorts: [],
      lessons: [],
      addCohortButtonVisible: true,
      addAssignmentButtonVisible: true,
      addExistingCohortFormVisible: false,
      addNewCohortFormVisible: false,
      addAssignmentFormVisible: false,
      addCohortOptionVisible: false,
      errors: [],
      notices: [],
      loadingCohorts: true
    }
    this.showAddCohortButton = this.showAddCohortButton.bind(this);
    this.showAddAssignmentButton = this.showAddAssignmentButton.bind(this);
    this.hideAddCohortButton = this.hideAddCohortButton.bind(this);
    this.hideAddAssignmentButton = this.hideAddAssignmentButton.bind(this);
    this.toggleAddAssignmentForm = this.toggleAddAssignmentForm.bind(this);
    this.toggleAddCohortOption = this.toggleAddCohortOption.bind(this);
    this.toggleAddExistingCohortForm = this.toggleAddExistingCohortForm.bind(this);
    this.hideAddExistingCohortForm = this.hideAddExistingCohortForm.bind(this);
    this.toggleAddNewCohortForm = this.toggleAddNewCohortForm.bind(this);
    this.hideAddNewCohortForm = this.hideAddNewCohortForm.bind(this);
    this.handleExistingCohortFormSubmit = this.handleExistingCohortFormSubmit.bind(this);
    this.handleNewCohortFormSubmit = this.handleNewCohortFormSubmit.bind(this);
    this.handleAssignmentFormSubmit = this.handleAssignmentFormSubmit.bind(this);
    this.getTeacher = this.getTeacher.bind(this);
    this.getCohorts = this.getCohorts.bind(this);
    this.getLessons = this.getLessons.bind(this);
  }

  hideAddCohortButton() {
    this.setState({
      addCohortButtonVisible: false
    })
  }

  hideAddAssignmentButton() {
    this.setState({
      addAssignmentButtonVisible: false
    })
  }

  showAddCohortButton() {
    this.setState({
      addCohortButtonVisible: true
    })
  }

  showAddAssignmentButton() {
    this.setState({
      addAssignmentButtonVisible: true
    })
  }


  toggleAddCohortOption() {
    this.hideAddCohortButton();
    this.hideAddExistingCohortForm();
    this.hideAddNewCohortForm();
    this.setState({
      addCohortOptionVisible: !this.state.addCohortOptionVisible
    })
  }

  toggleAddExistingCohortForm() {
    this.hideAddNewCohortForm();
    this.setState({
      addExistingCohortFormVisible: !this.state.addExistingCohortFormVisible
    })
  }

  hideAddExistingCohortForm() {
    this.setState({
      addExistingCohortFormVisible: false
    })
  }


  toggleAddNewCohortForm() {
    this.hideAddExistingCohortForm();
    this.setState({
      addNewCohortFormVisible: !this.state.addNewCohortFormVisible
    })
  }

  hideAddNewCohortForm() {
    this.setState({
      addNewCohortFormVisible: false
    })
  }

  toggleAddAssignmentForm() {
    this.hideAddAssignmentButton();
    this.setState({
      addAssignmentFormVisible: !this.state.addAssignmentFormVisible
    })
  }

  handleExistingCohortFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: `/teachers/${this.props.teacherId}/cohorts`,
      data: $(event.target).serialize()
    }).done(function(response) {
      if (response.errors) {
        this.setState({
          errors: response.errors
        })
      }
      else {
        this.getTeacher();
        this.setState({
          errors: [],
          notices: response
        });
        this.refs.cohortAccessCode.value = '';
        this.toggleAddExistingCohortForm();
        this.toggleAddCohortOption();
      }
    }.bind(this))
  }

  handleNewCohortFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: "/cohorts",
      data: $(event.target).serialize()
    }).done(function(response) {
      if (response.errors) {
        this.setState({
          errors: response.errors
        })
      }
      else {
        this.getTeacher();
        this.setState({
          errors: [],
          notices: response
        });
        this.refs.cohortNameInput.value = '';
        this.toggleAddNewCohortForm();
        this.toggleAddCohortOption();
      }
    }.bind(this));
  }

  handleAssignmentFormSubmit(event) {
    event.preventDefault();
    $.post('/assignments', {
      lesson: this.refs.lessonInput.value,
      cohort: this.refs.cohortInput.value,
      completion_number: this.refs.completionNumber.value,
      due_date: this.refs.dueDate.value,
      due_time: this.refs.dueTime.value
    }).done(function(response) {
      if (response.errors) {
        this.setState({
          errors: response.errors
        })
      } else {
        this.setState({
          errors: [],
          notices: response
        })
        this.refs.completionNumber.value = ''
        this.refs.dueDate.value = ''
        this.refs.dueTime.value = ''
        this.toggleAddAssignmentForm()
        this.showAddAssignmentButton()
      }
    }.bind(this))
  }


  getTeacher() {
    $.ajax({
      method: 'get',
      url: `/teachers/${this.props.teacherId}/info`
    }).done(function(response) {
      this.setState({
        teacher: response.teacher,
        teacherHasCohorts: response.teacherHasCohorts,
        teacherCohorts: response.teacherCohorts
      })
    }.bind(this));
  }

  getCohorts() {
    $.ajax({
      method: 'get',
      url: `/teachers/${this.props.teacherId}/cohorts`
    }).done(function(response) {
      this.setState({
        teacherHasCohorts: response.teacherHasCohorts,
        teacherCohorts: response.teacherCohorts,
        loadingCohorts: false
      })
    }.bind(this));
  }

  getLessons() {
    $.ajax({
      method: 'get',
      url: '/lessons'
    }).done(function(response) {
      this.setState({
        lessons: response.lessons
      })
    }.bind(this));
  }

  componentWillMount() {
    this.getTeacher();
    this.getCohorts();
    this.getLessons();
  }

  render () {
    return (
    <div className="show-page-container">
      <TopicList />
      <div className="show-page-body">
        <h1> Welcome, {this.state.teacher.first_name} {this.state.teacher.last_name}</h1>
          <button className="btn btn-info button" type="button" onClick={this.toggleAddCohortOption}>Add A Cohort</button>
          <button className="btn btn-info button" type="button" onClick={this.toggleAddAssignmentForm}>Add A New Assignment</button>
          { this.state.errors.length > 0 ?
            <p className="errors"> {this.state.errors} </p>
          : null
          }
          { this.state.notices.length > 0 ?
            <p className="notices"> {this.state.notices} </p>
          :null
          }
        { this.state.addAssignmentFormVisible ?
          <form className="add-assignment-form" onSubmit={this.handleAssignmentFormSubmit}>
            <div className="form-group row">
              <label className="add-assignment-label" htmlFor="cohort[name]">Cohort:</label>
              <select className="add-assignment-input form-control form-control-sm" ref="cohortInput">
              { this.state.teacherCohorts.map((cohort, index) => {
                return (
                  <option name="cohort[name]"> {cohort.name} </option>
                )
              })}
              </select>
            </div>
            <div className="form-group row">
              <label className="add-assignment-label" htmlFor="lesson[name]">Lesson:</label>
                <select className="add-assignment-input form-control" ref="lessonInput">
                { this.state.lessons.map((lesson, index) => {
                  return (
                    <option name="lesson[name]"> {lesson.name} </option>
                  )
                })}
                </select>
            </div>
            <div className="form-group row">
              <label className="add-assignment-label" htmlFor="assignment[due_date]">Date Due:</label>
              <input className="add-assignment-input" ref="dueDate" defaultValue="" type="date" name="assignment[date_due]" id="assignmentDueDate"/>
              <label className="add-assignment-label" htmlFor="assignment[due_date]">Time Due:</label>
              <input className="add-assignment-input" ref="dueTime" defaultValue="" type="time" name="assignment[date_time]" id="assignmentDueTime"/>
            </div>
            <div className="form-group row">
              <label className="add-assignment-label" htmlFor="assignment[completion_number]">Number of Prompts to Attempt:</label>
              <input className="add-assignment-input" type="number" ref="completionNumber" name="assignment[completion_number]" id="assignmentCompletionNumber" />
            </div>
            <div className="form-group row">
              <input type="submit" value="Submit" className="form-input btn btn-info add-assignment-submit" />
            </div>
          </form>
          : null
        }
        { this.state.addCohortOptionVisible ?
          <div className="add-cohort-option-div">
            <button className="btn btn-info button" type="button" onClick={this.toggleAddExistingCohortForm}>Existing Cohort</button>
            <button className="btn btn-info button" type="button" onClick={this.toggleAddNewCohortForm}>Create New Cohort</button>
          </div>
          : null
        }
        { this.state.addExistingCohortFormVisible ?
          <form className="add-cohort-form" onSubmit={this.handleExistingCohortFormSubmit}>
            <label htmlFor="cohort[access_code]">Access Code:</label>
            <input ref="cohortAccessCode" type="text" name="cohort[access_code]" className="cohort-form-input"/>
            <input type="submit" value="Submit" className="add-cohort-submit btn btn-info form-input" />
          </form>
          : null
        }
        { this.state.addNewCohortFormVisible ?
          <form className="add-cohort-form" onSubmit={this.handleNewCohortFormSubmit}>
            <label htmlFor="cohort[name]">Name:</label>
            <input ref="cohortNameInput" type="text" name="cohort[name]" className="cohort-form-input"/>
            <input type="hidden" name="teacher[id]" value={this.props.teacherId}/>
            <input type="submit" value="Submit" className="add-cohort-submit btn btn-info form-input" />
          </form>
          : null
        }
        {this.state.loadingCohorts ?
          <LoadingPage />
        :
        <div>
            <h2> Cohorts </h2>
            { this.state.teacherCohorts.length > 0 ?
            <table className="table table-hover table-responsive">
              <thead className="thead-inverse">
                <tr>
                  <th> Name </th>
                  <th> Total Number of Students </th>
                  <th> Number of Students with Past Due Assignments </th>
                  <th> Access Code </th>
                </tr>
              </thead>
              { this.state.teacherCohorts.map((cohort, index) => {
                var link = "/cohorts/"
                return (
                  <tr>
                    <td> <a href={link.concat(cohort.id)}> {cohort.name} </a> </td>
                    <td> {cohort.size} </td>
                    <td> {cohort.number_of_students_with_overdue_assignments} </td>
                    <td> {cohort.access_code} </td>
                  </tr>
                )
              })}
            </table>
        : <p> You do not currently have any cohorts. </p>}
        </div>
      }
      </div>
    </div>
  )
  }
}
