import { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('')
  const [todoList, setTodoList] = useState([
    { "title": "ZXC", "status": false, "done": false, "id": "46" },
    { "title": "GHOUL", "status": false, "done": false, "id": "47" },
    { "title": "SSS+", "status": false, "done": false, "id": "48" },
    { "title": "RANK", "status": false, "done": false, "id": "49" }
  ])

  function onAddTodoBtnClick() {
    const newTodo = {
      "title": message,
      "status": false,
      "done": false,
      "id": new Date().toUTCString()
    }

    const newTodoList = [
      ...todoList,
      newTodo
    ]

    if (isMessageValid(newTodo.title)) {
      showError('Поле не должно быть пустым')
      return
    }

    setTodoList(newTodoList)

    setMessage('')
  }

  function onMessageChange(e) {
    setMessage(e.target.value)
  }

  function onMessageKeyUp(e) {
    if (e.key === 'Enter') {
      onAddTodoBtnClick()
    }
  }

  function isMessageValid(message) {
    return message.trim() === ''
  }

  function showError(err) {
    alert(err)
  }

  return (
    <>
      <input type={'text'} placeholder={'message'} onKeyUp={onMessageKeyUp} value={message} onChange={onMessageChange} />
      <button onClick={onAddTodoBtnClick}>Add Todo</button>
      <ul>
        {todoList.map(todo => {
          return (
            <li className='link' key={todo.id}>{todo.title}</li>
          )
        })}
      </ul>
    </>
  );
}

export default App;