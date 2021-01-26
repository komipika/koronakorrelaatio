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
Legend.js piirtää kartan oikeaan alakulmaan palkin joka kertoo mitä mikäkin väri kartalla merkitsee
*/

class Legend extends MapControl {

  createLeafletElement (props) {}

  componentDidMount () {
    // Asettaa värin d:n perusteella
    const getColor = d => {
      return d > 1000 ?  '#800026':
      d > 300  ?  '#BD0026':
      d > 150  ?  '#E31A1C':
      d > 75   ?  '#FC4E2A':
      d > 25   ?  '#FD8D3C':
      d > 10   ?  '#FEB24C':
      d > 4    ?  '#FED976':
                  '#dcf1f2';
    }  

    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = [0, 4, 10, 25, 75, 150, 300, 1000];
      let labels = [];
      let from;
      let to;

      for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' +
            getColor(from + 1) +
            '"></i> ' +
            from +
            (to ? '&ndash;' + to : '+')
        );
      }
      

      div.innerHTML = labels.join('<br>');
      return div;
    };

    const { map } = this.props.leaflet;
    legend.addTo(map);
  }
}

export default withLeaflet(Legend);