import { useContext, useState, useEffect, useMemo } from "react";
import SiteContext from "../Store/context";

import Graph from './Graph'
import RakamCardGroup from "./RakamCardGroup";
import { Typography } from "@mui/material";

const Dashboard = () => {
    const ctx = useContext(SiteContext);
    const [rakamList, setRakamList] = useState([]);
    useEffect(() => {
      if (ctx.userData.gdud === '')
        return;
      fetch(`/api/rakams/get_by_gdud/`, {
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
    

  // a const that holds the value of {valid, invalid, makat} for all the rakams in a gdud
  const groupedRakamsList =  useMemo(() => {
    return Object.entries(groupedByMakat).map(([makat, { valid, invalid, rakams }]) => {
    return { makat, valid, invalid, rakams };
    })}, [rakamList]);

    const values = [];

    groupedRakamsList.forEach(item => {
      values.push({
        label: item.makat,
        value: Math.round(100 * item.valid / (item.valid + item.invalid))
      });
    });

    return (
      <>
        <Typography textAlign="center" variant="h4">מצב הרקמים בגדוד {ctx.userData.gdud}</Typography>
         <Graph items={values}/>
         <RakamCardGroup rakamList = {rakamList}/>
      </>
    );
    
};

export default Dashboard;