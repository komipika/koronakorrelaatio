import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Navbar.js luo navigointipalkin sivuston yläreunaan.
Sisältää info-nappulan, joka avaa modaalin, jossa on tietoa sivuston toiminnasta 
*/

function Alert() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
      <div>
          <Navbar className="Navbar" bg="primary" variant="light">
          <Navbar.Brand>Koronakorrelaatio</Navbar.Brand>
        <Nav>
          <Button 
          className="nappi" 
          variant="primary"
          onClick={handleShow}
          >Info
          </Button>
        </Nav>
        </Navbar>

        <Modal
        className="alert"
        show={show} 
        onHide={handleClose} 
        animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Tervetuloa käyttämään Koronakorrelaatio-sovellusta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <p>
          Koronakorrelaatiosta voit hakea tietoa Suomen eri kuntien koronatilanteesta. 
          <br/>
          Voit myös tutkia miten koronatilanne korreloi google.trends palveluun syötettyjen hakusanojen kanssa. 
          <br/>
          <br/>
          <br/>
          <b>Kartan käyttö:</b> Kartan kuntia klikkaamalla tiedot kunnasta ilmestyvät viereisen laatikkoon. Karttaa voi myös liikuttaa ja zoomata. Jos et löydä haluamaasi kuntaa voit käyttää viereistä dropdown-valikkoa valitaksesi kunnan, josta haluat tietoa.
          <br/>
          <br/>
          <b>Korrelaatiohaku:</b> Kirjoittamalla hakukenttään hakusanan ja painamalla enteriä sovellus hakee ja laskee trends- ja koronadatan välisen korrelaation Pearsonin korrelaatiokertoimen kaavalla. Haku toimii vain yhden hakusanan kanssa, joten vältä välilyöntien käyttämistä.

          </p>
           </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Sulje
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
  }

export default Alert