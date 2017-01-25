const engine = require("../engine");
const assert = require("assert");

describe("computerMove", function() {
    
    it("makes the winning move when possible", function() {
        
        const state = {
            board:
                "XOX" +
                "---" +
                "-O-",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        const actual = engine.computerMove(state);
        
        const expected = {
            board:
                "XOX" +
                "-O-" +
                "-O-",
            player1Piece: "X",
            player2Piece: "O",
            outcome: 2,
            winningLine: [1, 4, 7]
        };
        
        assert.deepEqual(actual, expected);
    });
    
    it("makes the blocking move when necessary", function() {
        
        const state = {
            board:
                "X-O" + 
                "OX-" +
                "---",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        const actual = engine.computerMove(state);
        
        const expected = {
            board:
                "X-O" +
                "OX-" +
                "--O",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        assert.deepEqual(actual, expected);
    });
    
    it("detects when the human player has already won", function() {
        
        const state = {
            board:
                "X-X" +
                "OXO" +
                "X-O",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        const actual = engine.computerMove(state);
        
        const expected = {
            board:
                "X-X" +
                "OXO" +
                "X-O",
            player1Piece: "X",
            player2Piece: "O",
            outcome: 1,
            winningLine: [2, 4, 6]
        };
        
        assert.deepEqual(actual, expected);
    });

    it("detects a draw when the human player went first", function() {
        
        const state = {
            board:
                "OXO" +
                "OXX" +
                "XOX",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        const actual = engine.computerMove(state);
        
        const expected = {
            board:
                "OXO" +
                "OXX" +
                "XOX",
            player1Piece: "X",
            player2Piece: "O",
            outcome: 3
        };
        
        assert.deepEqual(actual, expected);
    });
    
    it("detects a draw when the computer went first", function() {
        
        const state = {
            board:
                "OX-" +
                "XOO" +
                "XOX",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        const actual = engine.computerMove(state);
        
        const expected = {
            board:
                "OXO" +
                "XOO" +
                "XOX",
            player1Piece: "X",
            player2Piece: "O",
            outcome: 3
        };
        
        assert.deepEqual(actual, expected);
    });
    
    it("returns a draw when the only possible computer move happens to be a blocking move", function() {
        
        const state = {
            board:
                "XOX" +
                "OXO" +
                "-XO",
            player1Piece: "X",
            player2Piece: "O"
        };
        
        const actual = engine.computerMove(state);
        
        const expected = {
            board:
                "XOX" +
                "OXO" +
                "OXO",
            player1Piece: "X",
            player2Piece: "O",
            outcome: 3
        };
        
        assert.deepEqual(actual, expected);
    });
});
