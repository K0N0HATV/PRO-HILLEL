import React from 'react';
import styles from './ListItem.module.css'

function ListItem({ todo, onDelete, onEdit, changeDone }) {
    const done = todo.done
        ? styles.done
        : styles.badDone

    return (
        <li
            id={todo.id}
            onClick={() => changeDone(todo)}
            className={done}
        >
            <span>{todo.title}</span>
            <button onClick={(e) => onEdit(todo, e)}>Edit</button>
            <button onClick={(e) => onDelete(todo.id, e)}>Delete</button>
        </li>
    );
}

export default ListItem;