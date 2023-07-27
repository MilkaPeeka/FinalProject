import style from './Graph.module.css'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const matchColorToPrecentage = (percentage, a = 1) => {
    percentage = 100 - percentage;
    // Ensure the percentage is within the range [0, 100]
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));

    // Calculate the hue value based on the percentage (red for lower percentages, green for higher percentages)
    const hue = (1 - normalizedPercentage / 100) * 120; // 0 for green, 120 for red
  
    // Set the saturation and lightness to a constant value for pastel colors
    const saturation = 50; // 0-100, 0 being completely desaturated, 100 being fully saturated
    const lightness = 50; // 0-100, 0 being completely dark, 100 being fully light
  
    // Convert HSL values to RGB values
    const hslToRgb = (h, s, l) => {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };
  
    const [r, g, b] = hslToRgb(hue, saturation, lightness);
  
    return `rgba(${r},${g},${b}, ${a})`;
  };
  
const CustomGraph = (props) => {
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'טנקים לא תקולים',
          },
        },
      };


    const labels = [];
    const values = [];
    const backgroundColor = [];
    const borderColor = [];

    props.items.forEach((item) => {
        labels.push(item.label);
        values.push(item.value);
        backgroundColor.push(matchColorToPrecentage(+item.value, 0.5))
        borderColor.push(matchColorToPrecentage(+item.value, 1))
    });
                
    const data = {
        labels,
        datasets: [
        {
          data: values,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        },
        ],
    };
    
  
    return (
        <div>
            <Bar options={options} data={data} className={style.graph}/>
        </div>
    );
}


export default CustomGraph;