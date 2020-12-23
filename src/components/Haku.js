import React from 'react'
import '../App'
import '../App.css'
import TextField from '@material-ui/core/TextField';

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Haku.js on yksinkertainen hakupalkki, jota app.js kontrolloi
*/

const Haku = ({value, handleChange, handleKeyPress, hakemassa}) => {

  return (
    <div className = "Haku">
      <TextField 
      id           = "outlined-basic" 
      label        = "Kirjoita hakusana" 
      variant      = "outlined"
      className    = "Hakukentta"
      size         = "small"
      value        = {value} 
      onChange     = {handleChange}
      type         = "text"
      onKeyUp      = {handleKeyPress}
      disabled     = {hakemassa}
      autoFocus    = {true} />
      </div>
  )
}

export default Haku