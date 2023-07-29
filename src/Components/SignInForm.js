import {
    Card, 
    Typography,
    FormGroup,
    CircularProgress,
    FormLabel,
    TextField,
    Button
    } from "@mui/material";

import { useContext, useState } from "react";
import SiteContext from "../Store/context";
const SignInForm = () => {
    const ctx = useContext(SiteContext);
    const isLoading = ctx.isLoading;
    const serverError = ctx.serverError;
    const [pernumValue, setPernum] = useState('');
    const [errorVal, setError] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if (errorVal)
            return;
        ctx.onLogIn(pernumValue);
        setPernum('');
    };

    const inputHandler = (event) => {
        const value = event.target.value;
        setPernum(value);

        if (value.trim().length !== 0){
            setError('');
        }
        else {
            setError("שדה לא יכול להיות ריק");
        }

    }



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
                
                
                    <Typography variant="h4">ברוך הבא לבזכ בקטן! אנא היכנס למערכת</Typography>
                
                    <FormGroup sx= {{
                        marginBottom: 3
                    }}>
                        <FormLabel>הכנס מספר אישי</FormLabel>
                        <TextField
                            variant="outlined"
                            label="מספר אישי"
                            onChange={inputHandler}
                            value={pernumValue}
                            error={errorVal !== ''} // Set the error prop to true if there is an error, false otherwise
                            helperText={errorVal || ''} // Display the error message in the helper text if there is an error
                            />                        
                    <FormLabel error>{serverError}</FormLabel> 
                    </FormGroup>

                    {isLoading ? <CircularProgress color="secondary" /> : <Button variant="contained" type="submit">התחברות</Button>}

                </Card>
        );

    return (
        <></>
    );
}


export default SignInForm;