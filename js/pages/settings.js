import navigate from "../navigation/navigate.js";
import getGameFromStorage from "../storage/getGameFromStorage.js";
import saveGameToStorage from "../storage/saveGameToStorage.js";

// Get game object
const game = getGameFromStorage();

// Collects the data from the radio buttons
function getSettingsParameters() {
	let difficulty;
	const difficultyRadios = document.querySelectorAll(".settings__row--difficulty .radio__input");
	difficultyRadios.forEach((radio) => {
		if (radio.checked) {
			const id = radio.getAttribute("id");
			difficulty = id.substring("settingsDifficulty".length).toLowerCase();
		}
	});

	let duration;
	const durationRadios = document.querySelectorAll(".settings__row--duration .radio__input");
	durationRadios.forEach((radio) => {
		if (radio.checked) {
			const id = radio.getAttribute("id");
			duration = parseInt(id.substring("settingsDuration".length));
		}
	});

	return { difficulty, duration };
}

const startButton = document.querySelector(".settings__start");
startButton.addEventListener("click", () => {
	// 1. Get the parameters
	const { difficulty, duration } = getSettingsParameters();

	// 2. Update the game object
	game.restart();
	game.setDifficulty(difficulty);
	game.setDuration(duration);

	// 3. Save the object to session storage
	saveGameToStorage(game);

	// 3. Naviagte to game.html
	// window.location.pathname = "./game.html";
	navigate("game.html");
});
