import React from 'react';

import Spending from "components/App/Spendings/Spending"
import Header from "components/App/Spendings/Header"
import ReactDOM from 'react-dom';

class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const Event = Object.freeze({
  DOWN: "mousedown",
  UP: "mouseup",
  MOVE: "mousemove",
});

class Mouse {

  constructor(start, event) {
    this.start = start;
    this.event = event;
  }
}

function Box(props) {
  return (
    <div className="selection-box" style={props.style}> </div>
  );
}

class Table
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = { mouse: undefined };
    [this.addEvents, this.removeEvents] = this.newEvents(this);
  }

  renderHeader(value, cls) {
    return (
      <Header
        value={value}
        onClick={() => this.props.onClick(value)}
      />
    );
  }

  newEvents(self) {
    const move = self.handleMouseMove.bind(self);
    const up = self.handleMouseUp.bind(self);

    const add = function () {
      document.addEventListener(Event.MOVE, move);
      document.addEventListener(Event.UP, up);
    };

    const remove = function () {
      document.removeEventListener(Event.MOVE, move);
      document.removeEventListener(Event.UP, up);
    };

    return [add, remove];
  }

  handleMouseDown(e) {
    const start = new Coord(e.clientX, e.clientY);

    this.setState({ mouse: new Mouse(start, Event.DOWN) });
    this.addEvents();
  }

  handleMouseMove(e) {
    e.preventDefault();
    const mouse = Object.assign({}, this.state.mouse);
    const end = new Coord(e.clientX, e.clientY);
    const topOffset = window.scrollY

    const width = Math.abs(end.x - mouse.start.x)
    const height = Math.abs(end.y - mouse.start.y)
    const left = Math.min(end.x, mouse.start.x)
    const top = Math.min(end.y, mouse.start.y) + topOffset

    const style = {
      left: left,
      top: top,
      width: width,
      height: height
    }

    ReactDOM.render(
      <Box style={style} />,
      document.getElementById('proxy')
    );
  }

  handleMouseUp(e) {
    this.setState({ mouse: new Mouse(undefined, Event.UP) });
    ReactDOM.unmountComponentAtNode(document.getElementById('proxy'))
    this.removeEvents();
  }

  render() {
    return (
      <table
        onMouseDown={this.handleMouseDown.bind(this)}
      >
        <tbody>
          <tr>
            {this.renderHeader(Spending.Enum.DATETIME)}
            {this.renderHeader(Spending.Enum.MERCHANT)}
            {this.renderHeader(Spending.Enum.AMOUNT)}
          </tr>
          {this.props.records}
        </tbody>
      </table>
    );
  }
}

export default Table