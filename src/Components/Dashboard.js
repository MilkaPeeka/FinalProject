import { useContext, useState, useEffect } from "react";
import SiteContext from "../Store/context";
import RakamCard from "./RakamCard";
import { Box } from "@mui/system";


const Dashboard = () => {
    const ctx = useContext(SiteContext);
    const [rakamList, setRakamList] = useState([]);
    console.log(ctx.isInDarkMode);
    useEffect(() => {
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
    
    }, [ctx.userData.gdud])

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
      
      const groupedRakamsList = Object.entries(groupedByMakat).map(([makat, { valid, invalid, rakams }]) => {
        return { makat, valid, invalid, rakams };
      });
      
    return (
        <Box display={'flex'} sx={{
            flexDirection: 'row'
        }}>
        {groupedRakamsList.map(item => <RakamCard  {...item} key={item.makat}/>)}
        </Box>
    );
};

export default Dashboard;