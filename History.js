class History {
    constructor() {
        this._lastStep = [];
        this._history = [];
    }

    // Adds a move step to the current "last step" array
    add(step) {
        this._lastStep.push(step);
    }

    // Saves the current "last step" array to the history and resets the last step
    save() {
        if (this._lastStep.length > 0) {
            this._history.push([...this._lastStep]);  // Store a copy of the last step
            this._lastStep = [];
        }
    }

    // Pops the last saved step from history and returns it
    pop() {
        return this._history.pop();
    }

    // Returns the last move saved in the history
    lastMove() {
        return this._history.length > 0 ? this._history[this._history.length - 1] : null;
    }

    // Returns the entire history for review or debugging
    getHistory() {
        return this._history;
    }

    // Clears the history, useful for restarting a game or simulation
    clear() {
        this._lastStep = [];
        this._history = [];
    }
}
