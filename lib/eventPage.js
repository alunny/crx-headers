/*
 * uses webRequest API to add headers to outgoing requests
 */

var filter = { urls: ['<all_urls>'] },
    perms = ['blocking', 'requestHeaders'];

function attachHeader(details) {

    arrayStore('crx_headers').forEach(function (header) {
        details.requestHeaders.push({
            name: header.name,
            value: header.value
        })
    });


    return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(attachHeader,
                                                    filter,
                                                    perms);
