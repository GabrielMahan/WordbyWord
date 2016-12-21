function handleSubmit(event) {
    event.preventDefault();
    var instantFeedback = {subjects: false, verbs: false, objects: false};
    var stateFeedback = this.state.svoFeedback;

    // subjects
    if (this.props.lessonId == 1 || this.props.lessonId == 3 || this.props.lessonId == 5) {
      var wordsInSubjectBox = Array.from(this.refs.dropBoxes.refs.subjectBox.children).map(function(element) {
        return element.innerText
      })

      if (wordsInSubjectBox.sort().join() === this.state.svos.subjects.sort().join() ) {
        stateFeedback.subjectsCorrect = true;
        instantFeedback.subjects = true
      }
    }

    // verbs
    if (this.props.lessonId == 2 || this.props.lessonId == 3 || this.props.lessonId == 5) {
      var wordsInVerbBox = Array.from(this.refs.dropBoxes.refs.verbBox.children).map(function(element) {
        return element.innerText
      })

      if (wordsInVerbBox.sort().join() === this.state.svos.verbs.sort().join() ) {
        stateFeedback.verbsCorrect = true;
        instantFeedback.verbs = true
      }
    }

    // Objects
    if ( this.props.lessonId == 4  || this.props.lessonId == 5) {
      var wordsInObjectBox = Array.from(this.refs.dropBoxes.refs.objectBox.children).map(function(element) {
        return element.innerText
      })

      if (wordsInObjectBox.sort().join() === this.state.svos.objects.sort().join() ) {
        stateFeedback.verbsCorrect = true;
        instantFeedback.objects = true
      }
    }

    this.setState({svoFeedback: stateFeedback})

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
    debugger;
  }

  function loadNext(ev) {
    ev.preventDefault();
    this.setState({
      sentence: this.state.nextSet.sentence,
      svos: this.state.nextSet.svos,
      svoIds: this.state.nextSet.svoIds,
      allCorrect: false,
      displayFeedback: false,
      svoFeedback: {
        subjectsCorrect: false,
        verbsCorrect: false,
        objectsCorrect: false
      }
    })
    $.get(`/${this.props.lessonId}/UnitOneSentence`).done((response)=> {
      this.setState({nextSet: response})
    })
    if (  ['1','3','5'].indexOf(this.props.lessonId) >= 0) {
      this.refs.dropBoxes.refs.subjectBox.innerHTML = '' ;
    }
    if (  ['2','3','5'].indexOf(this.props.lessonId) >= 0) {
      this.refs.dropBoxes.refs.verbBox.innerHTML = '';
    }
    if (  ['4','5'].indexOf(this.props.lessonId) >= 0 ) {
      this.refs.dropBoxes.refs.objectBox.innerHTML = '';
    }
  }
