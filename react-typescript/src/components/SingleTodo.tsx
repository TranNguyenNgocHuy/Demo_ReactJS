import { useState, useRef, useEffect, Dispatch, FC, FormEvent } from 'react'
import { Todo } from '../model'

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: FC<Props> = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  function handleDone(id: number): void {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)))
  }

  function handleDelete(id: number): void {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleEdit(e: FormEvent, id: number): void {
    e.preventDefault()

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)))

    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          className='todos__single--text'
          type='text'
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className='todos__single--text'>{todo.todo}</s>
      ) : (
        <span className='todos__single--text'>{todo.todo}</span>
      )}

      <div>
        <span
          className='icon'
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit((edit) => !edit)
            }
          }}
        >
          ✏️
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          🗑️
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          ✅
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
