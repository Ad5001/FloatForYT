/**
 * communication.js by Ad5001
 * Used to cummunicate between webapp and main app.
 * (C) Ad5001 2017
 */

function setWidth(width) {
    document.title = JSON.stringify({width: width - 1 });
    document.title = JSON.stringify({width: width });
}
function setHeight(height) {
    document.title = JSON.stringify({height: height - 1 });
    document.title = JSON.stringify({height: height });
}
function openWindow(URL) {
    document.title = JSON.stringify({open: URL});
}