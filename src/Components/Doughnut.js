import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import style from './Dougnut.module.css'

ChartJS.register(ArcElement, Tooltip, Legend);

function hexToRGB(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const CustomDoughnut = (props)=> {

  const labels = [];
  const values = [];
  const backgroundColor = [];
  const borderColor = [];

  props.items.forEach((item) => {
    labels.push(item.label);
    values.push(item.value);
    backgroundColor.push(hexToRGB(item.color, 0.5));
    borderColor.push(hexToRGB(item.color, 1));
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColor,
        borderColor: borderColor
      }
    ]
  };


  /*
  props.graphInfo = {
    items = [
      {color: #????,
      value: 123,
      label: takul}
      ,
      {color: #!!!!,
      value: 12
      label: takin}
    ]
  }
  */


  return (
    <div className={style.dougnut}>
      <Doughnut data={data}/>
    </div>
    );
}


export default CustomDoughnut;