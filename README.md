# Simple Interactive Chess Playing Game

This interactive chess game project utilizes React for the frontend, Flask for the backend, and the open source chess engine - Stockfish for analyzing chess piece movements. The user plays as white, while Stockfish plays as black, responding to the user's moves with a response time of less than 2 seconds.

## Current Available Functions (v1.0)

1. User vs. Stockfish: The user plays as white, and Stockfish plays as black.
2. Move Indicator: An indicator on top of the board shows the current move.
3. Response Time: Stockfish responds to user moves within 2 seconds.

## Limitations (Improvements for Next Patch)

1. Player Color Choice: Allow users to choose between playing as white or black.
2. Castling: Implement castling functionality.
3. Timer Function: Add a timer for both players to limit the time for each move.
4. Game Reset: Include a function to reset the game.
5. Improved UI: Enhance the user interface for a more interactive experience.
6. Better Chess Icons: Replace or improve the chess piece icons.
7. Stockfish Configuration: Allow users to configure Stockfish settings.
8. Board Color Configuration: Enable users to change the color of the chessboard.
9. Move Log: Add a log to track chess piece movements during the game.

## Project Structure

The project is bootstrapped with Create React App [https://github.com/facebook/create-react-app]. The frontend communicates with the Stockfish engine [https://stockfishchess.org/] through the Flask backend [https://flask.palletsprojects.com/en/3.0.x/].

## How to Run

1. Clone the **main** repository.
2. Navigate to the project directory.
3. Install dependencies for both the frontend and backend.
4. Run the React app and Flask server.
