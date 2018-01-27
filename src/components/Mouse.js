const Event = Object.freeze({
  UNKNOWN: "unknown",
  DOWN: "mousedown",
  MOVE: "mousemove",
  UP: "mouseup",
});

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Mouse {

  constructor(coord, event) {
    this.coord = coord;
    this.event = event;
  }
}

export {
  Event,
  Coord,
  Mouse
}