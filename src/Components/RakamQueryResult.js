/*
A comp to display when a rakam is found when entering its sku
*/

import {Card, 
        Stack,
        Typography,
        FormControlLabel,
        Checkbox,
        CircularProgress
    } from '@mui/material';

const RakamQueryResult = (props) => {
    const isFound = true;
    const exampleDataRakam = {
        total: 20,
        kshirim: 10
    }

    const rakamData = props.data;


    const stackStyle = {
        borderRadius: 6,
        mt: 3,
        mx: 3,
        flexBasis: 0, 
        flexGrow: 1,
        bgcolor: isFound ? 'lightgreen' : 'salmon',
        textAlign: 'center',
        alignItems: 'center', // Center items vertically

    };

    const failedQueryCheckboxStyle = {
        bgcolor: 'white', // White background
        borderRadius: 10,
        width: '80%',
        padding: 1,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow effect
    };

    const changeHandler = () => {
        
    }

    const notFoundHTML = (
        <>
            <Typography variant='h4' color={'white'} mt={5}>רקמ לא נמצא בגדוד!</Typography>
            <Typography color={'white'} fontWeight={'bold'}>שים לב שהקלדת את המספר הסידורי הנכון!</Typography>
            <Typography color={'white'} >במידה והינך רוצה להכניס רקמ מסוג חדש למערכת, אנא לחץ על הכפתור למטה ותאשר שברצונך לעשות זאת.</Typography>
            <FormControlLabel control={<Checkbox  color="success" onChange={changeHandler}/>} label="ווידאתי שהכנסתי נתונים נכונים וברצוני להוסיף רקמ חדש לגדוד"
            sx={failedQueryCheckboxStyle}/> 
        </>
    );


    const foundHTML = (
        <>
            <Typography variant='h4' color={'white'} mt={5}>רקמ נמצא בגדוד!</Typography>

        </>
    );

    return (
        <Stack spacing={2} sx={stackStyle}>
            {isFound || notFoundHTML}
            {isFound && foundHTML}
            
        </Stack>
    );

};

export default RakamQueryResult;
