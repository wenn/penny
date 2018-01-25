class Hashable {
  hashCode() {
    var hash = 0;
    for (var i = 0; i < this.hashString().length; i++) {
      var character = this.hashString().charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  hashString() { throw new Error("Not implemented") }
}

export default Hashable