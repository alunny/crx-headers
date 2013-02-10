function HeaderEntry(name, value, hosts) {
    this.name = name;
    this.value = value;
    this.hosts = hosts;

    this.id = uniqueId();
    this.enabled = true;
}

HeaderEntry.deserialize = function (str) {
    var old = JSON.parse(str), _new;

    _new = new HeaderEntry(old.name, old.value, old.hosts);
    _new.id = old.id;

    return _new;
}

HeaderEntry.prototype.serialize = function () {
    return JSON.stringify({
        'name': this.name,
        'value': this.value,
        'hosts': this.hosts,
        'id': this.id,
        'enabled': this.enabled
    });
}

function uniqueId() {
    return 'header_' + +(new Date) + '_' + Math.floor(Math.random() * 1000);
}
