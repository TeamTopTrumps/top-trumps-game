# Top Trumps Game

This game was created as part of the Tech Returners team project.

## Pokémon - Gotta catch 'em All!

This project generates a [Top Trumps](https://en.wikipedia.org/wiki/Top_Trumps) game using Pokémon data.

The Pokémon data is fetched from https://pokeapi.co/

## Project Structure

This project holds both frontend and backend code.

### Backend

The backend code is in the `server` folder. The code here fetches the API data from the Pokémon API and generates a list and card endpoint for the game.

The code uses Express.

To run tests

```
npm install
npm run test-server
```

To run as a standalone app

```
npm install
npm run start-server
```

Navigate to http://localhost:8080/api/pokemon for a list of pokémon ids and http://localhost:8080/api/pokemon/:id for card data for a pokémon.

### Frontend

The frontend code is in the `client` folder. The code here calls the backend server code to fetch the list of data to use as cards. It then generates a game with players and rounds. Once the game commences it will keep track of who has won each round and declare an overall winner. The rules of the game can be round in the Rules component.

The frontend code uses Vite.

To run tests

```
npm install
npm run test-client
```

To run as a standalone app (though it requires the backend data so not much will happen if you do this!)

```
npm install
npm run start-client
```

Navigate to: http://localhost:5173/

## To run the application as a whole and play the game!

`npm start`

Navigate to localhost: http://localhost:5173/ and have fun!

## Current implementation

- Works for 2 players over 5 rounds
- Both players have to be humans

## Extensions we'd like to next

- Have more players able to play
- Let the players decide how many rounds to play
- Have the computer be a player so a human could play against the computer
- Integrate other types of data so we can branch out to other Top Trump versions. Such as Football players or Marvel characters.

## Contributors to this project

- [Becca Rothwell](https://github.com/beccarothwell)
- [Jenny Sivapalan](https://github.com/jennysivapalan)
- [Kruth Bharath](https://github.com/Kruthibharath)
- [Paul Wharin](https://github.com/orogeny)
- [Mansoor Afzal Durrani](https://github.com/MansoorAfzalDurrani)
