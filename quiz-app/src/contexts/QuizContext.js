import { createContext, useContext, useEffect, useReducer } from 'react'

const QuizContext = createContext()

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  status: 'isLoading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  expireTime: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecived':
      return { ...state, questions: action.payload, status: 'isReady' }
    case 'dataFailed':
      return { ...state, status: 'isError' }
    case 'start':
      return {
        ...state,
        status: 'isActive',
        expireTime: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case 'finished':
      return {
        ...state,
        status: 'isFinished',
        highScore:
          state.highScore <= state.points ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'isReady',
        highScore: state.highScore,
      }
    case 'countTime':
      return {
        ...state,
        expireTime: state.expireTime - 1,
        status: state.expireTime === 0 ? 'isFinished' : state.status,
      }
    default:
      throw new Error('Action unknow')
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, expireTime },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (totalPoint, currentEl) => totalPoint + currentEl.points,
    0
  )

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: 'dataRecived',
          payload: data,
        })
      )
      .catch((err) =>
        dispatch({
          type: 'dataFailed',
        })
      )
  }, [])

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        expireTime,
        numQuestions,
        maxPossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('QuizContext was used outside AuthProvider')
  return context
}

export { QuizProvider, useQuiz }
