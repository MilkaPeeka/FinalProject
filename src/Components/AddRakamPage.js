import AddRakamForm from "./AddRakamForm";
import { Stack } from "@mui/material";
import RakamQueryResult from "./RakamQueryResult";
import { useEffect, useContext, useState } from "react";
import SiteContext from "../Store/context";
// should the rakams be stored in a rakams list that is fetched once we load the page or should we fetch it everytime?
// needs refactoring all around - for example, all useStates should be declared here and perhaps even switch to useReducer
// sync between clearing text and checkboxes and the loading animation
const AddRakamPage = () => {
    const defaultRakamData = {
        found: false, 
        makat: '',
        total: 0,
        totalOperating: 0,
    };
    const ctx = useContext(SiteContext);
    const [rakamList, setRakamList] = useState([]);
    const [foundRakamData, setFoundRakamData] = useState(defaultRakamData);
    const [acceptAddingNewRakam, setAcceptAddingNewRakam] = useState(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (ctx.userData.gdud === '')
            return

        console.log('rakam list updated');

        fetch(`/api/rakams/get_by_gdud/${ctx.userData.gdud}/`, {
            method: 'GET',
            credentials: 'include' // Include credentials to send cookies along with the request
          })
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
            .catch((error) => {
              // Handle errors
              console.error('Error:', error);
            });    
        }, [ctx.userData.gdud, isLoading]);


    const onMakat = (makat) => {
        const allRakamsWithMakat = rakamList.filter(rakam => rakam.makat === makat);
        if (allRakamsWithMakat.length !== 0){
            setFoundRakamData({
                found: true,
                makat: makat,
                total: allRakamsWithMakat.length,
                totalOperating: allRakamsWithMakat.filter(foundRakam => foundRakam.kshirot).length
            });
        }
        else
            setFoundRakamData(defaultRakamData);
        }


    const submitHandler = (rakamDetails) => {
      setAcceptAddingNewRakam(false);
      console.log(rakamDetails);
      setLoading(true);
      fetch("/api/rakams/add/", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(rakamDetails)})

      .then(result => {
        if (!result.ok){
          throw new Error("error in server - couldnt load page");
        }

        result.json()
        .then(result => {
          setLoading(false);
          if (result.err){
            throw new Error(result.err.error_message);
          }

          else {
            console.log("added successfully");
          }

        })
        .catch(err => console.log("error: " +err));
      })
      .catch(err => console.log("error: " +err));
    };

    const onAcceptNewRakam = () => {
        setAcceptAddingNewRakam(oldChoice => !oldChoice);
    }

    if (ctx.userData.isManager)
        return (
            <Stack direction={"row"} maxWidth={true}>
                <AddRakamForm onMakatChange={onMakat} gdud={ctx.userData.gdud} onValidSubmit={submitHandler} data={foundRakamData} wasApproved={acceptAddingNewRakam}/>
                <RakamQueryResult data={foundRakamData} newRakamState={{acceptAddingNewRakam, onAcceptNewRakam}}/>
            
            </Stack>
    );

    else
        return <></>
};

export default AddRakamPage;