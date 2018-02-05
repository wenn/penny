const Hashable = base => class extends base {
  _value = undefined;

  hashCode() {
    if (this._value === undefined) {
      this._value = hash(this.hashString());
    }

    return this._value;
  };

  hashString() { throw new Error("Not implemented") }
}

function hash(str) {
  var _hash = 0;
  for (var i = 0; i < str.length; i++) {
    var character = str.charCodeAt(i);
    _hash = ((_hash << 5) - _hash) + character;
    _hash = _hash & _hash; // Convert to 32bit integer
  }

  return _hash;
};

export default Hashable;
export { hash };