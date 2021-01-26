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
Laatikkokorrelaatio.js esittää korrelaatiodataa tekstimuodossa.
Jos korrelaatiodataa ei ole, ei mitään renderöidä.
*/

class LaatikkoKorrelaatio extends Component {
  render() {
    //Jos korrelaatiota ei ole laskettu tämä renderöidään, muuten else
    if(this.props.korrelaatio.teksti === '')
    return (
      (null)
    ); else
    return (
      <div className='laatikkoDiv'>
      <Container className='Laatikko'>
        <p className='laatikkoP'>
        <b>Haettu hakusana:</b>              {this.props.sana === '' ? 'Ei hakua' :this.props.sana} <br/>
        <b>Pearsonin korrelaatiokerroin:</b> {('' + this.props.korrelaatio.data).slice(0,6)} <br/>
        <b>Korrelaatio:</b>                  {this.props.korrelaatio.teksti} <br/>
        Datassa oli                          <b> {this.props.korrelaatio.uskottavuus} </b>  {this.props.korrelaatio.uskottavuus === 1 ? ' merkitsevä datapiste, joten': ' merkitsevää datapistettä, joten'}  <br/>  
        <b> {this.props.korrelaatio.uskottavuus < 10 ? 'se ei todennäköisesti ole merkitsevä tulos' : this.props.korrelaatio.uskottavuus < 25 ? 'se saattaa olla merkitsevä tulos ' : this.props.korrelaatio.uskottavuus < 50 ? 'se on mahdollisesti merkitsevä tulos': 'se on todennäköisesti merkitsevä tulos'} </b>
        </p>
        </Container>
        </div>
    ) 
  }
}

export default LaatikkoKorrelaatio