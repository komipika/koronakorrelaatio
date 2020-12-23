import React from "react"
import ScatterPlot from "./Scatterplot"

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
LinearGraph.js piirtää scatterplot komponentin jos se saa dataa
*/

export default class LinearGraph extends React.Component {
  render() {
    if(this.props.data[0] !== undefined && this.props.uskottavuus !== 0)
      return <ScatterPlot data={this.props.data} />;
    else return (null)
  }
}