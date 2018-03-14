import React from 'react';

export default class LineCaption extends React.Component {

  render() {
    const style = {
      width: `295px`,
      float: `left`      
    }; 
    return <div style={style}><span>{this.props.text}</span></div>;
  }
}
