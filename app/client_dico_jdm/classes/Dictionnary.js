"use strict";
var Dictionnary = (function () {
    /*
      constructor(init: { key: string; value: any; }[]) {
    
        for (var x = 0; x < init.length; x++) {
          this[init[x].key] = init[x].value;
          this._keys.push(init[x].key);
          this._values.push(init[x].value);
        }
      }
      */
    function Dictionnary() {
        this._keys = [];
        this._values = [];
    }
    Dictionnary.prototype.add = function (key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    };
    Dictionnary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionnary.prototype.item = function (key) {
        return this._values[key];
    };
    Dictionnary.prototype.keys = function () {
        return this._keys;
    };
    Dictionnary.prototype.values = function () {
        return this._values;
    };
    Dictionnary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    };
    Dictionnary.prototype.toLookup = function () {
        return this;
    };
    return Dictionnary;
}());
exports.Dictionnary = Dictionnary;
//# sourceMappingURL=Dictionnary.js.map