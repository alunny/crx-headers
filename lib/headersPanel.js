function DomReady() {
    chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
        alert('xox');
        console.log(details);
    });
}

document.addEventListener('DOMContentLoaded', DomReady, false);
