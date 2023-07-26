import {
    Card, 
    Typography,
    FormGroup,
    FormLabel,
    TextField,
    Button
    } from "@mui/material";
const SignInForm = () => {
    return (
        <Card component={'form'} variant="outlined" sx={{
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
                    <TextField variant="outlined" label="מספר אישי"/>
                </FormGroup>

                <Button variant="contained">התחברות</Button>

            </Card>
    );
}


export default SignInForm;