
import React from 'react';
import Line from './Line.jsx';
import LineCaption from './LineCaption.jsx';

/** 
 * Create a Caption
 * 
 * Create one horizontal line 
 * Create x verticals lines to mark units
 * Add units text below
 * **/
export default class Caption extends React.Component {
    
    render() {
        let interval = this.props.to - this.props.from;
        let years = Array(interval + 1).fill().map((x, i) => i);
        return (
            <div>
                <div>
                    <Line from={{ x: 0, y: 20 }} to={{ x: (60 * interval), y: 20 }} uniqueKey={'linex'}/>
                    {
                        years.map((current, index) => {
                            return (
                                    <Line from={{ x: current * 60, y: 20 }}
                                        to={{ x: current * 60, y: 25 }} key ={'mLine' + index}/>
                            )
                        })
                    }
                </div>
                <div className='caption'>
                    {
                        years.filter(el => el % 5 == 0).map((current, index) => {
                            return (
                                <LineCaption text={(this.props.from + current).toString()} key ={'mLineCaption' + index} />
                            )
                        })
                    }
                </div>
            </div >);
    }
}