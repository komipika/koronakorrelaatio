import axios from 'axios'

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
gtrends.js kysyy backend-palvelimelta gtrends dataa
*/

var _               = require('lodash');
// Pohjassa kaikilla kunnilla on valmiina arvo 0
let gtrendsDataPohja = require('./../data/gtrends-avain.json')
const palvelin = `/gtrends`

// Hakee hakusanan trendin Suomen kunnista annetulta ajanväliltä.
// Päivämäärät ovat muotoa vuosi-kk-pp, esim. 2020-5-21  
// Palauttaa datan muodossa:
// {
//   "area005": "88",
//   "area007": "100",
//   ...
// }
//
// Jos hakuprosessi päättyy virheeseen, niin palauttaa null
const getData = async (hakusana, alkupvm, loppupvm) => {
  console.log(`Gtrends haku: hakusana ${hakusana}, alkupvm ${alkupvm}, loppupvm ${loppupvm}`);
  let hakuUrl =  `${palvelin}?hakusana=${hakusana}&alkupvm=${alkupvm}&loppupvm=${loppupvm}`
  // console.log(hakuUrl);

  let timerStart = Date.now();
  return await axios.get(hakuUrl).then(response => { 
    let timerStop = Date.now();
    let duration = timerStop - timerStart;
    console.log(`Gtrends haku: Vastauksen status ${response.status}, kesto ${duration} ms`);
    let gtrendsData = _.cloneDeep(gtrendsDataPohja)
    Object.assign(gtrendsData, response.data)
    return gtrendsData
  }).catch(error => {
    console.log(`Virhe Gtrends datan hakemisessa!`);
    console.log(error);
    return null
  })
}

export default { getData }