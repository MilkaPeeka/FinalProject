import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useTheme} from '@mui/material/styles';
import { Box } from '@mui/system';

ChartJS.register(ArcElement, Tooltip, Legend);


// remove hardcoded values
// make colors as valid and invalid in the theme
// turn this component into a card

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
  const dangerColor = theme.palette.error.main; // Danger (error) color
  const successColor = theme.palette.success.main; // Success color

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
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var topLabel = `${Math.round(100 * props.valid / (props.valid + props.invalid))} %`;
      var topLabelX = Math.round((width - ctx.measureText(topLabel).width) / 2);
      var topLabelY = height * 0.45; // Adjust the height position for the top label
      
      ctx.fillText(topLabel, topLabelX, topLabelY);

      ctx.font = theme.typography.body1.fontSize +" " + theme.typography.fontFamily;
      var bottomLabel = `${props.valid} כשירים`;
      var bottomLabelX = Math.round((width - ctx.measureText(bottomLabel).width) / 2);
      var bottomLabelY = height * 0.57; // Adjust the height position for the bottom label
      ctx.fillText(bottomLabel, bottomLabelX, bottomLabelY);

      ctx.font = theme.typography.body2.fontSize +" " + theme.typography.fontFamily;
      var bottomLabel = `מתוך ${props.valid + props.invalid}`;
      var bottomLabelX = Math.round((width - ctx.measureText(bottomLabel).width) / 2);
      var bottomLabelY = height * 0.63; // Adjust the height position for the bottom label
      ctx.fillText(bottomLabel, bottomLabelX, bottomLabelY);

      ctx.save();
    } 
  }];

  // const options = {
  //   plugins: {
  //     legend: {
  //       display: false, // Hide the legend
  //     },
  //     tooltip: {
  //       enabled: false, // Hide the tooltip
  //     },
  //   },
  // };
  
  return (
    <Box 
    position={"relative"}
    sx={{
      width: props.width,
      height: props.height
    }}>
<Box width={"99%"}>
<Doughnut data={data} plugins={plugins}/>
</Box>
    </Box>
    );
}


export default RakamDoughnut;