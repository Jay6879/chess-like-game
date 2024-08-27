const changePosition = (piece, position, castle = false) => {
    piece.position = position;

    if (piece.rank === 'king') {
        if (castle) {
            piece.ableToCastle = false;
        }
    }

    if (piece.rank === 'rook') {
        piece.ableToCastle = false;
    }
};

const getDiagonalMoves = (piece, steps) => {
    const moves = [];
    const position = piece.position;

    // Top-Right diagonal
    for (let i = 1; i <= steps; i++) {
        const move = position + i * 6;
        if (move < 25 && move % 5 !== 0) {
            moves.push(move);
        }
    }

    // Top-Left diagonal
    for (let i = 1; i <= steps; i++) {
        const move = position + i * 4;
        if (move < 25 && move % 5 !== 4) {
            moves.push(move);
        }
    }

    // Bottom-Right diagonal
    for (let i = 1; i <= steps; i++) {
        const move = position - i * 4;
        if (move >= 0 && move % 5 !== 0) {
            moves.push(move);
        }
    }

    // Bottom-Left diagonal
    for (let i = 1; i <= steps; i++) {
        const move = position - i * 6;
        if (move >= 0 && move % 5 !== 4) {
            moves.push(move);
        }
    }

    return moves;
};

const getQueenAllowedMoves = (queen) => {
    // Queen moves diagonally like a knight in a 5x5 board, but only 1 or 2 squares
    return [
        ...getDiagonalMoves(queen, 1),
        ...getDiagonalMoves(queen, 2)
    ];
};

const getPawnAllowedMoves = (pawn) => {
    const position = pawn.position;
    return [
        position + 5, position - 5, // Move vertically
        position + 1, position - 1, // Move horizontally
        position + 6, position - 6, // Move diagonally (top-right, bottom-left)
        position + 4, position - 4  // Move diagonally (top-left, bottom-right)
    ].filter(move => move >= 0 && move < 25 && Math.abs((move % 5) - (position % 5)) <= 1);
};

const getKingAllowedMoves = (king) => {
    const position = king.position;
    return [
        position + 5, position - 5, // Move vertically
        position + 1, position - 1, // Move horizontally
        ...getDiagonalMoves(king, 1),  // Move diagonally 1 square
        ...getDiagonalMoves(king, 2)   // Move diagonally 2 squares
    ].filter(move => move >= 0 && move < 25);
};

const getAllowedMoves = (piece) => {
    let allowedMoves;

    switch (piece.rank) {
        case 'pawn':
            allowedMoves = getPawnAllowedMoves(piece);
            break;
        case 'king':
            allowedMoves = getKingAllowedMoves(piece);
            break;
        case 'queen':
            allowedMoves = getQueenAllowedMoves(piece);
            break;
        default:
            throw new Error("Unknown rank: " + piece.rank);
    }

    return allowedMoves;
};
