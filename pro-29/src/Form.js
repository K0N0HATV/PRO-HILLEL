import React, { useEffect, useState } from 'react';
import styles from './Form.module.css'

function Form({ onSubmit, setTodo, todo, todoList }) {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (todo.id) {
            setMessage(todo.title.trim())
        }
    }, [todo])

    function onFormSubmit(e) {
        e.preventDefault()

        const oldTodo = todoList.find(todos => todos.id === todo.id) || {}

        const newTodo = {
            done: false,
            ...oldTodo,
            title: message,
        }

        if (isMessageValid(newTodo.title)) {
            setError('Поле не должно быть пустым')
            return
        }

        onSubmit(newTodo)

        setElement()
    }

    function setElement() {
        setMessage('')

        setTodo('')

        setError('')
    }

    function onMessageChange(e) {
        setMessage(e.target.value)
    }

    function isMessageValid(message) {
        return message.trim() === ''
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type={'text'}
                placeholder={'message'}
                value={message}
                onChange={onMessageChange}
            />
            {error
                ? <div className={styles.error}>{error}</div>
                : null}
        </form>
    )
}

export default Form;