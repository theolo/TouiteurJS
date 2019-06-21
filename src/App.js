import React from 'react';
import './App.css';

import Header from './components/Header'
import SendMessageForm from './components/SendMessageForm'
import Trending from './components/Trending'
import TouitContainer from './components/TouitContainer'

function App() {
  return (
    <div className="App">
      <Header />
      <SendMessageForm />
      <div className="content-page">
        <Trending />
        <TouitContainer />
      </div>
    </div>
  );
}

export default App;
