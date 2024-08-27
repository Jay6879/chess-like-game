class Game {
    constructor(pieces, turn) {
        this.startNewGame(pieces, turn);
    }

    startNewGame(pieces, turn) {
        this._setPieces(pieces);

        this.turn = turn;
        this.clickedPiece = null;
        this._events = {
            pieceMove: [],
            kill: [],
            check: [],
            promotion: [],
            checkMate: [],
            turnChange: []
        };
        this.history = new History();
    }

    _setPieces(pieces) {
        this.pieces = Array(pieces.length);
        pieces.forEach((piece, i) => {
            this.pieces[i] = {
                rank: piece.rank,
                position: piece.position,
                color: piece.color,
                name: piece.name,
                ableToCastle: piece.ableToCastle
            };
        });
        this.playerPieces = {
            white: this.pieces.filter(piece => piece.color === 'white'),
            black: this.pieces.filter(piece => piece.color === 'black')
        };
    }

    getPieceByName(pieceName) {
        return this.pieces.find(piece => piece.name === pieceName);
    }

    getPieceByPos(position) {
        return this.pieces.find(piece => piece.position == position);
    }

    movePiece(pieceName, position) {
        const piece = this.getPieceByName(pieceName);
        if (piece && this.getPieceAllowedMoves(piece.name).includes(parseInt(position))) {
            const prevPosition = piece.position;
            const existedPiece = this.getPieceByPos(position);

            if (existedPiece) {
                this.kill(existedPiece);
            }

            piece.position = position;

            const move = { from: prevPosition, to: position, piece };
            this.addToHistory(move);
            this.triggerEvent('pieceMove', move);

            this.changeTurn();

            if (this.kingChecked(this.turn)) {
                this.triggerEvent('check', this.turn);
                if (this.kingDead(this.turn)) {
                    this.checkmate(piece.color);
                }
            }
            return true;
        } else {
            return false;
        }
    }

    kill(piece) {
        this.pieces = this.pieces.filter(p => p !== piece);
        this.triggerEvent('kill', piece);
    }

    addToHistory(move) {
        this.history.add(move);
    }

    triggerEvent(eventName, params) {
        if (this._events[eventName]) {
            this._events[eventName].forEach(callback => callback(params));
        }
    }

    changeTurn() {
        this.turn = this.turn === 'white' ? 'black' : 'white';
        this.triggerEvent('turnChange', this.turn);
    }

    kingChecked(color) {
        const king = this.getPieceByName(`${color}King`);
        return this.pieces.some(piece => {
            if (piece.color !== color) {
                const allowedMoves = this.getPieceAllowedMoves(piece.name);
                return allowedMoves.includes(parseInt(king.position));
            }
            return false;
        });
    }

    kingDead(color) {
        const king = this.getPieceByName(`${color}King`);
        return !king;
    }

    checkmate(color) {
        this.triggerEvent('checkMate', color);
    }

    getPieceAllowedMoves(pieceName) {
        const piece = this.getPieceByName(pieceName);
        if (piece && this.turn === piece.color) {
            this.setClickedPiece(piece);
            const allowedMoves = this.calculateMoves(piece);
            return allowedMoves;
        }
        return [];
    }

    setClickedPiece(piece) {
        this.clickedPiece = piece;
    }

    calculateMoves(piece) {
        // This function should return the correct moves based on the piece's rank
        const moves = [];
        const position = parseInt(piece.position);
        const row = Math.floor(position / 10);
        const col = position % 10;

        switch (piece.rank) {
            case 'pawn':
                moves.push(position + (piece.color === 'white' ? 10 : -10));
                break;
            case 'king':
                moves.push(position + 1, position - 1, position + 10, position - 10);
                break;
            case 'queen':
                for (let i = 1; i <= 4; i++) {
                    moves.push(position + i, position - i, position + 10 * i, position - 10 * i);
                }
                break;
            default:
                break;
        }

        return moves.filter(move => move > 10 && move < 60); // Filter out-of-bound moves
    }

    on(eventName, callback) {
        if (this._events[eventName]) {
            this._events[eventName].push(callback);
        }
    }
}
