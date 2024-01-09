export const Rules = () => (
  <section className="section">
    <div>
      <h1>Welcome to Pokémon Top Trumps! Gotta Catch ‘Em All!</h1>
    </div>
    <div>
      <h2>Here are the rules to play.</h2>
    </div>
    <ol>
      <li> The game is out of 5 rounds.</li>
      <li>Each player is given 5 random Pokémon cards. </li>
      <li>
        Each card has details about the Pokemon include 5 key stats that can be
        compared. These stats are. Attack,Speed,Defence,Hit Point(hp),Weight
      </li>
      <li>
        A player gets to turn their card first and pick an attribute to compare
        against the other players.
      </li>

      <li>
        The other players cards then flip over and the stat of the attribute
        chosen by the player is compared.
      </li>
      <li>
        The player with the higher stat for that attribute wins the round! (If
        both players have the same stat score then the first player of the round
        wins the point.)
      </li>
      <li>The player with the most wins in 5 rounds is the winner!</li>
    </ol>
  </section>
);
