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

function addRow(tableEle, contents) {
}

function formSubmit(evt) {
    var headerEntry;

    evt.preventDefault();

    headerEntry = new HeaderEntry(this.header_name.value,
                                    this.header_value.value,
                                    this.header_hosts.value);

    console.log(headerEntry.serialize());

    this.header_name.value = '';
    this.header_value.value = '';
    this.header_hosts.value = '';

    return false;
}

function DomReady() {
    var headersTable = document.getElementById('existing_headers'),
        headersForm = document.getElementById('new_headers');

    headersForm.addEventListener('submit', formSubmit, false);
}

document.addEventListener('DOMContentLoaded', DomReady, false);
