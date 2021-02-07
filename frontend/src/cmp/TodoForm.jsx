import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import { TextField, Slider, Typography } from '@material-ui/core';
import { todoService } from '../services/todoService';
import { saveTodo } from '../store/actions/todoAction';
import { utilService } from '../services/utilService';
import { eventBus } from '../services/eventBusService';


function _TodoForm({ todoId }) {

  const dispatch = useDispatch();
  const [todo, setTodo] = useState(null);
  const [task, setTask] = useState('');
  const [fullName, setFullName] = useState('');
  const [importancy, setImportancy] = useState('');
  const [date, setDate] = useState('');
  const [count, setCount] = useState(0);



  useEffect(() => {
    if (todoId && count === 0) {
      const getTodo = (async () => {
        const todoById = await todoService.getById(todoId);
        setTodo(todoById);
        setTask(todoById.task);
        setFullName(todoById.createdBy.fullName);
        setImportancy(todoById.importancy);
        setDate(todoById.dueDate);
        setCount(count + 1);
      })();
    }
    else return

  });

  const onHandleChange = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    if (name === 'task') setTask(value);
    if (name === 'fullName') setFullName(value);
    if (name === 'importancy') setImportancy(value);
    if (name === 'date') setDate(value);
  }

  const onFormSubmit = (ev) => {
    ev.preventDefault();
    const todoForSave = {
      _id: todo ? todo._id : null,
      task: task,
      importancy: importancy,
      dueDate: date,
      createdAt: Date.now(),
      createdBy: {
        userId: utilService.makeId(24),
        fullName: fullName
      }
    }
    dispatch(saveTodo(todoForSave));
    eventBus.emit('edited')
    eventBus.emit('added')
  }


  return (
    <form>
      <TextField
        value={task}
        onChange={onHandleChange}
        placeholder="I need To Do..."
        type="text"
        name="task"
        required
      />
      <TextField
        value={fullName}
        onChange={onHandleChange}
        placeholder="fullName"
        type="text"
        name="fullName"
        required
      />
      <input
        defaultValue={importancy}
        onChange={onHandleChange}
        placeholder="Importany (1-5)"
        type="number"
        min="1"
        max="5"
        name="importancy"
        required
      />
      <input
        defaultValue={date}
        onChange={onHandleChange}
        placeholder="Until : "
        type="date"
        name="date"
        required
      />
      <button onClick={onFormSubmit}>Save Todo</button>
    </form>
  )


}

export const TodoForm = withRouter(_TodoForm)




