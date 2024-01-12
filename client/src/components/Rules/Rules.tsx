import "./Rules.scss";

export const Rules = () => (
  <div className="rules">
    <h1>Welcome to Pokémon Top Trumps! Gotta Catch ‘Em All!</h1>
    <h2>Rules to play.</h2>
    <ol>
      <li>A game is 5 rounds.</li>
      <li>Each player is given 5 random Pokémon cards.</li>
      <li>
        Each card has 5 key Pokémon attributes that can be compared: Attack,
        Speed, Defence, Hit Points (HP), and Weight
      </li>
      <li>
        Each round one player turns their card and picks an attribute to
        compare.
      </li>
      <li>The other players' cards are then revealed.</li>
      <li>
        The player with the highest value stat for the chosen attribute wins the
        round! (If two or more players have the same highest value stat then the
        current player wins the round.)
      </li>
      <li>The player with the most wins in 5 rounds is the winner!</li>
    </ol>
  </div>
);
