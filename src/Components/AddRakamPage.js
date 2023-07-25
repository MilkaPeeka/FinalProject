import AddRakamForm from "./AddRakamForm";
import { Stack } from "@mui/material";
import RakamQueryResult from "./RakamQueryResult";
const AddRakamPage = (props) => {
    return (
        <Stack direction={"row"} maxWidth={true}>
        
        <AddRakamForm/>
        <RakamQueryResult />
            
        </Stack>
    );
};

export default AddRakamPage;