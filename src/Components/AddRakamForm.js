import { 
    FormGroup,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Button, 
    TextField, 
    Card,
    } from "@mui/material";
import { useEffect, useState } from "react";
import useInput from "../use-input";
/*
NEED TO RESET FORM WHEN LOGGING OUT,
*/
    const AddRakamForm = (props) => {
        const makatInputField = useInput(value => value.trim().length !== 0 && /^\d+$/.test(value))
        const serialNumInputField = useInput(value => value.trim().length !== 0 && /^\d+$/.test(value))
        const [kshirot, setKshirot] = useState(false);
        const {onMakatChange} = props;
        useEffect(() => onMakatChange(makatInputField.value), [onMakatChange, makatInputField.value]);

        const submitHandler = (event) =>{
            event.preventDefault();
            if (!(makatInputField.isValid && serialNumInputField.isValid) && (props.wasApproved || props.data.isFound))
                return;

            const newRakamData = {
                gdud: props.gdud,
                makat: makatInputField.value,
                carNumber: serialNumInputField.value,
                kshirot: kshirot
            };
            props.onValidSubmit(newRakamData);
            makatInputField.reset();
            serialNumInputField.reset();
            setKshirot(false);
        };

        return (
            /*
            setting data here means that THIS IS STYLING ABOUT THE FORM, not its children
            */
            <Card onSubmit={submitHandler} component={'form'} variant="outlined" sx={{
                padding: 2,
                borderRadius: 6,
                mt: 3,
                mx: 3,
                flexBasis: 0, 
                flexGrow: 1,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)', // Optional shadow effect
                }}>
                <FormGroup mb={3}>
                    <FormLabel mb={1}>מספר גדוד</FormLabel>
                    <TextField variant="outlined" disabled value={props.gdud}/>
                </FormGroup>

                <FormGroup mb={3}>
                    <FormLabel mb={1}>הכנס מקט רקמ</FormLabel>
                    <TextField variant="outlined" label="מקט רקמ" onChange={makatInputField.valueChangeHandler} onBlur={makatInputField.inputBlurHandler} value={makatInputField.value} error={makatInputField.hasError}/>
                    {makatInputField.hasError && <FormLabel error mb={1}>מקט חייב להכיל רק ספרות</FormLabel>}
                </FormGroup>

                <FormGroup mb={3}>
                    <FormLabel mb={1}>הכנס מספר ייחודי של רקמ</FormLabel>
                    <TextField variant="outlined" label="מספר ייחודי" onChange={serialNumInputField.valueChangeHandler} onBlur={serialNumInputField.inputBlurHandler} error={serialNumInputField.hasError} value={serialNumInputField.value}/>
                    {serialNumInputField.hasError && <FormLabel error mb={1}>מספר ייחודי חייב להכיל רק ספרות</FormLabel>}
                </FormGroup>

                <FormGroup>
                    <FormControlLabel control={<Checkbox onChange={() => setKshirot(prevState => !prevState)} checked={kshirot}/>} label="הכלי כשיר" />
                </FormGroup>
                <Button variant="contained" type="submit" disabled={!props.data.found && !props.wasApproved}>הוסף רקמ למערכת!</Button>
            </Card>  

        );
};

export default AddRakamForm;