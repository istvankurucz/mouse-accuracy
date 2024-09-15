import navigate from "../navigation/navigate.js";
import getGameFromStorage from "../storage/getGameFromStorage.js";
import saveGameToStorage from "../storage/saveGameToStorage.js";
import createHitMissIcon from "../utils/createHitMissIcon.js";
import createTargetElement from "../utils/createTargetElement.js";

// Get the game from storage
const game = getGameFromStorage();

// Decreases the game start countdown in every second
function doGameStartCountdown() {
	// Initial seconds for countdown
	let seconds = 4;

	// DOM elements
	const gameStartElement = document.querySelector(".game__start");
	const gameStartValueElement = document.querySelector(".game__start__value");

	// Decrease the seconds value by 1 after one second
	const interval = setInterval(() => {
		seconds--;
		gameStartValueElement.innerHTML = seconds.toString();

		// Remove the interval and the element
		if (seconds === 0) {
			gameStartElement.remove();
			clearInterval(interval);
		}
	}, 1000);
}

// Sets the timer of the game when the page loaded
function initTimeLeft() {
	const timeLeftElement = document.querySelector(
		".game__header__box--timer .game__header__box__value"
	);
	timeLeftElement.innerHTML = `${game.duration} s`;
}

// Decreases the timer in every second
function setTimeLeft() {
	const timeLeftElement = document.querySelector(
		".game__header__box--timer .game__header__box__value"
	);

	const interval = setInterval(() => {
		// Decrease time by 1 second
		game.decreaseTimeRemaining();

		// Update the content of the element
		timeLeftElement.innerHTML = `${game.timeRemaining} s`;

		// If the time is over
		if (game.timeRemaining === 0) {
			clearInterval(interval);
		}
	}, 1000);
}

// Creates the circles and adds to the area
function spawnTargets() {
	const area = document.querySelector(".game__area");

	const interval = setInterval(() => {
		// Generate the position of the target
		const left = `${(Math.random() * 80 + 10).toFixed(2)}%`;
		const top = `${(Math.random() * 80 + 10).toFixed(2)}%`;

		// Create the target element
		const target = createTargetElement(
			top,
			left,
			game.diameter,
			`${game.growingTime}s`,
			`${game.showTime}s`,
			false
		);
		area.appendChild(target);

		// Update game object
		const targetObject = { top, left };
		game.addTarget(targetObject);

		if (game.timeRemaining <= game.growingTime + game.showTime / 2) clearInterval(interval);
	}, game.spawnTime * 1000);
}

// Calculates the click position relative to the area
function getClickPosition(e, parent) {
	const parentDimensions = parent.getBoundingClientRect();

	const dx = e.clientX - parentDimensions.left;
	const dy = e.clientY - parentDimensions.top;

	const top = `${((dy / parent.offsetHeight) * 100).toFixed(2)}%`;
	const left = `${((dx / parent.offsetWidth) * 100).toFixed(2)}%`;

	return { top, left };
}

// Handles the click event during the game
function handleGameClick(e) {
	const isHit =
		e.target.classList.contains("circle") && !e.target.classList.contains("circle--hit");

	// Get the position of the click
	const area = document.querySelector(".game__area");
	const { top, left } = getClickPosition(e, area);

	// Update the game object
	const clickObject = { top, left, isHit };
	game.addClick(clickObject);
	game.updateScore(isHit);

	// Add the style to the circle
	if (isHit) {
		e.target.classList.remove("circle--show");
		e.target.classList.add("circle--hit");
	}

	// Add hit/miss icon
	const iconElement = createHitMissIcon(isHit, top, left);
	area.appendChild(iconElement);

	// Update the score
	const scoreElement = document.querySelector(
		".game__header__box--score .game__header__box__value"
	);
	scoreElement.innerHTML = `${game.getFinalScore()} p`;
}

// Redirects to the Result page
function goToResultPage() {
	document.removeEventListener("click", handleGameClick);

	saveGameToStorage(game);

	navigate("result.html");
}

function main() {
	initTimeLeft();
	doGameStartCountdown();

	// Exit button click -> navigate to Result page
	const headerExitButton = document.querySelector(".header__exit");
	headerExitButton.addEventListener("click", goToResultPage);

	// After countdown finished
	setTimeout(() => {
		setTimeLeft();
		spawnTargets();

		document.addEventListener("click", handleGameClick);

		// After the game finished
		setTimeout(goToResultPage, game.duration * 1000);
	}, 3000);
}

main();
