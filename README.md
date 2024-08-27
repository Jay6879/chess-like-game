5x5 Board Game
Overview
This is a custom 5x5 board game implemented using HTML, CSS, and JavaScript. The game includes unique movement rules for pieces such as pawns, kings, and queens, which are referred to as Hero1 and Hero2 in the game. The game supports two players, one controlling the white pieces and the other controlling the black pieces.

Game Rules
Board Setup
The game board is a 5x5 grid.
Each player starts with five pieces:
1 King (Hero1)
1 Queen (Hero2)
3 Pawns
Piece Movement
Pawns:
Pawns can move one step in any direction: forward, backward, left, right, or diagonally.
King (Hero1):
The King can move one or two steps in any direction: forward, backward, left, right, or diagonally.
Queen (Hero2):
The Queen can move one or two steps diagonally in any direction.
Winning the Game
The game ends when one player's King (Hero1) is captured. The player who captures the opponent's King wins the game.
File Descriptions
1. index.html
The main HTML file that structures the layout of the game. It contains the grid for the 5x5 board and includes buttons to start the game.
2. styles.css
The CSS file that styles the game. It sets up the appearance of the board, the pieces, and other UI elements like buttons. It also includes classes for highlighting possible moves and indicating the selected piece.
3. game.js
The core JavaScript file that manages game logic. This file handles the initialization of the board, the movement of pieces, the turn-based system, and the win conditions.
4. piece.js
This JavaScript file defines the allowed moves for each piece. It contains functions that calculate possible moves for pawns, kings, and queens, based on the rules defined above.
5. board.js
This file manages the user interactions on the board. It listens for clicks on the pieces, highlights possible moves, and updates the board as pieces are moved.
Icons Used
The game uses custom icons to represent the pieces:
King (Hero1): Represented by a King icon.
Queen (Hero2): Represented by a Queen icon.
Pawns: Represented by a Pawn icon.
Icons Sources
All icons are sourced from [example source, if applicable] and are placed in the img folder.
Development Approach
1. Grid-based Design
The board is designed as a 5x5 grid using CSS Grid layout, making it easy to manage and style each square.
2. Modular JavaScript
The game's logic is separated into different JavaScript files for maintainability. Each file has a clear responsibility, such as managing the board, defining piece movements, or handling game rules.
3. Event-driven Programming
The game relies on event-driven programming, where actions such as clicking on a piece or selecting a move trigger specific events, making the game interactive and dynamic.
4. Custom Game Logic
The movement logic for each piece has been customized to fit the unique rules of the game. The King and Queen have been given special movement abilities that are different from traditional chess.
How to Play
Open index.html in your browser.
Choose your opponent (AI or Human).
Start the game and move the pieces according to the rules mentioned above.
The game continues until one player captures the opponent's King (Hero1).
Future Enhancements
Adding AI functionality to play against the computer.
Implementing animations for piece movements.
Enhancing the UI with better graphics and sound effects.
