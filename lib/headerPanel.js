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

function addCell(row, text, attrs) {
    var cell = document.createElement('td');
    cell.innerText = text;

    if (attrs) {
        for (a in attrs) {
            if (attrs.hasOwnProperty(a)) {
                cell.setAttribute(a, attrs[a]);
            }
        }
    }

    row.appendChild(cell)
}

function addHeaderRow(tableEle, header) {
    var newRow = document.createElement('tr');

    newRow.setAttribute('id', header.id);

    addCell(newRow, 'ENABLED', { class: 'header_enabled' });
    addCell(newRow, header.name);
    addCell(newRow, header.value);
    addCell(newRow, header.hosts);
    addCell(newRow, 'TRASH', { class: 'header_trash' });

    tableEle.appendChild(newRow);
}

function formSubmit(evt) {
    var headerEntry,
        headersTable = document.querySelector('#existing_headers tbody');

    evt.preventDefault();

    headerEntry = new HeaderEntry(this.header_name.value,
                                    this.header_value.value,
                                    this.header_hosts.value);

    console.log(headerEntry.serialize());

    this.header_name.value = '';
    this.header_value.value = '';
    this.header_hosts.value = '';

    addHeaderRow(headersTable, headerEntry);

    arrayStore.add('crx_headers', headerEntry);

    return false;
}

function DomReady() {
    var headersTable = document.querySelector('#existing_headers tbody'),
        headersForm = document.getElementById('new_headers');

    headersForm.addEventListener('submit', formSubmit, false);

    arrayStore('crx_headers').forEach(function (header) {
        addHeaderRow(headersTable, header);
    });
}

document.addEventListener('DOMContentLoaded', DomReady, false);
