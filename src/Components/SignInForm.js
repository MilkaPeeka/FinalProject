import {
    Card, 
    Typography,
    FormGroup,
    FormLabel,
    TextField,
    Button
    } from "@mui/material";

import { useContext, useState } from "react";
import SiteContext from "../Store/context";
const SignInForm = () => {
    const ctx = useContext(SiteContext);
    const [pernumValue, setPernum] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        ctx.onLogIn(pernumValue);
    };

    if (!ctx.isLoggedIn)
        return (
            <Card onSubmit={submitHandler} component={'form'} variant="outlined" sx={{
                padding: 2,
                borderRadius: 6,
                mt: 3,
                mx: 3,
                flexBasis: 0, 
                flexGrow: 1,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.4)', // Optional shadow effect
                }}>
                
                
                    <Typography variant="h4">ברוך הבא לבזק בקטן! אנא היכנס למערכת</Typography>
                
                    <FormGroup sx= {{
                        marginBottom: 3
                    }}>
                        <FormLabel>הכנס מספר אישי</FormLabel>
                        <TextField variant="outlined" label="מספר אישי" onChange={(event) => setPernum(event.target.value)} value={pernumValue}/>
                    </FormGroup>

                    <Button variant="contained" type="submit">התחברות</Button>

                </Card>
        );

    return (
        <></>
    );
}


export default SignInForm;