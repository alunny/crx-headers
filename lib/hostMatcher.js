function HostMatcher(input) {
    var rxString;

    this.glob = input;

    if (this.glob === '*') {
        this.rx = /.*/; // match everything
    } else {
        if (input.indexOf('*') > 0) {
            throw new Error('"*" must be at start of host');
        }

        rxString = input.replace(/\./g, '\\.');
        rxString = rxString.replace(/^\*\\\./, '(?:[^\*]+\\.)?');
        rxString = rxString.replace(/^\*/, '.*');

        this.rx = new RegExp(rxString);
    }
}

HostMatcher.prototype.match = function (url) {
    var hostname = url.match(HostMatcher.R_HOSTNAME)[1];
    return this.rx.test(hostname);
}

HostMatcher.R_HOSTNAME = /^\w+:\/\/([^\/]+).*$/;
