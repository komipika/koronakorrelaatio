const googleTrends = require('google-trends-api');

/* //Hakee kahdenviikon takaiset suosituimmat haut.
googleTrends.dailyTrends({
    trendDate: new Date(Date.now()-(14*24*60*60*1000)),
    geo: 'FI',
}) 
    .then(function(res) {
        var receivedData = res.toString();
        receivedData = JSON.parse(receivedData);
        console.log(receivedData);
    })
    .catch((err) => {
        console.log(err);
});
*/

function Api(hakusana) {
    console.log(hakusana);
    googleTrends.interestByRegion({
        keyword: hakusana,
        trendDate: new Date(Date.now()-(14*24*60*60*1000)),
        //startTime: new Date('2020-08-08'), 
        //endTime: new Date('2020-08-09'),
        geo: 'FI',
        resolution: 'city'
    })
    .then(function(res) {
        var receivedData = res.toString();
        receivedData = JSON.parse(receivedData);
        console.log(receivedData);
    })
    .catch((err) => {
        console.log(err);
    });
}

export default Api;