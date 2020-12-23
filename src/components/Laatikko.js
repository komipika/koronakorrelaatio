import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import '../App.css'

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Laatikko.js esittää kunnan tietoja tekstimuodossa. 
Tarkoitus on, että kunnan voi valita muualla ja laatikko reagoi valintaa.
*/

class Laatikko extends Component {
  render() {
    return (
      <div className="laatikkoDiv">
      <Container className="Laatikko">
        <p className="laatikkoP">
          <b>Kunta:</b>            {this.props.koronaLaatikko.nimi   === "" ? "Klikkaa kuntaa nähdäksesi tiedot" :this.props.koronaLaatikko.nimi} <br/>
          <b>Trends-arvo:</b>      {this.props.koronaLaatikko.trends === "" ? "Tee haku nähdäksesi trends-arvot" :this.props.koronaLaatikko.trends} <br/>
          <b>Koronatartuntoja:</b> {this.props.koronaLaatikko.korona === "" ? "Klikkaa kuntaa nähdäksesi tiedot" :this.props.koronaLaatikko.korona} <br/>
          <b>Korontartuntoja yhteensä Suomessa: </b> {this.props.kaikki} <br/>
          Summassa ei ole huomioitu kuntia, joissa on ollut alle viisi koronatartuntaa laskettavalla viikolla.
        </p>
      </Container>
      </div>
    ) 
  }
}

export default Laatikko