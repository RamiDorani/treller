import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from '../store/actions/todoAction';
import { Link } from 'react-router-dom';
import { TodoPreview } from '../cmp/TodoPreview';
import { Modal } from './Modal';
import { eventBus } from '../services/eventBusService';



export function TodoList() {
    const dispatch = useDispatch();

    const todos = useSelector(state => state.todoReducer.todos);
    const [filterBy, setFilterBy] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [filterByTask , setFilterByTask] = useState('');
    const [filterByImportancy , setFilterByImportancy] = useState('');



    useEffect(() => {
        eventBus.on('added', () => {
            setIsAdding(false)
        });
    })

    dispatch(loadTodos(filterBy));

    const addTodo = () => {
        setIsAdding(true)
    }

    const closeIsAdding = () => {
        setIsAdding(false);
    }

    const onFilterInputChange = (ev) => {
        if(ev.target.name==='task') setFilterByTask(ev.target.value);
        if(ev.target.name==='importancy') setFilterByImportancy(ev.target.value);
        const filterObj = {
            task : ev.target.name==='task' ? ev.target.value : filterByTask,
            importancy: ev.target.name==='importancy' ? ev.target.value : filterByImportancy
        }
        setFilterBy(filterObj);
    }

    if (!todos) return <div>Loading...</div>
    return (
        <div>
            <input name="task" placeholder="Search..." type="text" onChange={onFilterInputChange} />
            <input name="importancy" type="number" min={1} max={5} placeholder="Serch By Importancy..." onChange={onFilterInputChange} />
            <div className="todo-list">
                {
                    todos.map(todo => <TodoPreview key={todo._id} todo={todo} />)
                }
                <button onClick={addTodo}>ADD TODO</button>
                <Link to='/'><button>Go Back To Hompage</button></Link>
            </div>
            {isAdding && <Modal closeIsAdding={closeIsAdding} />}
        </div>
    )

}
