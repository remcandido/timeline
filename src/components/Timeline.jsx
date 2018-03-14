import React from 'react';
import ReactDOM from 'react-dom';
import trialService from '../services/trialService.js';
import Trial from './Trial.jsx';
import Caption from './Caption.jsx';


class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trials: '',
            minYear: 2000,
            maxYear: 2010, 
            xPositionToBegin: 0
        };
    }

    componentDidMount() {
        // Get data 
        if (!this.state.trials) {
            // From localStorage 
            if(localStorage.trials) {   
                let trials =  JSON.parse(localStorage.trials);
                this.checkCollide(trials);
                this.checkMaxYear(trials);            
                
            } else { // From data service 
               
                trialService.getTrials().then(dataFromService => {
                    let divContainer = ReactDOM.findDOMNode(this.refs['trialContainer'])
                    .getBoundingClientRect();
                    this.setState({xPositionToBegin : divContainer.x,
                         yPositionToBegin: divContainer.y});  
                         localStorage.setItem('trials', JSON.stringify(dataFromService));
                         this.checkCollide(dataFromService);
                         this.checkMaxYear(dataFromService);                        
                });
            }
           
        }
      
    }

    checkMaxYear(trials) {
        // Search max date to update caption 
        // get max end month   
        let max = Math.max(...trials.map(d => d.end));

        // Convert months to years
        var date = new Date(this.state.minYear.toString());
        date.setUTCMonth(date.getUTCMonth() + max);
        let maxYear = date.getUTCFullYear();

        // If  maxYear > this.state.maxYear we update this.state.maxYear
        maxYear = (maxYear > this.state.maxYear) ? maxYear : this.state.maxYear;

        // Udate state if needed        
        if (maxYear != this.state.maxYear) {
            this.setState({ maxYear: maxYear });
        }
    }

    doCheckCollide(trials, infosRow, last) {
 
        let findCollide = false;
        let dones =[];

        trials.map((trial, index) => {
            
            // For all trial check if there is collide with another
            let trialsCollide = trials.filter(t => 
                ((t.start < trial.end && t.start > trial.start) || (t.end > trial.start && t.end < trial.end))
                ||
                ((trial.start < t.end && trial.start > t.start) || (trial.end > t.start && trial.end < t.end))
            );
           
            // This one can be display in max height there is no collide in time
             if (trialsCollide.length == 0) {
                if(!trial['row']) {trial['row'] = 0;}
                if(!trial['top']) {trial['top'] = 0;}
                dones[trial.title] = true; // Already check don't need to check this one
               
            } else if(!dones[trial.title]){
      
                // This one have collide with another(s)
                // Mark it 'collide' and write css top need to prevent overlap
                trial['top'] = infosRow.rowUp.top;
                trial['row'] = infosRow.rowUp.row;
                dones[trial.title] = true;
                findCollide = true;
            
                trialsCollide.map(trialCollide=>{
                    // it  have collide with trial in trialsCollide
                    // Mark them 'collide' and write css top need to prevent overlap
                    if(!dones[trialCollide.title]){
                        dones[trialCollide.title] = true;
                        trialCollide['top'] = infosRow.rowDown.top +2; // 2 for margin
                        trialCollide['row'] = infosRow.rowDown.row;
                    }                 
                })
            }
    
       });
        // return array with collide info in there is collide, if not retun false
        return findCollide ? trials : false;      
    }

    // Check if trial collide in time to prevent overlap
    checkCollide(trials) {
       
      
        let infosRow = {rowUp: {row:1, top:0}, rowDown:{row:2, top:125}};
        let arrayRow = [];
        let iteration = 1;

        let isCollide = this.doCheckCollide(trials, infosRow); 

        // There is collide so need to prevent all overlap
        while(isCollide) {

            let newtrialsCopy =  [...trials.filter(trial => trial.row == iteration)];
            infosRow = {rowUp: {row:iteration+1, top:125}, rowDown:{row:iteration+2, top:(125/2) +125}};
            this.doCheckCollide(newtrialsCopy, infosRow);         
            if(iteration >= trials.length) {
                break;
            }
            iteration ++;
        }
        this.setState({ trials: trials });
        return trials;
    }

    // Render the trials
    renderTrial(trials) {
        
        let currentTrials = [];
        trials.map((currentTrial, index) => {
        
            currentTrials.push(<Trial key={'trial' + index} start={currentTrial.start} end={currentTrial.end}
                title={currentTrial.title} top={currentTrial.top} collide={currentTrial.row + 1} xPositionToBegin={this.state.xPositionToBegin} />)
        });
        return (currentTrials);
    }
    // Display the timeline (with trials or Loading message if data not completely load ) 
    renderContainerDiv(trials) {     
        return (
            <div className='container'>
                <h2>Timeline</h2>
                <div className='trial-container'  ref='trialContainer' id='trialContainer' >
                    <div>
                        {trials}
                    </div>
                </div>
                <br />
                <Caption from={this.state.minYear} to={this.state.maxYear} />
            </div>);
    }

    showTrials(trials) {
    
        // We have the data, we build the timeline
        let renderTrials = this.renderTrial(trials);
        let renderContainerDiv = this.renderContainerDiv(renderTrials);
        // Return the timeline to display
        return (renderContainerDiv);
    }

    render() {
        // Wait data to render, when data are load showTrials is called
        return this.state.trials ? this.showTrials(this.state.trials) 
                                 : this.renderContainerDiv(<span>Loading trials...</span>)
    }
}

export default Timeline;