
function handleSubmit(event) {
  // debugger;
    event.preventDefault();
    var thig = 12342323;
    var instantFeedback = {subjects: false, verbs: false, objects: false};



    if (this.props.lessonId == 1 || this.props.lessonId == 3 || this.props.lessonId == 5) {
      var wordsInSubjectBox = Array.from(this.refs.subjectBox.children).map(function(element) {
        return element.innerText
      })

      console.log("subjects", wordsInSubjectBox)

      if (wordsInSubjectBox.sort().join() === this.state.svos.subjects.sort().join() ) {
        this.setState({subjectsCorrect: true})
        instantFeedback.subjects = true
      }
    }

    if (this.props.lessonId == 2 || this.props.lessonId == 3 || this.props.lessonId == 5) {
      var wordsInVerbBox = Array.from(this.refs.verbBox.children).map(function(element) {
        return element.innerText
      })

      if (wordsInVerbBox.sort().join() === this.state.svos.verbs.sort().join() ) {
        this.setState({verbsCorrect: true})
        instantFeedback.verbs = true
      }
    }

    if ( this.props.lessonId == 4  || this.props.lessonId == 5) {
      var wordsInObjectBox = Array.from(this.refs.objectBox.children).map(function(element) {
        return element.innerText
      })

      if (wordsInObjectBox.sort().join() === this.state.svos.objects.sort().join() ) {
        this.setState({objectsCorrect: true})
        instantFeedback.objects = true
      }
    }

    // debugger;

    if (this.props.lessonId == 1 && instantFeedback.subjects) {
      this.setState({allCorrect: true})
    }
    else if (this.props.lessonId == 2 && instantFeedback.verbs) {
      this.setState({allCorrect: true});
    }
    else if (this.props.lessonId == 3 && instantFeedback.verbs && instantFeedback.subjects) {
      this.setState({allCorrect: true});
    }
    else if (this.props.lessonId == 4 && instantFeedback.objects) {
      this.setState({allCorrect: true});
    }
    else if (this.props.lessonId == 5 && instantFeedback.objects && instantFeedback.verbs && instantFeedback.objects) {
      this.setState({allCorrect: true});
    }



    if (this.props.lessonId == 1 && this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts', {
        attempts: {
          subjects: {
            correct: instantFeedback.subjects,
            prompt_id: this.state.svoIds.subjectPromptId
          }
        }
      });
    }
    else if (this.props.lessonId == 2 && this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts', {
        attempts: {
          verbs: {
            correct: instantFeedback.verbs,
            prompt_id: this.state.svoIds.verbPromptId
          }
        }
      });
    }
    else if (this.props.lessonId == 3 && this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts', {
        attempts: {
          verbs: {
            correct: instantFeedback.verbs,
            prompt_id: this.state.svoIds.verbPromptId
          },
          subjects: {
              correct: instantFeedback.subjects,
              prompt_id: this.state.svoIds.subjectPromptId
          }
        }
      });
    }
    else if (this.props.lessonId == 4 && this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts', {
        attempts: {
          objects: {
            correct: instantFeedback.objects,
            prompt_id: this.state.svoIds.objectPromptId
          }
        }
      });
    }
    else if (this.props.lessonId == 5 && this.state.displayFeedback === false) {
      $.post('/UnitOne/Attempts', {
        attempts: {
          verbs: {
            correct: instantFeedback.verbs,
            prompt_id: this.state.svoIds.verbPromptId
          },
          objects: {
            correct: instantFeedback.objects,
            prompt_id: this.state.svoIds.objectPromptId
          },
          subjects: {
            correct: instantFeedback.subjects,
            prompt_id: this.state.svoIds.subjectPromptId
          }
        }
      });
    }

    this.setState({ displayFeedback: true })
  }
