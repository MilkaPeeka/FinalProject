import AddRakamForm from "./AddRakamForm";
import { Stack } from "@mui/material";
import RakamQueryResult from "./RakamQueryResult";
import { useEffect, useContext, useState } from "react";
import SiteContext from "../Store/context";
// should the rakams be stored in a rakams list that is fetched once we load the page or should we fetch it everytime?
const AddRakamPage = (props) => {
    const defaultRakamData = {
        found: false, 
        makat: '',
        total: '',
        totalOperating: '',
    };
    const ctx = useContext(SiteContext);
    const gdud = ctx.userData.gdud;
    const [rakamList, setRakamList] = useState([]);
    const [foundRakamData, setFoundRakamData] = useState(defaultRakamData);
    const [acceptAddingNewRakam, setAcceptAddingNewRakam] = useState(false);

    useEffect(() => {
        if (gdud === '')
            return

        fetch(`/api/rakams/get_by_gdud/${gdud}/`, {
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
        }, [gdud]);


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

    };

    const onAcceptNewRakam = () => {
        setAcceptAddingNewRakam(oldChoice => !oldChoice);
    }

    if (ctx.isLoggedIn)
        return (
            <Stack direction={"row"} maxWidth={true}>

                <AddRakamForm onMakatChange={onMakat} gdud={gdud} onValidSubmit={submitHandler}/>
                <RakamQueryResult data={foundRakamData} onAcceptNewRakam={onAcceptNewRakam}/>
            
            </Stack>
    );

    else
        return <></>
};

export default AddRakamPage;