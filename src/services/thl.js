import axios from 'axios'

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
gtrends.js kysyy backend-palvelimelta thl dataa
*/

// Package.json tiedostossa mainitun proxyn ansiosta backendin 
// osoitetta ei tarvitse kokonaan
const thlDataUrl = '/thl/thldata'

const getData = async () => {
  const vastaus = await axios.get(thlDataUrl)
  //console.log(vastaus.data)
  return (vastaus.data)
}


const getDataEiAsync = () => {
  const vastaus = axios.get(thlDataUrl)
  //console.log(vastaus.data)
  return (vastaus.data)
}

export default { getData, getDataEiAsync }