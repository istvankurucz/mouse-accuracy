import Game from "../classes/Game.js";

export default function getGameFromStorage() {
	// Get the item from the storage and parse to JS
	const game = JSON.parse(window.sessionStorage.getItem("game"));

	console.log(game);

	// If there is no game currently in the storaga -> return a new one
	if (game === null) return new Game();

	// Create a new Game object based on the storage data
	return new Game(
		game._difficulty,
		game._duration,
		game._timeRemaining,
		game._baseScore,
		game._multiplier,
		game._scoringRules,
		game._targets,
		game._clicks,
		game._diameter,
		game._spawnTime,
		game._growingTime,
		game._showTime
	);
}
