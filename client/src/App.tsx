import React, { Fragment } from 'react';
import './App.scss';
import Photos from './components/Photos';

function App() {
  return (
    <Fragment>
      <div className="container pt-3">
        <Photos/>
      </div>
    </Fragment>
  );
}

export default App;
