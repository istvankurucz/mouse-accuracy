export default function createHitMissIcon(isHit, top, left, isResult = false) {
	// Create the icon
	const icon = document.createElement("div");

	// Position the icon
	icon.style.setProperty("--x", left);
	icon.style.setProperty("--y", top);

	// Add the classes
	if (isHit) {
		icon.classList.add("hit");
		if (isResult) icon.classList.add("hit--result");
	} else {
		icon.classList.add("miss");
		if (isResult) icon.classList.add("miss--result");
	}

	// Add the X mark if it is a miss
	if (!isHit) {
		const x = document.createElement("i");
		x.classList.add("fa-solid", "fa-xmark");

		icon.appendChild(x);
	}

	// Return the decorated icon
	return icon;
}
