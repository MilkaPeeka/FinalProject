import { useState, useMemo } from "react";
import RakamCard from "./RakamCard";
import { Box, FormControl, List, Paper, TextField, Typography} from "@mui/material";

const RakamCardGroup = (props) => {
    const {rakamList} = props;
    const [rakamQuery, setRakamQuery] = useState('');
    // a function that groups rakamlist by its makat
    const groupedByMakat = rakamList.reduce((result, rakam) => {
        const { makat, ...rest } = rakam;
        if (!result[makat]) {
          result[makat] = { valid: 0, invalid: 0, rakams: [] };
        }
      
        if (rakam.kshirot) {
          result[makat].valid++;
        } else {
          result[makat].invalid++;
        }
      
        result[makat].rakams.push(rest);
        return result;
      }, {});
      

    // a const that holds the value of {valid, invalid, makat} for all the rakams in a gdud
    const groupedRakamsList =  useMemo(() => {
      return Object.entries(groupedByMakat).map(([makat, { valid, invalid, rakams }]) => {
      return { makat, valid, invalid, rakams };
      })}, [rakamList]);

    
      if (rakamList.length === 0)
        return <h1>טוען רשימת רקמים...</h1>;


    const handleChange = (event) => {
      setRakamQuery(event.target.value);
    };


    let toShow;
    if (rakamQuery !== '')
      toShow = groupedRakamsList.filter(item => item.makat.startsWith(rakamQuery));
    else
      toShow = groupedRakamsList;
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: "hidden",
            alignItems: 'center',
        }}>
        <Box sx={{display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 1,
                      mt: 3,
                      bgcolor: 'error.main',
                      width:'100%',
                      borderTop: 1,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16
                      }}>
        <Typography variant="h5">חיפוש כלי בגדוד:</Typography>
        <FormControl width={300} sx={{
          m: 2
        }}>
        <TextField
          type="search"
          label="חיפוש לפי מקט"
          variant="standard"
          onChange={handleChange} // Add the onChange event here
        />        
        </FormControl>
          </Box>
            <List sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: "wrap",
                          justifyContent: "center",
                          maxHeight: 800,
                          overflowY: 'scroll',
                          overflowX: 'hidden',
                          width:'100%'}}>
              {toShow.map(item => <RakamCard  {...item} key={item.makat}/>)}
            </List>
      </Box>
    );
}

export default RakamCardGroup;