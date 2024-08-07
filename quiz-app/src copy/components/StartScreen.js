function StartScreen({ numQuestions, dispatch }) {
  function handleStart() {
    dispatch({
      type: 'start',
    });
  }

  return (
    <div className="start">
      <h2>Welcom to The React Quiz!</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
