import React from 'react';
import ReactDOM from 'react-dom';

import Sorter from "utils/Sorter"

import Spending from "components/App/Spendings/Spending";
import Header from "components/App/Spendings/Header";
import Record from "components/App/Spendings/Record";
import Box from "components/App/Spendings/SelectionBox";
import { Event, Coord, Mouse } from "components/Mouse";

class Table
  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mouse: new Mouse(undefined, Event.UNKNOWN),
      sort: "+" + Spending.Enum.MERCHANT
    };

    [this.addEvents, this.removeEvents] = this.newEvents(this);
  }

  headerHandleClick(header) {
    let current = this.state.sort;
    let order = Sorter.toggleOrder(current.charAt(0));

    this.setState({
      sort: order + header
    });

    return this.render();
  }

  renderHeader(value, cls) {
    return (
      <Header
        value={value}
        className={cls}
        onClick={() => this.headerHandleClick(value)}
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

    const start = this.state.mouse.coord;
    const moved = new Coord(e.clientX, e.clientY);
    const topOffset = window.scrollY;
    const boxStyle = this.selectionBoxDimension(start, moved, topOffset);

    ReactDOM.render(
      <Box style={boxStyle} />,
      document.getElementById('proxy')
    );
  }

  handleMouseUp(e) {
    this.setState({ mouse: new Mouse(undefined, Event.UP) });
    ReactDOM.unmountComponentAtNode(document.getElementById('proxy'));
    this.removeEvents();
  }

  handleMouseEnter(e, spending) {
    if (this.state.mouse.event === Event.DOWN) {
      spending.setSelected(true);
      this.props.onSelect(spending);
    }
  }

  handleMouseLeave(e, spending) {
    if (this.state.mouse.event === Event.DOWN) {
      spending.setSelected(false);
      this.props.onSelect(spending);

      // const moved = this.state.mouseMoved.coord;
      // console.log("el", e)
      // console.log("el", e.target)
      // console.log("mouse", [moved.x, moved.y])
    }
  }

  selectionBoxDimension(start, moved, topOffset) {
    const width = Math.abs(moved.x - start.x);
    const height = Math.abs(moved.y - start.y);
    const left = Math.min(moved.x, start.x);
    const top = Math.min(moved.y, start.y) + topOffset;

    return {
      left: left,
      top: top,
      width: width,
      height: height
    };
  }

  toggleSelect(spending) {
    const selected = spending.getSelected() ? false : true;
    spending.setSelected(selected);
    this.props.onSelect(spending);
  }

  renderRecords(spendings) {
    return spendings
      .sort(Sorter.sort(this.state.sort))
      .map(spending => {
        return (
          <Record key={spending.hashCode()}
            value={spending}
            onMouseLeave={(e) => this.handleMouseLeave.bind(this)(e, spending)}
            onMouseEnter={(e) => this.handleMouseEnter.bind(this)(e, spending)}
            onClick={() => this.toggleSelect(spending)}
          />
        );
      });
  }

  render() {
    return (
      <table
        onMouseDown={this.handleMouseDown.bind(this)}>
        <tbody>
          <tr>
            {this.renderHeader(Spending.Enum.DATETIME)}
            {this.renderHeader(Spending.Enum.MERCHANT)}
            {this.renderHeader(Spending.Enum.AMOUNT, 'currency')}
          </tr>
          {this.renderRecords(this.props.value)}
        </tbody>
      </table>
    );
  }
}

export default Table;