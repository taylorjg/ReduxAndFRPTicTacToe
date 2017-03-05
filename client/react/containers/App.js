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
        const active = props.gameState !== C.STATE_NO_GAME_IN_PROGRESS && !props.webServiceError;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-offset-4 col-md-4">
                        <Board
                            board={props.board}
                            outcome={props.outcome}
                            winningLine={props.winningLine}
                            onSelectCell={props.onSelectCell}
                            onNavigateTo={props.onNavigateTo}
                            active={active}
                            setFocusTo={props.setFocusTo}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                        {(props.webServiceError)
                            ? <ErrorPanel
                                showSpinner={props.showSpinner}
                                setFocus={props.setFocusTo === C.SETFOCUSTO_RETRY_BUTTON}
                                onRetry={() => props.onRetry(props.board)}
                            />
                            : <InfoPanel
                                showSpinner={props.showSpinner}
                                setFocus={props.setFocusTo === C.SETFOCUSTO_START_BUTTON}
                                onStart={props.onStart}
                                gameState={props.gameState}
                            />}
                    </div>
                </div>
            </div>);
    }
}

App.propTypes = {
    gameState: PropTypes.number.isRequired,
    webServiceError: PropTypes.bool.isRequired,
    board: PropTypes.string.isRequired,
    outcome: PropTypes.number,
    winningLine: PropTypes.arrayOf(PropTypes.number),
    showSpinner: PropTypes.bool.isRequired,
    setFocusTo: PropTypes.number.isRequired,
    onStart: PropTypes.func.isRequired,
    onSelectCell: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,
    onNavigateTo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    gameState: state.gameState,
    webServiceError: state.webServiceError,
    board: state.board,
    outcome: state.outcome,
    winningLine: state.winningLine,
    showSpinner: state.showSpinner,
    setFocusTo: state.setFocusTo
});

const mapDispatchToProps = dispatch => ({
    onStart: () => dispatch(actions.startNewGameAsync()),
    onSelectCell: cellIndex => dispatch(actions.makeHumanMoveAsync(cellIndex)),
    onRetry: board => dispatch(actions.makeComputerMoveAsync(board)),
    onNavigateTo: cellIndex => dispatch(actions.navigateToCell(cellIndex))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
