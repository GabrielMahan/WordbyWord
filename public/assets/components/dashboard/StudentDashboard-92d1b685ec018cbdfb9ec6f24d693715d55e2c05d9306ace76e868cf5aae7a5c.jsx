class StudentDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      student: {},
      studentBelongsToCohort: false,
      studentCohorts: [],
      pendingAssignments: [],
      pastDueAssignments: [],
      completedAssignments: [],
      attemptedLessons: [],
      masteredLessons: [],
      cohortFormVisible: false,
      errors: [],
      notices: [],
      pendingAssignmentsLoading: true,
      pastDueAssignmentsLoading: true,
      completedAssignmentsLoading: true,
      attemptedLessonsLoading: true,
      masteredLessonsLoading: true
    }
    this.toggleAddCohortForm = this.toggleAddCohortForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.viewMasteredTopics = this.viewMasteredTopics.bind(this);
    this.viewLateAssignments = this.viewLateAssignments.bind(this);
    this.viewPracticeLessons = this.viewPracticeLessons.bind(this);
    this.viewActiveAssignments = this.viewActiveAssignments.bind(this);
    this.viewCompletedAssignments = this.viewCompletedAssignments.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.getPastDueAssignments = this.getPastDueAssignments.bind(this);
    this.getCompletedAssignments = this.getCompletedAssignments.bind(this);
    this.getPendingAssignments = this.getPendingAssignments.bind(this);
    this.getAttemptedLessons = this.getAttemptedLessons.bind(this);
    this.getMasteredLessons = this.getMasteredLessons.bind(this);
  }

  viewCompletedAssignments() {
    this.refs.completedTab.className += "active"
    this.refs.completedAssignments.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.masteredTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.masteredTopics.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  viewActiveAssignments() {
    this.refs.activeTab.className += "active"
    this.refs.activeAssignments.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.masteredTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.masteredTopics.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  viewPracticeLessons() {
    this.refs.pastPracticeTab.className += "active"
    this.refs.pastPracticeLessons.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.masteredTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.masteredTopics.className = "tab-content"
  }

  viewMasteredTopics() {
    this.refs.masteredTab.className += "active"
    this.refs.masteredTopics.className += "active"
    this.refs.pastDueTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.pastDueAssignments.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  viewLateAssignments() {
    this.refs.pastDueTab.className += "active"
    this.refs.pastDueAssignments.className += "active"
    this.refs.masteredTab.className = ''
    this.refs.activeTab.className = ''
    this.refs.completedTab.className = ''
    this.refs.pastPracticeTab.className = ''
    this.refs.masteredTopics.className = "tab-content"
    this.refs.activeAssignments.className = "tab-content"
    this.refs.completedAssignments.className = "tab-content"
    this.refs.pastPracticeLessons.className = "tab-content"
  }

  getStudent() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/info`
    }).done(function(response) {
      this.setState({
        student: response.student,
        studentBelongsToCohort: response.studentBelongsToCohort,
        studentCohorts: response.studentCohorts
      })
    }.bind(this))
  }

  getPastDueAssignments() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/past_due_assignments`
    }).done(function(response) {
      this.setState({
        pastDueAssignments: response.pastDueAssignments,
        pastDueAssignmentsLoading: false
      })
    }.bind(this))
  }

  getPendingAssignments() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/pending_assignments`
    }).done(function(response) {
      this.setState({
        pendingAssignments: response.pendingAssignments,
        pendingAssignmentsLoading: false
      })
    }.bind(this))
  }

  getCompletedAssignments() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/completed_assignments`
    }).done(function(response) {
      this.setState({
        completedAssignments: response.completedAssignments,
        completedAssignmentsLoading: false
      })
    }.bind(this))
  }

  getAttemptedLessons() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/attempted_lessons`
    }).done(function(response) {
      this.setState({
        attemptedLessons: response.attemptedLessons,
        attemptedLessonsLoading: false
      })
    }.bind(this))
  }

  getMasteredLessons() {
    $.ajax({
      method: 'get',
      url: `/students/${this.props.studentId}/mastered_lessons`
    }).done(function(response) {
      this.setState({
        masteredLessons: response.masteredLessons,
        masteredLessonsLoading: false
      })
    }.bind(this))
  }


  componentWillMount() {
    this.getStudent();
    this.getPastDueAssignments();
    this.getPendingAssignments();
    this.getCompletedAssignments();
    this.getAttemptedLessons();
    this.getMasteredLessons();
  }

  toggleAddCohortForm() {
    this.setState({
      cohortFormVisible: !this.state.cohortFormVisible
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: 'post',
      url: `/students/${this.props.studentId}/cohorts`,
      data: $(event.target).serialize()
    }).done(function(response) {
      if (response.errors) {
        this.setState({
          errors: response.errors
        })
      }
      else {
        this.getPastDueAssignments();
        this.getPendingAssignments();
        this.setState({
          errors: [],
          notices: response
        });
        this.refs.cohortAccessCode.value = '';
        this.toggleAddCohortForm();
      }
    }.bind(this))
  }


  render() {
    var linkPartOne = "/units/"
    var linkPartTwo = "/lessons/"
    return(
      <div className="show-page-container">
        <TopicList />
        <div className="show-page-body">
          <h1>{this.state.student.first_name} {this.state.student.last_name}</h1>
          { this.state.errors.length > 0 ?
            <p className="errors"> {this.state.errors} </p>
          : null
          }
          { this.state.notices.length > 0 ?
            <p className="notices"> {this.state.notices} </p>
          :null
          }
            <button onClick={this.toggleAddCohortForm} type="button" className="add-cohort-button btn btn-info">Add Your Cohort</button>
            { this.state.cohortFormVisible ?
                <form className="add-cohort-form" onSubmit={this.handleSubmit}>
                  <label htmlFor="cohort[access_code]">Access Code: </label>
                  <input type="text" ref="cohortAccessCode" name="cohort[access_code]" className="cohort-access-code"/>
                  <input type="submit" value="Submit" className="add-cohort-submit form-input btn btn-info" />
                </form>
              :
                null
            }

            <ul className="tabs">
              {this.state.studentBelongsToCohort ?
                <span>
                  <li ref="pastDueTab"><a href="#pastdueassignments" onClick={this.viewLateAssignments}> Past Due Assignments</a></li>
                  <li ref="activeTab"><a href="#activeassignments" onClick={this.viewActiveAssignments}>Active Assignments</a></li>
                  <li ref="completedTab"><a href="#completedassignments" onClick={this.viewCompletedAssignments}>Completed Assignments</a></li>
                </span>
              : null}
                <span>
                  <li ref="pastPracticeTab"><a href="#pastpracticelessons" onClick={this.viewPracticeLessons}> Past Practice Lessons</a></li>
                  <li ref="masteredTab"><a href="#masteredtopics" onClick={this.viewMasteredTopics}>Mastered Topics</a></li>
                </span>
            </ul>
              <div>

                <div className="tab-content" ref="pastDueAssignments">
                { this.state.pastDueAssignmentsLoading ?
                  <LoadingPage />
                : <div>
                    <h2> Past-Due Assignments </h2>
                    { this.state.pastDueAssignments.length < 1 ?
                      <p> You have no past-due assignments. </p>
                      :
                    <table className="table table-hover table-responsive">
                      <thead className="thead-inverse">
                        <tr>
                          <th>Date Assigned</th>
                          <th>Unit</th>
                          <th>Lesson</th>
                          <th>Due Date</th>
                        </tr>
                      </thead>
                      { this.state.pastDueAssignments.map((assignment, index) => {
                        return (
                          <tr>
                            <td> {assignment.created_at}</td>
                            <td> {assignment.unit_id} </td>
                            <td> <a href={linkPartOne.concat(assignment.unit_id).concat(linkPartTwo).concat(assignment.lesson_id)}>{assignment.lesson_name}</a> </td>
                            <td> {assignment.due_date} </td>
                          </tr>
                        )
                      })}
                    </table>
                  }
                  </div>
                }
                </div>

                <div className="tab-content" ref="activeAssignments">
                { this.state.pendingAssignmentsLoading ?
                  <LoadingPage />
                : <div>
                <h2> Active Assignments </h2>
                { this.state.pendingAssignments.length < 1 ?
                  <p> You have no active assignments. </p>
                  :

                  <table className="table table-hover table-responsive">
                    <thead className="thead-inverse">
                      <tr>
                        <th>Date Assigned</th>
                        <th>Unit</th>
                        <th>Lesson</th>
                        <th>Due Date</th>
                      </tr>
                    </thead>
                    { this.state.pendingAssignments.map((assignment, index) => {
                      return (
                        <tr>
                          <td> {assignment.created_at}</td>
                          <td> {assignment.unit_id} </td>
                          <td><a href={linkPartOne.concat(assignment.unit_id).concat(linkPartTwo).concat(assignment.lesson_id)}>{assignment.lesson_name}</a></td>                        <td> {assignment.due_date} </td>
                        </tr>
                      )
                    })}
                  </table>
                }
                </div>
              }
                </div>
                <div className="tab-content" ref="completedAssignments">
                { this.state.completedAssignmentsLoading ?
                  <LoadingPage />
                  : <div>
                    <h2> Completed Assignments </h2>
                    { this.state.completedAssignments.length < 1 ?
                      <p> You have no completed assignments. </p>
                      :
                    <table className="table table-hover table-responsive">
                      <thead className="thead-inverse">
                        <tr>
                          <th> Date Assigned </th>
                          <th> Unit </th>
                          <th> Lesson </th>
                          <th> Score </th>
                          <th> Current Streak </th>
                        </tr>
                      </thead>
                      { this.state.completedAssignments.map((assignment, index) => {
                        return (
                          <tr>
                            <td> {assignment.created_at}</td>
                            <td> {assignment.unit_id} </td>
                            <td><a href={linkPartOne.concat(assignment.unit_id).concat(linkPartTwo).concat(assignment.lesson_id)}>{assignment.lesson_name}</a></td>
                            <td> {assignment.score} </td>
                            <td> {assignment.streak} </td>
                          </tr>
                        )
                      })}
                    </table>
                  }
                  </div>
                }
                </div>
              </div>

            <div className="tab-content" ref="pastPracticeLessons">
              {this.state.attemptedLessonsLoading ?
                <LoadingPage />
                : <div>
                  <h2> Past Practice Lessons </h2>
                  { this.state.attemptedLessons.length < 1 ?
                    <p> You have no past practice lessons. </p>
                    :
                  <table className="table table-hover table-responsive">
                    <thead className="thead-inverse">
                      <tr>
                        <th> Unit </th>
                        <th> Lesson </th>
                        <th> Score </th>
                        <th> Current Streak </th>
                      </tr>
                    </thead>
                    { this.state.attemptedLessons.map((lesson, index) => {
                      return (
                        <tr>
                          <td> {lesson.unit_id} </td>
                          <td><a href={linkPartOne.concat(lesson.unit_id).concat(linkPartTwo).concat(lesson.lesson_id)}>{lesson.lesson_name}</a></td>
                          <td> {lesson.score} </td>
                          <td> {lesson.streak} </td>
                        </tr>
                      )
                    })}
                  </table>
                  }
                </div>
              }
            </div>

            <div className="tab-content" ref="masteredTopics">
              {this.masteredLessonsLoading ?
                <LoadingPage />
                : <div>
                    <h2> Mastered Topics </h2>
                    { this.state.masteredLessons.length < 1 ?
                      <p> Answer ten questions in a row correctly to demonstrate your mastery of a topic. </p>
                      :
                    <table className="table table-hover table-responsive">
                      <thead className="thead-inverse">
                        <tr>
                          <th>Unit</th>
                          <th>Lesson</th>
                          <th>Score</th>
                          <th>Current Streak </th>
                        </tr>
                      </thead>
                      { this.state.masteredLessons.map((lesson, index) => {
                        return (
                          <tr>
                            <td> {lesson.unit_id} </td>
                            <td><a href={linkPartOne.concat(lesson.unit_id).concat(linkPartTwo).concat(lesson.lesson_id)}>{lesson.lesson_name}</a></td>
                            <td> {lesson.score} </td>
                            <td> {lesson.streak} </td>
                          </tr>
                        )
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
