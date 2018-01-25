class Hashable {
  _value = undefined;

  hashCode() {
    if (this._value === undefined) {
      var hash = 0;
      for (var i = 0; i < this.hashString().length; i++) {
        var character = this.hashString().charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
      }

      this._value = hash;
    }

    return this._value;
  };

  hashString() { throw new Error("Not implemented") }
}

export default Hashable