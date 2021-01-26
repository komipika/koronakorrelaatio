import React, { useState, useEffect, } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Navigointi from './components/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Footer from './components/Footer'
import Haku from './components/Haku'
import Kartta from './components/Kartta'
import Laatikko from './components/Laatikko'
import ThlService from './services/thl'
import GTrendsService from './services/gtrends'
import laskekorrelaatio from './components/korrelaatiolaskin'
import RangeSlider from './components/Slider'
import Dropdown from './components/Dropdown'
import LinearGraph from './components/LinearGraph'
import LaatikkoKorrelaatio from './components/LaatikkoKorrelaatio';

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
App.js on sivuston pääkomponentti, joka renderöi muut komponentit ja hoitaa datan kulun komponentista toiselle
Kutsuu services komponentteja ja hakee niiden avulla datan sovelluksen käyttöön
*/

var _               = require('lodash');
let avain           = require('./data/avain.json')
let avain1          = require('./data/area-avain.json')
let gtrendsavain    = require('./data/gtrends-avain.json')
let kuntaAvain      = require('./data/kuntakoodit.json')
let hakuData        = _.cloneDeep(avain)
    hakuData.haettu = 0
let trendsData       = _.cloneDeep(gtrendsavain)
// let koronaData      = _.cloneDeep(avain)
let hakualku        = "2020-01-28"
let hakuloppu       = "2020-01-28"

//palauttaa viikon ensimmäisen päivän muodossa vuosi-kuukausi-päivä
function haepaiva(viikko){
  let vuosi = 2020
  let ekaPaiva = new Date(2020, 0, 1).getDay();
  let paiva    = new Date("Jan 01, " + vuosi + " 01:00:00")
  let d        = new Date( paiva.getTime() - (3600000 * 24 * (ekaPaiva - 1)) + 604800000 * (viikko - 1))
  
  let p        = d.getDate()
  let k        = d.getMonth() + 1
  k            = ('0' + k).slice(-2)
  let v        = d.getFullYear()
  return "" + v + "-" + k + "-" + p
}

var today = new Date('December 30, 2020 01:00:00')
  //Hakee päivän perusteella kuluvan viikon
today.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7)
  };
var max = today.getWeek() + 1
if(max>53)max = 53


function App() {
  const [hakusana, setHakusana]
    = useState('')
  const [asetettuHakusana = "", setAsetettuHakusana] 
    = useState('')
  // ThlData sisältää backendiltä saadun datan. Tätä ei saa muuttaa
  const [thlData, setThlData]                        
    = useState(null)

  const [koronaData, setKoronaData]                        
    = useState(null)

  const [laatikkoKorona, setLaatikkoKorona]          
    = useState({ 
      id: 		 "area005",
      trends:  "",
      korona:  "",
      nimi:    ""
    }
  )
  const [laatikkoKorrelaatio, setLaatikkoKorrelaatio] 
    = useState({
      teksti: "",
      data:    0,
      uskottavuus: 0,
    }
  )
  const [scatterPlotData, setscatterPlotData]
    = useState([])
  const [valittuDropDown, setValittuDropDown] 
    = useState('')
  const [sliderValue, setSliderValue]                 
    = useState([5, max])
  const [kartanFiltteri, setKartanFiltteri]
    = useState(1)
  const [kaikkiTapaukset, setKaikkiTapaukset]
    = useState(0)
  const [kunta, setKunta] = useState(null)

  const [gtrendsHakemassa, setGtrendsHakemassa] = useState(false)
  

  // Effect pyytää THL-datan backendiltä sivun auettua ja asettaa
  // sen thlData-tilaan. thlData on null, kunnes oikea data asetetaan.
  useEffect(() => {
    async function initThlData() {
      const thl = await ThlService.getData()
      setThlData(thl)
      //console.log(thl)
    }
    initThlData()
  }, [])


  const naytettavanDatanMuutos = () => {
    if(thlData === null )
      return

    let rajattuData = _.cloneDeep(avain1)

    let [ylä,  ala] = sliderValue
    if  (ylä < ala){
        [ala,  ylä] = sliderValue
    }  

    let kArvo = 0;

    for (const kunta in rajattuData){
        //alustetaan kaikkien kuntien koronadatksi 0
        rajattuData[kunta].data = 0 
        let id = "" + kunta

        //Lisätään 0:aan thldatan arvoja
        for (let i = ala; i <= ylä; i++){
            let viikko = "" + ('0' + i).slice(-2)
            if(thlData["2020"][viikko][id] !== undefined){
              let arvo = parseInt(thlData["2020"][viikko][id])
              if(!isNaN(arvo))
                rajattuData[kunta]["data"] += arvo
            }
        }
        kArvo += rajattuData[kunta].data
    }
    //console.log(kArvo)
    setKaikkiTapaukset(kArvo)

    setKoronaData(rajattuData)
  }


  // Funktio naytettavanDatanMuutos suoritetaan aina, kun thlData tai sliderValue muuttuu
  useEffect(naytettavanDatanMuutos, [thlData, sliderValue])


  //Handleri joka muuttaa laatikon arvoja. Suoritetaan, kun 
  const handleLaatikkoKoronaChange = () => {
    if (kunta === null)
      return

    let value = kunta
    var data;

    data = {
      id: value,
      trends: trendsData[value] !== undefined ? trendsData[value] : "Tee haku nähdäksesi trends-arvot",
      korona: koronaData !== null ? koronaData[value]["data"]: "jahas",
      nimi: koronaData !== null ? koronaData[value]["kunta"]: "jahas"
    }
    setLaatikkoKorona(data)
    setValittuDropDown(koronaData[value]["kunta"])
  }

  
  // Päivittää laatikon sisällön, kun koronadata tai kunta muuttuu
  useEffect(handleLaatikkoKoronaChange, [koronaData, kunta])


  //Asettaa dropdownille oikean kunnan ja välittää handlelaatikkokoronachangelle
  //Ilmon että valinta vaihtunut koodin kera
  function handleDropDownChange (e, vastaus) {
    setKunta(kuntaAvain[vastaus.value]["koodi"]);
  }


  // Tarkkailee hakusanaan tehtäviä muutoksia ja tallentaa ne valueen
  const handleHakusanaChange = (e) => {
    setHakusana(e.target.value);
  }

  //Handleri sliderille
  const handleSliderChange = (event, newValue) => {
    if(sliderValue === newValue)return
    let [ala, ylä] = newValue
    //tää pätkä estää slideria menemästä päällekkäin, jottei tapahdu kamalia
    if (ylä - ala !== 0 )setSliderValue([ala,ylä]);
  };

  // Hakee Google Trendsin tulokset annetulle hakusanalle
  const haeGtrendsTulokset = async () => {
    setGtrendsHakemassa(true)
    let [ala, ylä] = sliderValue
    hakualku = haepaiva(ala)
    hakuloppu = haepaiva(ylä)

    GTrendsService.getData(hakusana, hakualku, hakuloppu).then(gtData => {
      console.log(gtData)
      setGtrendsHakemassa(false)
      if (gtData === null){
        // Gtrends-datan hakeminen epäonnistui
        console.log(`Gtrends dataa ei voitu hakea!`);
        return;
      }
      let tulos = laskekorrelaatio(gtData, koronaData)
      trendsData = gtData
      //console.log(tulos)
      setscatterPlotData(tulos.scatterData)
      setKartanFiltteri(3)
      setLaatikkoKorrelaatio({
        teksti: tulos.teksti,
        data: tulos.pearson,
        uskottavuus: tulos.uskottavuus
      })
    })
  }

  // Kutsuu hae-funktiota jos ollaan painettu enteriä
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      setAsetettuHakusana(hakusana);
      // console.log(hakusana);
      console.log(asetettuHakusana);
      if(hakusana !== "")haeGtrendsTulokset();
    }
  }

  //Kartta piirretään vasta kun koronadata on alustettu
  const karttafunktio = () => {
    if(koronaData == null)
     return
    return (
      <Kartta 
        koronaData     = {koronaData} 
        hakuData       = {trendsData} 
        handleChange   = {(v) => setKunta(v) } 
        filtteri       = {kartanFiltteri} />
    )
  }


  //Jos thldata ei ole tullut perille niin ei renderöidä muuta kuin else
  if(thlData !== null)
    return (
      <div className="App">
        <Navigointi/>
      <div className="Flex">
        {karttafunktio()}
        <RangeSlider 
          value          = {sliderValue} 
          handleChange   = {handleSliderChange}
          max            = {max}/>
        <div className="hakuTiedot">
          <Container fluid>
            <Row>
              <Col xs={4} md={6}>
                <Dropdown
                  valittuKunta   = {valittuDropDown}
                  onChange       = {handleDropDownChange}
                />
              </Col>
              <Col  xs={5} md={3}>
                <Haku 
                value          = {hakusana} 
                handleChange   = {handleHakusanaChange} 
                handleKeyPress = {handleEnterPress}
                hakemassa      = {gtrendsHakemassa}/>
              </Col>
            </Row>
          </Container>
        </div>
        <Laatikko 
          koronaLaatikko = {laatikkoKorona}
          kaikki         = {kaikkiTapaukset}/>
          
        <LaatikkoKorrelaatio
          sana           = {asetettuHakusana} 
          korrelaatio    = {laatikkoKorrelaatio}/>
        
        <Footer />
        </div>
        <LinearGraph 
          data           = {scatterPlotData}
          uskottavuus    = {laatikkoKorrelaatio.uskottavuus}
        />
      </div>
    );
  else
    return (
      <div className="App">
        <p>Odota hetki kun sivu lataantuu</p>
      </div>
    );
}

export default App;
