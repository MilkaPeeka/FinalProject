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
import SchoolIcon from '@mui/icons-material/School';
const Navbar = (props) => {
    const ctx = useContext(SiteContext);
    const [alignment, setAlignment] = useState('web');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };
    const isLoggedIn = ctx.isLoggedIn;
    const isInDarkMode = ctx.isInDarkMode;

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
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                >
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
            </ToggleButtonGroup>
            </Stack>
        </Toolbar>
    </AppBar>
    );
}

export default Navbar;