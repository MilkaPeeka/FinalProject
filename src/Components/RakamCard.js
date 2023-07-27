import RakamDoughnut from "./RakamDoughnut";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
const RakamCard = (props) => {
    
    return (
        <Box>
            <Typography>{props.makat}</Typography>
            <RakamDoughnut width={200} height={200} {...props}/>
        </Box>
    );
};


export default RakamCard;