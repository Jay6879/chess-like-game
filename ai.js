const ai = (aiTurn) => {
    const ranks = { pawn: 1, king: 2, bishop: 3, knight: 3, rook: 5, queen: 9 };

    const simulationGame = new SimulationGame([], 'white');

    const deepest = 3; // Adjust depth as necessary for 5x5 gameplay

    const humanTurn = aiTurn === 'white' ? 'black' : 'white';

    // Center positions on a 5x5 board
    const middleSquares = [12];
    const widerMiddleSquares = [7, 8, 11, 13, 16, 17];

    const isPieceInMiddle = piece => middleSquares.indexOf(piece.position) !== -1;
    const isPieceInWiderMiddle = piece => widerMiddleSquares.indexOf(piece.position) !== -1;

    const score = (pieces) => {
        return pieces.reduce((total, piece) => {
            let weight = piece.color === aiTurn ? ranks[piece.rank] : -1 * ranks[piece.rank];
            if (isPieceInMiddle(piece)) {
                weight *= 1.05;
            } else if (isPieceInWiderMiddle(piece)) {
                weight *= 1.02;
            }
            total += weight;
            return total;
        }, 0);
    }

    const isBetterScore = (score1, score2, turn) => turn === aiTurn ? score1 >= score2 : score1 <= score2;

    const isScoreGoodEnough = (score, turn) => turn === aiTurn ? score > 7 : score < -7;

    const minimax = (pieces, turn, depth = 0) => {
        simulationGame.startNewGame(pieces, turn);

        if (!simulationGame.getPieceByName(humanTurn + 'King') || simulationGame.king_dead(humanTurn)) {
            return { score: -Infinity, depth };
        }
        if (!simulationGame.getPieceByName(aiTurn + 'King') || simulationGame.king_dead(aiTurn)) {
            return { score: Infinity, depth };
        }

        let bestPlay = { move: null, score: turn === aiTurn ? -Infinity : Infinity };

        for (const piece of pieces) {
            const allowedMoves = simulationGame.getPieceAllowedMoves(piece.name);

            for (const move of allowedMoves) {
                const currentTestPlayInfo = {};
                currentTestPlayInfo.move = { pieceName: piece.name, position: move };
                simulationGame.movePiece(piece.name, move);

                const curScore = score(simulationGame.pieces);

                if (depth === deepest || isBetterScore(bestPlay.score, curScore, turn) || isScoreGoodEnough(curScore, turn)) {
                    currentTestPlayInfo.score = curScore;
                } else if (turn === aiTurn) {
                    const result = minimax(simulationGame.pieces, humanTurn, depth + 1);
                    currentTestPlayInfo.score = result.score;
                } else {
                    const result = minimax(simulationGame.pieces, aiTurn, depth + 1);
                    currentTestPlayInfo.score = result.score;
                }

                if (isBetterScore(currentTestPlayInfo.score, bestPlay.score, turn)) {
                    bestPlay.move = currentTestPlayInfo.move;
                    bestPlay.score = currentTestPlayInfo.score;
                }

                simulationGame.startNewGame(pieces, turn);
            }
        }

        return bestPlay;
    }

    let play;

    if (isTestEnv()) {
        play = (pieces, callback) => {
            setTimeout(() => {
                testFuncTime(() => {
                    const aiPlay = minimax(pieces, aiTurn);
                    callback(aiPlay);
                });
            }, 100);
        }
    } else {
        play = (pieces, callback) => {
            setTimeout(() => {
                const aiPlay = minimax(pieces, aiTurn);
                callback(aiPlay);
            }, 100);
        }
    }

    return {
        play
    }
}

const isTestEnv = function() {
    const url = new URL(location.href);
    const params = new URLSearchParams(url.searchParams);
    return Boolean(params.get('testing'));
}

const testFuncTime = func => {
    const label = 'Timer ' + Date.now();
    console.time(label);
    console.log('Output:', func());
    console.timeLog(label);
}
