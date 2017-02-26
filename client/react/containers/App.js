import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';
import ErrorPanel from '../components/ErrorPanel';

class App extends Component {
    render() {
        const props = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <Board onCellClick={cellIndex => console.log(`cellIndex: ${cellIndex}`)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                        <InfoPanel message={props.infoMessage} onStart={() => props.onStart()} />
                        <ErrorPanel onRetry={() => props.onRetry()} />
                    </div>
                </div>
            </div>);
    }
}

App.propTypes = {
    infoMessage: PropTypes.string
};

const mapStateToProps = state => ({
    infoMessage: state.infoMessage
});

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.startNewGame()),
    onRetry: () => { console.log('[onRetry] not implemented yet'); }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
