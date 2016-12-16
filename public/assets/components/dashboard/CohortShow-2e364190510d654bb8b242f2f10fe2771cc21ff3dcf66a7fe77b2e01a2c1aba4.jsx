class CohortShow extends React.Component {
  constructor() {
    super();
    this.state = {
      cohort: {},
      students: [],
      assignments: [],
      loadingAssignments: true,
      loadingStudents: true
    }
    this.getAssignments = this.getAssignments.bind(this);
    this.getCohort = this.getCohort.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.viewAssignments = this.viewAssignments.bind(this);
    this.viewStudents = this.viewStudents.bind(this)
  }

  viewAssignments() {
    this.refs.assignmentTab.className += "active"
    this.refs.assignmentTable.className += "active"
    this.refs.studentTab.className = ''
    this.refs.studentTable.className = "tab-content"
  }

  viewStudents() {
    this.refs.studentTab.className += "active"
    this.refs.studentTable.className += "active"
    this.refs.assignmentTab.className = ''
    this.refs.assignmentTable.className = "tab-content"
  }

  getAssignments() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/assignments_info`
    }).done(function(response) {
      this.setState({
        assignments: response.assignments,
        loadingAssignments: false
      })
    }.bind(this));
  }

  getCohort() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/cohort_info`
    }).done(function(response) {
      this.setState({
        cohort: response.cohort
      })
    }.bind(this));
  }

  getStudents() {
    $.ajax({
      method: 'get',
      url: `/cohorts/${this.props.cohortId}/students_info`
    }).done(function(response) {
      this.setState({
        students: response.students,
        loadingStudents: false
      })
    }.bind(this));
  }

  componentWillMount() {
    this.getStudents();
    this.getCohort();
    this.getAssignments();
  }


  render () {
    return (
      <div className="show-page-container">
        <TopicList />
        <div className="show-page-body">
          <h1> {this.state.cohort.name} </h1>

          <ul className="tabs">
            <li ref="studentTab"><a href="#students" onClick={this.viewStudents}> Students </a></li>
            <li ref="assignmentTab"><a href="#assignments" onClick={this.viewAssignments}> Assignments </a></li>
          </ul>

          <div ref="studentTable" className="tab-content">
          { this.state.loadingStudents ?
            <LoadingPage />
          :
            <div>
              <h2> Students </h2>
              { this.state.students.length < 1 ?
              <p> There are no students assigned to this cohort. In order to join a cohort, students must have a registered account and add themselves to the classroom using the provided access code. </p>
            :
              <table className="table table-hover table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th> First Name </th>
                    <th> Last Name </th>
                    <th> Email </th>
                    <th> Number of Completed Assignments </th>
                    <th> Number of Past Due Assignments </th>
                  </tr>
                </thead>
                { this.state.students.map((student, index) => {
                  var link = "/students/"
                  return (
                    <tr>
                      <td> <a href={link.concat(student.id)}> {student.first_name} </a> </td>
                      <td> <a href={link.concat(student.id)}>{student.last_name} </a> </td>
                      <td> {student.email} </td>
                      <td> {student.number_of_completed_assignments} </td>
                      <td> {student.number_of_past_due_assignments} </td>
                    </tr>
                  )
                })}
              </table>
            }
            </div>
          }
          </div>
          <div ref="assignmentTable" className="tab-content">
          { this.state.loadingAssignments?
            <LoadingPage />
            : <div>
              <h2> Assignments </h2>
              {this.state.assignments.length < 1 ?
              <p> There are no assignments for this cohort. </p>
              :  <table className="table table-responsive">
                <thead className="thead-inverse">
                  <tr>
                    <th> Date Assigned </th>
                    <th> Unit </th>
                    <th> Lesson </th>
                    <th> Date Due </th>
                    <th> Number of Prompts </th>
                    <th> Number of Prompts to Meet Completion Criterion </th>
                    <th> Number of Students Completed </th>
                    <th> Delete Assignment </th>
                    <th> Edit Assignment </th>
                  </tr>
                </thead>
                { this.state.assignments.map((assignment, index) => {
                  return <CohortShowAssignment onUpdate={this.getAssignments} data={assignment} key={index}/>
                })}
              </table>
            }
          </div>
        }
          </div>
        </div>
      </div>
    )
  }
}
