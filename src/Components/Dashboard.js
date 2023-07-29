import { useContext, useState, useEffect, useMemo } from "react";
import SiteContext from "../Store/context";
import RakamCard from "./RakamCard";
import { Box, FormControl, TextField, Typography} from "@mui/material";

const Dashboard = () => {
    const ctx = useContext(SiteContext);
    const [rakamList, setRakamList] = useState([]);
    const [rakamQuery, setRakamQuery] = useState('');
    useEffect(() => {
      if (ctx.userData.gdud === '')
        return;
      fetch(`/api/rakams/get_by_gdud/${ctx.userData.gdud}/`, {
            method: 'GET',
            credentials: 'include'})
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
        })
        .then((data) => {
              // Process the response data
              if (data.error){
                throw new Error(data.error_message);
              }
              setRakamList(data.results);
        })
        .catch((err) => console.log(err));
    
    }, [ctx.userData.gdud]);

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
      
    const groupedRakamsList =  useMemo(() => {
      return Object.entries(groupedByMakat).map(([makat, { valid, invalid, rakams }]) => {
      return { makat, valid, invalid, rakams };
      })}, [rakamList]);

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
            height: 800,
            overflowY: 'scroll',
            overflowX: 'hidden',
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
            <Box sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: "wrap",
                          justifyContent: "center"}}>
              {toShow.map(item => <RakamCard  {...item} key={item.makat}/>)}
            </Box>
      </Box>
    );
};

export default Dashboard;