import React, { useState, useEffect } from 'react';
import { TodoForm } from '../cmp/TodoForm';
import { eventBus } from '../services/eventBusService';

export function Modal({todoId}) {

    
    const [isShown, setIsShown] = useState(true);
    

    const closeModal = () => {
        setIsShown(false)
        eventBus.emit('edited')
        eventBus.emit('added')
      }

    return (
        <div>
            <div className={`modal-wrapper ${isShown ? '' : 'hide'}`} >
                <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>
                    <TodoForm todoId={todoId}  />
                    <button className="close-modal-btn" onClick={closeModal}>X</button>
                </div>
            </div>
        </div>
    )
}
