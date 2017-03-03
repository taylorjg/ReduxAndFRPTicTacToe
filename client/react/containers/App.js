import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as C from '../constants';
import * as actions from '../actions';
import Board from '../components/Board';
import InfoPanel from '../components/InfoPanel';
import ErrorPanel from '../components/ErrorPanel';

class App extends Component {
    render() {
        const props = this.props;
        const active = props.gameState !== C.STATE_NO_GAME_IN_PROGRESS;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <Board
                            board={props.board}
                            outcome={props.outcome}
                            winningLine={props.winningLine}
                            onCellClick={props.onCellClick}
                            active={active}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                        {(props.gameState === C.STATE_WEB_SERVICE_ERROR)
                            ? <ErrorPanel showSpinner={props.showSpinner} onRetry={() => props.onRetry(props.board)} />
                            : <InfoPanel showSpinner={props.showSpinner} message={props.infoMessage} onStart={props.onStart} />}
                    </div>
                </div>
            </div>);
    }
}

App.propTypes = {
    gameState: PropTypes.number.isRequired,
    board: PropTypes.string.isRequired,
    outcome: PropTypes.number,
    winningLine: PropTypes.arrayOf(PropTypes.number),
    infoMessage: PropTypes.string,
    showSpinner: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    gameState: state.gameState,
    board: state.board,
    outcome: state.outcome,
    winningLine: state.winningLine,
    infoMessage: state.infoMessage,
    showSpinner: state.showSpinner
});

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.startNewGame()),
    onCellClick: cellIndex => dispatch(actions.makeHumanMoveAsync(cellIndex)),
    onRetry: board => dispatch(actions.makeComputerMoveAsync(board))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
