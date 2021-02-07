import React from 'react';
import { Link } from 'react-router-dom';



export function HomePage() {
    return (
        <div>
            <h1>Hii You Are At HomePage</h1>
            <Link to='/todo'><div>see all todos</div></Link>
        </div>
    )
}
