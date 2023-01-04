import { useState, useEffect } from 'react';
import TodoApi from './TodoApi.js'

export default function useTodo() {
    const [todoList, setTodoList] = useState([])
    const [error, setError] = useState('')
    const [todo, setTodo] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        TodoApi
            .getList()
            .then((list) => {
                setTodoList(list)
                setError('')
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    function onFormSubmit(todo) {
        setLoading(true)

        if (todo.id) {
            TodoApi
                .update(todo.id, todo)
                .then(updateTodo => {
                    const newList = todoList.map(todoItem => todoItem.id === updateTodo.id ? updateTodo : todoItem)

                    setTodoList(newList);
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false))
        } else {
            TodoApi
                .create(todo)
                .then(newTodo => {
                    setTodoList([...todoList, newTodo])
                    setLoading(false)
                })
                .catch(err => setError(err.message))
        }

        setError('')
    }

    function onEdit(todo, e) {
        e.stopPropagation()
        setTodo(todo)
    }

    function deleteTodo(id, e) {
        e.stopPropagation()

        setLoading(true)

        TodoApi
            .delete(id)
            .then(() => {
                const list = todoList.filter(todo => todo.id !== id)
                setTodoList(list)
                setError('')
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }

    function changeDone(todo) {
        setLoading(true)

        TodoApi
            .update(todo.id, { done: !todo.done })
            .then(updateTodo => {
                const oldTodo = todoList.find(todos => todos.id === todo.id)

                for (const key in oldTodo) {
                    oldTodo[key] = updateTodo[key]
                }

                setTodoList([...todoList])
                setError('')
                setLoading(false)
            })
            .catch(err => setError(err.message))
    }

    return {
        todoList,
        onFormSubmit,
        deleteTodo,
        loading,
        error,
        onEdit,
        todo,
        changeDone,
        setTodo
    }
}