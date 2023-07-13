# Side Stacker Game
Side-Stacker GameThis is essentially connect-four, but the pieces stack on either side of the board instead of bottom-up.
Two players see a board, which is a grid of 7 rows and 7 columns. They take turn adding pieces to a row, on one of the sides. The pieces stack on top of each other, and the game ends when there are no spaces left available, or when a player has four consecutive pieces on a diagonal, column, or row.

## How to run this project:
### Requirements:
1. Docker installed

### Steps:
1. Clone this repository and cd into it
2. Run `docker-compose up` in the root directory of this project
3. Wait for the docker containers to be built and run
4. Be sure the **frontend** container is running and show the Vite message `running at: http://localhost:3000`
5. Open your browser and go to `localhost:3000`
6. Enjoy the game!

## How to play:
1. Create new game or Join a game
2. If you create a game you can share the link with your friend to join the game or share the game id
3. If you join a game you need to enter the game id or just use the link directly
4. Once you are in the game you can start playing
5. To play you should use one of the buttons on each side of the board
6. The game ends when there are no spaces left available, or when a player has four consecutive pieces on a diagonal, column, or row.


## Things to improve

1. Add unit tests
2. Add e2e tests
3. Add more game modes (watch mode, play with computer, etc.)
4. Add more game options (board size, number of players, etc.)
5. Add more animations
