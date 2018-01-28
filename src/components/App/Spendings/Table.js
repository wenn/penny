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
      sort: Sorter.Order.DESC
    };

    [this.addEvents, this.removeEvents] = this.newEvents(this);
  }

  headerHandleClick() {
    let order = Sorter.toggleOrder(this.state.sort);
    this.setState({ sort: order });
    this.render();
  }

  renderHeader(value, cls) {
    return (
      <Header
        value={value}
        className={cls}
        onClick={this.headerHandleClick.bind(this)}
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
    const start = this.state.mouse.coord;
    const moved = new Coord(e.clientX, e.clientY);
    const boxStyle = this.selectionBoxDimension(start, moved);

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
      spending.setSelected(true)
      this.props.onSelect(spending);
    }
  }

  // TODO, doesn't work too well.
  handleMouseLeave(e, spending) {
    if (this.state.mouse.event === Event.DOWN) {

      const el = document.getElementById(spending.hashCode());
      const elOffset = this.offsetOfDocument(el);

      const start = this.state.mouse.coord;
      const moved = new Coord(e.clientX, e.clientY);
      const box = this.selectionBoxDimension(start, moved)

      const min = box.top;
      const max = box.top + box.height;
      const elMin = elOffset.top
      const elMax = elOffset.top + el.height
      const stillIn = (max >= elMin && elMin >= min)
        || (max >= elMax && elMax >= min);

      if (!stillIn) {
        spending.setSelected(false);
        this.props.onSelect(spending);
      }
    }
  }

  offsetOfDocument(el) {
    const rect = el.getBoundingClientRect();
    const doc = document.documentElement;
    const scrollLeft = window.pageXOffset || doc.scrollLeft;
    const scrollTop = window.pageYOffset || doc.scrollTop;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    }
  }

  selectionBoxDimension(start, moved) {
    const doc = document.documentElement;
    const topOffset = window.pageYOffset || doc.scrollTop;

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
      .sort((a, b) => {
        const av = a.merchant + a.datetime.toString();
        const ab = b.merchant + b.datetime.toString();

        if (this.state.sort === "+") {
          return av > ab ? 1 : -1;
        }
        else {
          return av < ab ? 1 : -1;
        }
      })
      .map(spending => {
        return (
          <Record key={spending.hashCode()}
            value={spending}
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
            {this.renderHeader(Spending.Enum.DATETIME, '')}
            {this.renderHeader(Spending.Enum.MERCHANT, '')}
            {this.renderHeader(Spending.Enum.AMOUNT, 'currency')}
          </tr>
          {this.renderRecords(this.props.value)}
        </tbody>
      </table>
    );
  }
}

export default Table;