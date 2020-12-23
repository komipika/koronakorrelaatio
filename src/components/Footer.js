import React from 'react';

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Footer.js sisältää tiedon sivun tekijöistä
*/

let email = {
  vilma: "vilma.e.patama@student.jyu.fi",
  antti: "antti.j.t.heimonen@student.jyu.fi",
  maria: "maria.e.kangas@student.jyu.fi",
  konsta: "naktos.kalliokoski@gmail.com"
}


const Footer = () => (
  <div className='footer'>
    <p className="laatikkoP">&copy;   <a href={"mailto:" + email.antti}>Antti Heimonen</a>,  <a href={"mailto:" + email.maria}>Maria Kangas</a>,  <a href={"mailto:" + email.konsta}>Konsta Kalliokoski</a> ja  <a href={"mailto:" + email.vilma}>Vilma Patama</a></p>
    
  </div>
)

export default Footer