import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

/*
© Authors:
Antti Heimonen
Maria Kangas
Konsta Kalliokoski
Vilma Patama
*/
/*
Slider.js tekee valitsimen, jolla voi valita kuukaudet joista dataa käytetään
*/

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider(props) {

  //Labelit slideriin
  const marks = [
    {
      value: 4,
      label: 'Tammi'
    },
    {
      value: 12,
      label: 'Maalis'
    },
    {
      value: 20,
      label: 'Touko'
    },
    {
      value: 28,
      label: 'Heinä'
    },
    {
      value: 36,
      label: 'Elo'
    },
    {
      value: 44,
      label: 'Loka'
    }
  ];

  const tyyli = {
    width: 300,
    margin: '1em',
    textAlign: 'center'
  }
  
  const classes = useStyles();

  if (props.max > 49) {
    marks.push({
      value: 50,
      label: 'Joulu'
    })
  }

  return (
    <div className={classes.root} style={tyyli}>
      <Typography id="range-slider" gutterBottom>
        Haettavat viikot koronatilastoille
      </Typography>
      <Slider
        value={props.value}
        onChange={props.handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={5}
        max={props.max}
        marks={marks}
      />
    </div>
  );
}