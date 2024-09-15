import navigate from "../navigation/navigate.js";
import getGameFromStorage from "../storage/getGameFromStorage.js";
import saveGameToStorage from "../storage/saveGameToStorage.js";
import createHitMissIcon from "../utils/createHitMissIcon.js";
import createTargetElement from "../utils/createTargetElement.js";

// Get the game object from storage
const game = getGameFromStorage();

// Updates the settings section with game object data
function setSettings() {
	const difficultyElement = document.querySelector(
		".result__settings__row--difficulty .result__settings__row__value"
	);
	const durationElement = document.querySelector(
		".result__settings__row--duration .result__settings__row__value"
	);

	difficultyElement.innerHTML = game.difficulty;
	durationElement.innerHTML = `${game.duration} seconds`;
}

// Updates the scores section with game object data
function setScores() {
	// Score
	const scoreElement = document.querySelector(".result__score__box--score");
	const finalScoreElement = scoreElement.querySelector(
		".result__score__box__row--finalScore .result__score__box__row__value"
	);
	const baseScoreElement = scoreElement.querySelector(
		".result__score__box__row--baseScore .result__score__box__row__value"
	);
	const multiplierElement = scoreElement.querySelector(
		".result__score__box__row--multiplier .result__score__box__row__value"
	);

	finalScoreElement.innerHTML = game.getFinalScore();
	baseScoreElement.innerHTML = game.baseScore;
	multiplierElement.innerHTML = game.multiplier;

	// Target efficiency
	const targetElement = document.querySelector(".result__score__box--targets");
	const targetPercentElement = targetElement.querySelector(
		".result__score__box__row--targetEfficiency .result__score__box__row__value"
	);
	const targetFractionElement = targetElement.querySelector(
		".result__score__box__row--targetFraction .result__score__box__row__value"
	);

	targetPercentElement.innerHTML = `${game.getTargetEfficiency()}%`;
	targetFractionElement.innerHTML = `${game.getHitCount()} / ${game.getTargetCount()}`;

	// Click efficiency
	const clicksElement = document.querySelector(".result__score__box--clicks");
	const clicksPercentElement = clicksElement.querySelector(
		".result__score__box__row--clickEfficiency .result__score__box__row__value"
	);
	const clicksFractionElement = clicksElement.querySelector(
		".result__score__box__row--clickFraction .result__score__box__row__value"
	);

	clicksPercentElement.innerHTML = `${game.getClickEfficiency()}%`;
	clicksFractionElement.innerHTML = `${game.getHitCount()} / ${game.getClickCount()}`;
}

// Show the click map
function showClicksMap() {
	const mapArea = document.querySelector(".result__section--clicks");

	// Targets
	game.targets.forEach((target) => {
		const targetElement = createTargetElement(
			target.top,
			target.left,
			game.diameter,
			`${game.growingTime}s`,
			`${game.showTime}s`,
			true
		);
		mapArea.appendChild(targetElement);
	});

	// Clicks
	game.clicks.forEach((click) => {
		const icon = createHitMissIcon(click.isHit, click.top, click.left, true);
		mapArea.appendChild(icon);
	});
}

setSettings();
setScores();
showClicksMap();

// Handlig restart button click event
const restartButton = document.querySelector(".result__restart");
restartButton.addEventListener("click", () => {
	// Reset the game object
	game.restart();

	// Save the game object
	saveGameToStorage(game);

	// Navigate back to Game page
	navigate("game.html");
});
