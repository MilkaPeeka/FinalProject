import style from './Navbar.module.css'
import SiteContext from '../Store/context';
import { useContext } from 'react';
const Navbar = (props) => {
    const ctx = useContext(SiteContext);

    const isLoggedIn = ctx.isLoggedIn;
    const isInDarkMode = ctx.isInDarkMode;

    return (
    <div className={`${style.nav} ${isInDarkMode ? style.dark : ''}`}>
            <p>APPLOGO </p>

            <p>homepage</p>
            <p>add item</p>

            <button onClick={ctx.onDarkModeToggle}>Toggle dark mode</button>
        </div>
    );
}

export default Navbar;