import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { TodoList } from './pages/TodoList';
import { HomePage } from './pages/HomePage';
import { Footer } from './cmp/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <Switch>
        <Route component={ TodoList } exact path="/todo"  />
        <Route component={HomePage} path='/' />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
