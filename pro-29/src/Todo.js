import Form from './Form.js';
import List from './List.js'
import styles from './Todo.module.css'
import useTodo from './useTodo.js'

function App() {
  const {
    todoList,
    onFormSubmit,
    deleteTodo,
    loading,
    error,
    onEdit,
    todo,
    changeDone,
    setTodo
  } = useTodo()

  return (
    <>
      <Form
        todoList={todoList}
        setTodo={setTodo}
        todo={todo}
        onSubmit={onFormSubmit}
      />
      {error
        ? <div className={styles.error}>{error}</div>
        : null}
      {loading
        ? '...Loading'
        : ''}
      {todoList.length > 0 && (
        <List
          changeDone={changeDone}
          onDelete={deleteTodo}
          todoList={todoList}
          onEdit={onEdit}
        />
      )}
    </>
  );
}

export default App;