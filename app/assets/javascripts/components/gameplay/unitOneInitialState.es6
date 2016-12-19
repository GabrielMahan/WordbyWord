let unitOneInitialState = {
  beingDragged: <div>***</div>,
  sentence: [],
  svos: {
    subjects: [],
    verbs: [],
    objects: []
  },
  nextSet: {},
  allCorrect: false,
  svoFeedback: {
    subjectsCorrect: false,
    verbsCorrect: false,
    objectsCorrect: false
  },
  displayFeedback: false,
  svoIds: {
    verbPromptId: 0,
    subjectPromptId: 0,
    objectPromptId: 0
  }
}
