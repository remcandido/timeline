# timeline

The goal here is to build a timeline of multiple clinical trials

## Running Locally

1. Checkout git repository locally: `git@github.com:remcandido/timeline.git`
1. `npm install`
1. View `http://localhost:3000/`

## Update trials 

call  ` renderClinicalTrials([
          { 'start': 5, 'end': 50, 'title': 'Study of Bendamustine' },
  		  { 'start': 55, 'end': 85, 'title': 'ASCT With Nivolumab' },
          { 'start': 70, 'end': 100, 'title': 'Study of Stockolm' },
          { 'start': 90, 'end': 115, 'title': 'Bortezomib' }
    ]);`

 with new trials Array (title should be unique to work) and reload.
 
 
