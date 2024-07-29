import { useState } from 'react'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { Todo } from './model'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])

  function handleAdd(e: React.FormEvent): void {
    e.preventDefault()

    if (!todo) return

    const newTodo: Todo = { id: Date.now(), todo, isDone: false }

    setTodos([...todos, newTodo])
    setTodo('')
  }

  return (
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
