var _entries;

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

    addCell(newRow, 'ENABLED',
            { class: 'header_enabled',
              innerHTML: checkbox });
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

function trash(evt) {
    console.log(this);
}

function enabledChange(evt) {
    console.log(this.checked);
}

function DomReady() {
    var headersTable = document.querySelector('#existing_headers tbody'),
        headersForm = document.getElementById('new_headers');

    headersForm.addEventListener('submit', formSubmit, false);

    arrayStore('crx_headers').forEach(function (header) {
        addHeaderRow(headersTable, header);
    });

    delegate('click', 'td.header_trash', trash);
    delegate('change', 'td.header_enabled input', enabledChange);
}

document.addEventListener('DOMContentLoaded', DomReady, false);
