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

function addHeaderRow(tableEle, header) {
    var newRow = document.createElement('tr'),
        enabledCell,
        nameCell,
        valueCell,
        hostsCell,
        trashCell;

    newRow.setAttribute('id', header.id);

    enabledCell = document.createElement('td');
    enabledCell.setAttribute('class', 'header_enabled');
    enabledCell.innerText = 'ENABLED';
    newRow.appendChild(enabledCell);

    nameCell = document.createElement('td');
    nameCell.innerText = header.name;
    newRow.appendChild(nameCell);

    valueCell = document.createElement('td');
    valueCell.innerText = header.value;
    newRow.appendChild(valueCell);

    hostsCell = document.createElement('td');
    hostsCell.innerText = header.hosts;
    newRow.appendChild(hostsCell);

    trashCell = document.createElement('td');
    trashCell.setAttribute('class', 'header_trash');
    trashCell.innerText = 'TRASH';
    newRow.appendChild(trashCell);

    tableEle.appendChild(newRow);
}

function formSubmit(evt) {
    var headerEntry;
    var headersTable = document.getElementById('existing_headers');

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
    var headersTable = document.getElementById('existing_headers'),
        headersForm = document.getElementById('new_headers');

    headersForm.addEventListener('submit', formSubmit, false);

    arrayStore('crx_headers').forEach(function (header) {
        addHeaderRow(headersTable, header);
    });
}

document.addEventListener('DOMContentLoaded', DomReady, false);
