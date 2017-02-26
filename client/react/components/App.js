import React from 'react';
import Board from './Board';
import InfoPanel from './InfoPanel';
import ErrorPanel from './ErrorPanel';

const App = () => 
    <div className="container">
        <div className="row">
            <div className="col-md-offset-4 col-md-4">
                <Board onCellClick={cellIndex => console.log(`cellIndex: ${cellIndex}`)} />
            </div>
        </div>
        <div className="row">
            <div className="col-md-offset-3 col-md-6">
                <InfoPanel />
                <ErrorPanel />
            </div>
        </div>
    </div>;

export default App;
