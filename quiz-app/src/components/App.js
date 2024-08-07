import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'
import { useQuiz } from '../contexts/QuizContext'

export default function App() {
  const { status } = useQuiz()

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'isLoading' && <Loader />}
        {status === 'isError' && <Error />}
        {status === 'isReady' && <StartScreen />}
        {status === 'isActive' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === 'isFinished' && <FinishScreen />}
      </Main>
    </div>
  )
}
