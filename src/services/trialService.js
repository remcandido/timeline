export default (function () {

    const _trials = [{
            start: 5,
            end: 50,
            title: 'Study of Bendamustine'
        },
        {
            start: 55,
            end: 85,
            title: 'ASCT With Nivolumab'
        },
        {
            start: 70,
            end: 100,
            title: 'Study of Stockolm'
        },
        {
            start: 90,
            end: 115,
            title: 'Bortezomib'
        },
    ]

    //  const _trials = [

    //     { start: 60, end: 100, title: 'Study of Stockolm' },
    //     { start: 80, end: 125, title: 'New trial to Test 1' },
    //     { start: 55, end: 85, title: 'ASCT With Nivolumab' },
    //     { start: 90, end: 115, title: 'Bortezomib' },
    //     { start: 130, end: 155, title: 'New trial to Test 2' },
    //     { start: 150, end: 170, title: 'New trial to Test 3' },
    //     { start: 5, end: 50, title: 'Study of Bendamustine' },
    //     { start: 180, end: 195, title: 'New trial to Test 4' },
    //     { start: 200, end: 230, title: 'New trial to Test 5' },
    //     { start: 45, end: 79, title: 'New trial to Test 6' },
    //     { start: 210, end: 250, title: 'New trial to Test 7' }
    // ];

    let trialServices = {};
    /**
     * Get Trials.
     */
    let getTrials = function () {
        var promise = new Promise(function (resolve, reject) {
            _trials.sort(function (a, b) {
                return a.start > b.start;
            })
            resolve(_trials);
        });
        return promise;
    };

    let renderClinicalTrials = function (trials) {
        try {
            localStorage.setItem('trials', JSON.stringify(trials));
        } catch (err) {
            console.error("Cannot update trial", err);
        }

    }

    window.renderClinicalTrials = renderClinicalTrials; // Expose renderClinicalTrials to global namespace

    trialServices.getTrials = () => {
        return getTrials();
    }
    return trialServices;
})();