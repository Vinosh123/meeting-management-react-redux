import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store'
import Dashboard from './Components/Dashboard';
import ScheduleMeeting from './Components/ScheduleMeeting';
import Login from './Components/Login';

export const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={Login} />
          <Route path="/Dashboard" strict component={Dashboard} />
          <Route path="/ScheduleMeeting" strict component={ScheduleMeeting} />
        </Router>
      </div>
    </Provider>
  );
}
export default App;
