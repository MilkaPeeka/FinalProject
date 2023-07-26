import { FormControlLabel, 
    FormGroup,
    FormLabel,
    Button, 
    TextField, 
    Card,
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
                flexGrow: 1,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', // Optional shadow effect
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
                
                <FormLabel>הכנס מקט רקמ</FormLabel>
                    <TextField variant="outlined" label="מקט רקמ"/>
                </FormGroup>

                <FormGroup sx= {{
                    marginBottom: 3
                }}>                <FormLabel>הכנס מספר ייחודי של רקמ</FormLabel>
                    <TextField variant="outlined" label="מספר ייחודי"/>
                </FormGroup>

                <Button variant="contained">הוסף רקמ למערכת!</Button>
                
            </Card>  

        );
};

export default AddRakamForm;