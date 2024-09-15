export default function createTargetElement(top, left, d, growingTime, showTime, isResult = false) {
	// Create the element
	const target = document.createElement("div");

	// Position and size
	target.style.setProperty("--x", left);
	target.style.setProperty("--y", top);
	target.style.setProperty("--d", d);

	// Add the classes
	target.classList.add("circle");
	if (isResult) target.classList.add("circle--result");
	else target.classList.add("circle--show");

	// Times
	target.style.setProperty("--growing-time", growingTime);
	target.style.setProperty("--show-time", showTime);

	// Return the decorated element
	return target;
}
