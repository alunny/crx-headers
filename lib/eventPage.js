/*
 * uses webRequest API to add headers to outgoing requests
 */

var filter = { urls: ['<all_urls>'] },
    perms = ['blocking', 'requestHeaders'];

function attachHeader(details) {

    details.requestHeaders.push({
        name: 'x-another-header',
        value: 'foo'
    })

    return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(attachHeader,
                                                    filter,
                                                    perms);
