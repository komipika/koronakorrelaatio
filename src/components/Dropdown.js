import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import kuntaData from '../data/avain.json'
import 'semantic-ui-css/semantic.min.css'
import '../App.css'

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Dropdown.js on valitsin, jonka avulla voi etsiä ja valita kunnan
*/

const DropdownSearch = ({valittuKunta, onChange}) => {
  // Alustetaan käytettävä array
  const kuntaValinnat = []
  
  // Luodaan silmukassa kuntaDatan pohjalta objekti jokaiselle kunnalle ja asetetaan se kuntaValinnat arrayn sisään
  for(let i = 0; i < kuntaData.kunnat.length; i++){
      const kuntaNimi = kuntaData.kunnat[i].nimi;
      const kuntaKoodi = kuntaData.kunnat[i].koodi;
      const iKunta = {key: kuntaKoodi, text: kuntaNimi, value: kuntaNimi}
      kuntaValinnat.push(iKunta);
  }
  kuntaValinnat.sort(function(a, b) {
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });
  
  // Tehdään dropdown
  return(
    <div className= 'dropdown'>
    <Dropdown
      button
      className='icon'
      floating
      labeled
      icon='write'
      options={kuntaValinnat}
      search
      onChange={onChange}
      // Asetetaan dropdownin tekstiksi kunnan nimi jota klikataan, kun kunta on undefined niin default teksti
      text={valittuKunta === '' ? 'Valitse kunta' : '' + valittuKunta}
    />
    </div>
  )
}

export default DropdownSearch
