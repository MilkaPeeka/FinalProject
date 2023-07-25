import { FormControlLabel, 
    FormGroup,
    FormLabel,
    Button, 
    Stack,
    TextField, 
    Checkbox, 
    Card,
    Typography
    } from "@mui/material";



    const AddRakamForm = (props) => {
        
        return (
            /*
            setting data here means that THIS IS STYLING ABOUT THE FORM, not its children
            */
            <Card component={'form'} variant="outlined" sx={{
                padding: 2,
                borderRadius: 6,
                mt: 3,
                mx: 3,
                flexBasis: 0, 
                flexGrow: 1
                }}>
                <FormGroup sx= {{
                    marginBottom: 3
                }}>
                    <FormLabel>הכנס מספר גדוד</FormLabel>
                    <TextField variant="outlined" label="מספר גדוד"/>
                </FormGroup>

                <FormGroup sx= {{
                    marginBottom: 3
                }}>                
                
                <FormLabel>הכנס מספר סידורי כללי של רקמ</FormLabel>
                    <TextField variant="outlined" label="מספר גדוד"/>
                </FormGroup>

                <FormGroup sx= {{
                    marginBottom: 3
                }}>                <FormLabel>הכנס מזהה ייחודי של רקמ</FormLabel>
                    <TextField variant="outlined" label="מספר גדוד"/>
                </FormGroup>

                <Button variant="contained">הוסף רקמ למערכת!</Button>
                
            </Card>  

        );
};

export default AddRakamForm;