import React from 'react';
import ListItem from './ListItem.js';

function List({ todoList, onDelete, onEdit, changeDone }) {
    return (
        <ul>
            {todoList.map(todo => (
                <ListItem
                    onEdit={onEdit}
                    onDelete={onDelete}
                    key={todo.id}
                    todo={todo}
                    changeDone={changeDone}
                />))}
        </ul>
    );
}

export default List;