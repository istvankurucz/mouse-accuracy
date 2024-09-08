export default function navigate(pathname) {
	const isDevMode = window.location.port !== "";

	if (isDevMode) window.location.pathname = pathname;
	else {
		if (window.location.pathname.includes(".html")) {
			const pathnameParts = window.location.pathname.split("/");
			const newPathname = `/${pathnameParts[1]}/${pathname}`;

			window.location.pathname = newPathname;
		} else {
			window.location.pathname += pathname;
		}
	}

	console.log(window.location.pathname);
}
