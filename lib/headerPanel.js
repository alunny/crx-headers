var _entries = {};

function delegate(name, selector, fun) {
    document.addEventListener(name, function (evt) {
        if (evt.target.webkitMatchesSelector(selector)) {
            fun.call(evt.target, evt);
        }
    });
}

function addCell(row, text, attrs) {
    var cell = document.createElement('td');
    cell.innerText = text;

    if (attrs) {
        for (a in attrs) {
            if (attrs.hasOwnProperty(a)) {
                if (a == 'innerHTML') {
                    cell.innerHTML = attrs[a];
                } else {
                    cell.setAttribute(a, attrs[a]);
                }
            }
        }
    }

    row.appendChild(cell)
}

function addHeaderRow(tableEle, header) {
    var newRow = document.createElement('tr'),
        checkbox;

    checkbox = '<input type="checkbox" ' + (header.enabled ? 'checked' : '') + '/>';

    newRow.setAttribute('id', header.id);

    addCell(newRow, '',
            { class: 'header_enabled',
              innerHTML: checkbox });
    addCell(newRow, header.name);
    addCell(newRow, header.value);
    addCell(newRow, header.hosts);
    addCell(newRow, '', { class: 'header_trash' });

    tableEle.appendChild(newRow);
}

function formSubmit(evt) {
    var headerEntry,
        headersTable = document.querySelector('#existing_headers tbody');

    evt.preventDefault();

    headerEntry = new HeaderEntry(this.header_name.value,
                                    this.header_value.value,
                                    this.header_hosts.value);
    _entries[headerEntry.id] = headerEntry;

    console.log(headerEntry.serialize());

    this.header_name.value = '';
    this.header_value.value = '';
    this.header_hosts.value = '';

    addHeaderRow(headersTable, headerEntry);

    arrayStore.add('crx_headers', headerEntry);

    return false;
}

function trash(evt) {
    var row = this.parentElement,
        tbody = row.parentElement,
        entry = _entries[row.id];

    if (confirm('Are you sure you want to delete this header?')) {
        arrayStore.remove('crx_headers', entry);

        tbody.removeChild(row);
    }
}

function enabledChange(evt) {
    var headerId = this.parentElement.parentElement.id,
        entry = _entries[headerId];

    entry.enabled = this.checked;
    arrayStore.update('crx_headers', entry);
}

function DomReady() {
    var headersTable = document.querySelector('#existing_headers tbody'),
        headersForm = document.getElementById('new_headers');

    headersForm.addEventListener('submit', formSubmit, false);

    arrayStore('crx_headers').forEach(function (header) {
        _entries[header.id] = header;
        addHeaderRow(headersTable, header);
    });

    delegate('click', 'td.header_trash', trash);
    delegate('change', 'td.header_enabled input', enabledChange);
}

document.addEventListener('DOMContentLoaded', DomReady, false);
