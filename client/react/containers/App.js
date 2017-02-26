import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';
import ErrorPanel from '../components/ErrorPanel';

class App extends Component {
    render() {
        return (
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
            </div>);
    }
}

const mapStateToProps = (/* state, ownProps */) => ({
});

const mapDispatchToProps = (/* dispatch, ownProps */) => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
