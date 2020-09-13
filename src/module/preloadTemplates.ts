export const preloadTemplates = async function() {
	const templatePaths = [
		// Add paths to "modules/foundryvtt-canvasScroll/templates"
	];

	return loadTemplates(templatePaths);
}
