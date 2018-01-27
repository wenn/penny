const Selectable = base => class extends base {

  __selected = undefined;

  setSelected(v) {
    this.__selected = v;
  }

  getSelected() {
    return this.__selected;
  }
}

export default Selectable;