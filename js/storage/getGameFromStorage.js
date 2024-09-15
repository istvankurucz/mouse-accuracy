import Game from "../classes/Game.js";

export default function getGameFromStorage() {
	// Get the item from the storage and parse to JS
	const game = JSON.parse(window.sessionStorage.getItem("game"));

	// If there is no game currently in the storaga -> return a new one
	if (game === null) return new Game();

	// Create a new Game object based on the storage data
	return new Game(
		game.difficulty,
		game.duration,
		game.timeRemaining,
		game.baseScore,
		game.multiplier,
		game.scoringRules,
		game.targets,
		game.clicks,
		game.diameter,
		game.spawnTime,
		game.growingTime,
		game.showTime
	);
}
