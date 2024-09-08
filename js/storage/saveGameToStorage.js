import Game from "../classes/Game.js";

export default function saveGameToStorage(game = new Game()) {
	// Convert the object to string and save to storage
	window.sessionStorage.setItem("game", JSON.stringify(game));
}
