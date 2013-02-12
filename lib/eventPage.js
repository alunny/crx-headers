/*
 * uses webRequest API to add headers to outgoing requests
 */

var filter = { urls: ['<all_urls>'] },
    perms = ['blocking', 'requestHeaders'];

function attachHeader(details) {
    var matcher;

    arrayStore('crx_headers').forEach(function (header) {
        matcher = new HostMatcher(header.hosts);

        if (header.enabled && matcher.match(details.url)) {
            details.requestHeaders.push({
                name: header.name,
                value: header.value
            })
        }
    });


    return {requestHeaders: details.requestHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(attachHeader,
                                                    filter,
                                                    perms);
