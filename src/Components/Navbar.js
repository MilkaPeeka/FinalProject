import SiteContext from '../Store/context';
import { useContext, useState } from 'react';
import { AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Stack, 
    Button,
    ToggleButtonGroup,
    ToggleButton 
} from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SchoolIcon from '@mui/icons-material/School';
const Navbar = (props) => {
    const ctx = useContext(SiteContext);
    const isLoggedIn = ctx.isLoggedIn;
    const isInDarkMode = ctx.isInDarkMode;
    console.log(isInDarkMode);
    const [alignment, setAlignment] = useState(isInDarkMode ? 'moon' : 'sun');

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
        setAlignment(newAlignment);
        ctx.onDarkModeToggle();
        }
    };

    return (
    <AppBar position='static'>
        <Toolbar sx={{flexGrow: 1}}>
            <IconButton size={'large'} color='inherit' aria-label='logo'><SchoolIcon/></IconButton>
            <Typography variant='h6' component='div'>בזק בקטן</Typography>
            <Stack direction='row' spacing={2}>
            <Button color='inherit'>לוח מידע</Button>
            <Button color='inherit'>הוספת רקמ</Button>
            <Button color='inherit'>התנתקות</Button>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="sun" sx={{color: 'white'}}><WbSunnyIcon/></ToggleButton>
                <ToggleButton value="moon" sx={{color: 'white'}}><ModeNightIcon color='white'/></ToggleButton>
            </ToggleButtonGroup>
            </Stack>
        </Toolbar>
    </AppBar>
    );
}

export default Navbar;