import RakamDoughnut from "./RakamDoughnut";
import {Typography } from "@mui/material";
import { Box } from "@mui/system";
const RakamCard = (props) => {

    return (
        <Box sx={{
            borderRadius: 5,
            boxShadow: 3,
            margin: 3,
            paddingY: 1.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "normal"
            // maxHeight: '236px'
        }}>
            <Typography fontWeight="bold" textAlign="center">{props.makat}</Typography>
            <RakamDoughnut width={200} height={200} {...props}/>
        </Box>
    );
};


export default RakamCard;