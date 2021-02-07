import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '../pages/Modal';
import {removeTodo} from '../store/actions/todoAction';
import { eventBus } from '../services/eventBusService';


 export function TodoPreview({todo}) {

    const [isEditing,setIsEditing] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        eventBus.on('edited', () => {
           setIsEditing(false)
          });

    })


    const deleteTodo = (todoId)=> {
        dispatch(removeTodo(todoId));
     }

     const updateTodo = ()=> {
         setIsEditing(true)
     }


    return (
        <div>
            <div className="todo-card">
            <h2>Todo : {todo.task}</h2>
            <h3>Created By : {todo.createdBy.fullName}</h3>
            <h4>Importancy : {todo.importancy}</h4>
            <h4>Due Date : {todo.dueDate}</h4>
            <h3>Created At : {new Date(todo.createdAt).toLocaleDateString()}</h3>
            <button onClick={updateTodo}>UPDATE TODO</button>
            <button onClick={()=>{
                deleteTodo(todo._id)
            }}>DELETE TODO</button>
        </div>
        {isEditing && <Modal todoId={todo._id} /> }
        </div>
    )
}

