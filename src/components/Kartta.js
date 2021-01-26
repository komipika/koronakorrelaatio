import React, {Component} from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import L from 'leaflet'
import Legend from "./Legend";
import Info from "./Info";

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Kartta.js piirtää kartan ja asettaa sille geojson layerin, johon on liitetty korona- ja gtrendsdata
Kartta piirtää myös legend- ja info-palkit kaiken päälle. Pohjimmaiseksi piirretään openstreetmapin kartan 
*/

let kuntaRajat 		= require ('../data/kuntarajat-ok.json')

const position = [65.505, 27] //Kartan alustava keskipiste
let f = 1 //käyttämätön ominaisuus



//Palauttaa tyylin geojsonia varten
function style (feature) {
	//f:llä voi ohjata mitä propseja kartta käyttää väritykseen, ei käytössä
	let color = f === 1 ? feature.properties.korona: 
							f === 2 ? feature.properties.haku:
							feature.properties.korona * (feature.properties.haku / 100)

	return {
		weight:        1,
		opacity:       5,
		color: '#1e1f1f',
		dashArray:    '',
		fillOpacity: 0.7,
		fillColor: getColor(color)
	};
}

//Palauttaa tietyn värin d:n arvon perusteella
function getColor (d) {
	return  d > 1000 ?  '#800026':
					d > 300  ?  '#BD0026':
					d > 150  ?  '#E31A1C':
					d > 75   ?  '#FC4E2A':
					d > 25   ?  '#FD8D3C':
					d > 10   ?  '#FEB24C':
					d > 4    ?  '#FED976':
											'#dcf1f2';
}
 
class Kartta extends Component {
  constructor(props){
    super(props)
    this.state = {
			highlight: "Laita hiiri kunnan päälle nähdäksesi sen nimen"
		}
		this.highlightFeature = this.highlightFeature.bind(this);
		this.resetHighlight = this.resetHighlight.bind(this);
		this.onEachFeature = this.onEachFeature.bind(this);
		this.clickFeature = this.clickFeature.bind(this);
	}
	
	//Asettaa nämä ominaisuudet jokaisella layerille
	onEachFeature (feature, layer){
		layer.on({
			mouseover: this.highlightFeature,
			mouseout:  this.resetHighlight,
			click:     this.clickFeature
		});
		// const popupContent = ReactDOMServer.renderToString(
		// 	<Popup feature={feature} />
		// );
		//layer.bindPopup(popupContent);
	}

	//klikkauksen käsittelijä, muuttaa laatikkoa appin kautta
	clickFeature (e) {
		var layer = e.target
		//console.log (layer.feature.properties)
		this.props.handleChange(layer.feature.properties.code)
	}	

	//Korostaa tietyn layerin highlight -tyylillä
	highlightFeature (e) {

		var layer = e.target;
		//console.log(layer.feature.properties.name)
		this.setState({highlight:layer.feature.properties.name})
		//console.log(this.state)
		layer.setStyle({
			weight:         4,
			color:     '#666',
			dashArray:     '',
			fillOpacity:  0.7
		});
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
	}

	//Poistaa highlight -tyylin layeristä
	resetHighlight (e) {
		var layer = e.target;
		layer.setStyle({
			weight:        1,
			opacity:       5,
			color: '#1e1f1f',
			dashArray:    '',
			fillOpacity: 0.7,
		});
	}

  render() {
		//Käydään läpi koronadata ja hakudata ja liitetään se karttaan
		for (const feature of kuntaRajat.features){
			let id = feature.properties.code
			this.props.koronaData[id]['data'] === undefined ? feature.properties.korona = 0 : feature.properties.korona = this.props.koronaData[id]['data']
			
      if(this.props.hakuData[id]['data'] !== undefined){
				feature.properties.haku = this.props.hakuData[id]['data']
      }	
		}

    return (
      <Map center={position} zoom={5}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors | Korona-data &copy; <a href=&quot;https://thl.fi/fi/tilastot-ja-data/aineistot-ja-palvelut/avoin-data/varmistetut-koronatapaukset-suomessa-covid-19-&quot;>THL</a>'
        />
        <Legend />
				<Info 
					kunta 				= {this.state.highlight}
				/>
        <GeoJSON 
          data          = {kuntaRajat}				
          style         = {style}
          onEachFeature = {this.onEachFeature}
        />	
      </Map>
    )
  }
}

export default Kartta
