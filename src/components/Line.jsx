import React from 'react';

export default class Line extends React.Component {

 /** 
  * Create a line from https://github.com/chtefi/react-line
  * as there is an issue from es6 syntax propTypes just transform existing code to make it works
  * **/


  render() {
    let from = this.props.from;
    let to = this.props.to;
    if (to.x < from.x) {
      from = this.props.to;
      to = this.props.from;
    }

    const len = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
    const angle = Math.atan((to.y - from.y) / (to.x - from.x));

    const style = {
      position: 'absolute',
      transform: `translate(${from.x - .5 * len * (1 - Math.cos(angle))}px, ${from.y + .5 * len * Math.sin(angle)}px) rotate(${angle}rad)`,
      width: `${len}px`,
      height: `${0}px`,
      borderBottom: this.props.style || '1px solid black',
      fontSize:`8px`
    };

    return <div style={style}></div>;
  }
}

Line.propTypes = {
    from: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
    }),
    to: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired,
    }),
    style: React.PropTypes.string
  };
