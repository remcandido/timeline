import React, { Component } from 'react';

class Trial extends Component {
 
  adaptWidthToMonth(interval) {
    return (interval * 5) + 'px'
  }
  adaptHeightToCollide(collide) {
    let divisor = collide % 2 != 0 ? collide - 1 : collide;
    return (250 / divisor) + 'px'
  }

  render() {
   
    return (
      <div className='positioner' style={{
        width: this.adaptWidthToMonth(this.props.end - this.props.start),
        height: this.adaptHeightToCollide(this.props.collide),
        position: 'absolute',
        left: (this.props.start * 5  + this.props.xPositionToBegin) }}>
        <div className='trial'
          style={{
            width: this.adaptWidthToMonth(this.props.end - this.props.start),
            height: this.adaptHeightToCollide(this.props.collide),
            position: 'relative',
            top:this.props.top}}>
          <span> {this.props.title} </span>
       
        </div>
      </div>
    )
  }
}
export default Trial;