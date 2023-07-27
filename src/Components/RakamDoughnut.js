import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useTheme} from '@mui/material/styles';
import { Box } from '@mui/system';
import SiteContext from '../Store/context';
import { useContext } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);


// remove hardcoded values
// make colors as valid and invalid in the theme
// turn this component into a card
// respect dark mode

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

const RakamDoughnut = (props)=> {
  const theme = useTheme();
  const ctx = useContext(SiteContext);
  let dangerColor = theme.palette.error.main; // Danger (error) color
  let successColor = theme.palette.success.main; // Success color
  let textColor = theme.palette.text.primary;
  useEffect(() => {
      dangerColor = theme.palette.error.main; 
      successColor = theme.palette.success.main; 
      textColor = theme.palette.text.primary;
      console.log(textColor);
  }, [ctx.isInDarkMode]);

  const labels = ["תקין", "לא תקין"];
  const values = [props.valid, props.invalid];
  const backgroundColor = [hexToRGB(successColor, 0.5), hexToRGB(dangerColor, 0.5)];
  const borderColor = [successColor, dangerColor];

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

  const plugins = [{
    beforeDraw: function(chart) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
        
      ctx.restore();
      // var fontSize = (height / 160).toFixed(2);
      // ctx.font = fontSize +" rem " + theme.typography.fontFamily;
      ctx.font = (height / 180).toFixed(2) + "em" + theme.typography.fontFamily;
      ctx.fillStyle = textColor;
      ctx.textBaseline = "top";
      var topLabel = `%${Math.round(100 * props.valid / (props.valid + props.invalid))}`;
      var topLabelX = Math.round((width - ctx.measureText(topLabel).width) / 2);
      var topLabelY = height * 0.42; // Adjust the height position for the top label
      
      ctx.fillText(topLabel, topLabelX, topLabelY);

      ctx.font = (height / 240).toFixed(2) +"em" + theme.typography.fontFamily;
      ctx.fillStyle = textColor;
      var bottomLabel = `${props.valid} כשירים`;
      var bottomLabelX = Math.round((width - ctx.measureText(bottomLabel).width) / 2);
      var bottomLabelY = height * 0.56; // Adjust the height position for the bottom label
      ctx.fillText(bottomLabel, bottomLabelX, bottomLabelY);

      ctx.font = (height / 300).toFixed(2) +"em" + theme.typography.fontFamily;
      var bottomLabel = `מתוך ${props.valid + props.invalid}`;
      var bottomLabelX = Math.round((width - ctx.measureText(bottomLabel).width) / 2);
      var bottomLabelY = height * 0.62; // Adjust the height position for the bottom label
      ctx.fillText(bottomLabel, bottomLabelX, bottomLabelY);

      ctx.save();
    } 
  }];


  return (
    <Box
    position={"relative"}
    sx={{
      width: props.width,
      height: props.height
    }}>
      <Doughnut data={data} plugins={plugins}/>
    </Box>
    );
}


export default RakamDoughnut;