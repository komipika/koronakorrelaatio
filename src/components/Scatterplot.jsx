import React from "react"
import { scaleLinear, max, axisLeft, axisBottom, select } from "d3"

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Scatterplot.jsx luo hajontagraafin datan perusteella
*/

export default class ScatterPlot extends React.Component {

  render() {
    const margin = { top: 20, right: 15, bottom: 60, left: 60 }
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const data = this.props.data

    const x = scaleLinear()
      .domain([
        0,
        max(data, function(d) {
          return d[0]
        })
      ])
      .range([0, width])

    const y = scaleLinear()
      .domain([
        0,
        max(data, function(d) {
          return d[1]
        })
      ])
      .range([height, 0])

    return (
      <div className="graafi">
        <svg
          width={width + margin.right + margin.left}
          height={height + margin.top + margin.bottom}
          className="chart"
        >
          <g
            transform={"translate(" + margin.left + "," + margin.top + ")"}
            width={width}
            height={height}
            className="main"
          >
            <DrawCircles data={data} scale={{ x, y }} />
            <Axis
              axis="x"
              transform={"translate(0," + height + ")"}
              scale={axisBottom().scale(x)}
            />
            <Axis
              axis="y"
              transform="translate(0,0)"
              scale={axisLeft().scale(y)}
              
            />
          </g>
          <text class="x-label" textAnchor="end" x={width} y={height+50}> G-Trends -data </text>
          <text class="y-label" textAnchor="end" y={6} dy=".75em" transform="rotate(-90)"> Koronaesiintymät kunnittain</text>
          
        </svg>
      </div>
    )
  }
}

class DrawCircles extends React.Component {
  render() {
    let DrawCircles = this.props.data.map((xy, i) => (
      <circle
        cx={this.props.scale.x(xy[0])}
        cy={this.props.scale.y(xy[1])}
        r="6"
        style={{ fill: "#67B9CD" }}
        key={i}
      />
    ))
    return <g>{DrawCircles}</g>
  }
}

class Axis extends React.Component {
  componentDidMount() {
    const node = this.refs[this.props.axis]
    select(node).call(this.props.scale)
  }

  render() {
    return (
      <g
        className="main axis date"
        transform={this.props.transform}
        ref={this.props.axis}
      />
    )
  }
}