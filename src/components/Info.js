import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Info.js luo info-palkin kartalle, joka näyttää kunnan nimen oikeassa yläkulmassa
Kun kunta muuttuu niin poistaa vanhan palkin ja piirtää uuden uudella nimellä
*/

const legend = L.control({ position: "topright" });

class Info extends MapControl {

  constructor(props){
    super(props)
    this.state = {
			kunta: props.kunta
    }
  }


  createLeafletElement (props) {}

  componentDidUpdate () {
    if(this.props.kunta !== this.state.kunta){
      //console.log(this.props.kunta)
      this.setState({kunta: this.props.kunta})
      legend.remove()
      const { map } = this.props.leaflet;
      legend.addTo(map)
    }
  }

  componentDidMount () {
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info kunta");

      div.innerHTML = this.props.kunta;
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Info);