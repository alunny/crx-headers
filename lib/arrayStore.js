/* 
 * minimally efficient storage of lists in localStorage
 */

function arrayStore(name, arr) {
    if (arr === undefined) {
        return JSON.parse(localStorage.getItem(name));
    } else {
        localStorage.setItem(name, JSON.stringify(arr));
    }
}

arrayStore.add = function (name, obj) {
    var arr = arrayStore(name) || [];

    arr.push(obj);

    arrayStore(name, arr);
}

arrayStore.remove = function (name, obj) {
    var arr = arrayStore(name);

    if (!arr)
        return;

    arr = arr.filter(function (entry) {
        return entry.id != obj.id;
    });

    arrayStore(name, arr);
}

arrayStore.update = function (name, obj) {
    var arr = arrayStore(name) || [];

    arr = arr.map(function (entry) {
        if (entry.id != obj.id) {
            return entry;
        } else {
            return obj;
        }
    });

    arrayStore(name, arr);
}
