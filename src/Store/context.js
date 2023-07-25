import { createContext, useEffect, useState } from 'react';

const SiteContext = createContext({
    isLoggedIn: false,
    isInDarkMode: false,
    onDarkModeToggle: () => {},
    onLogOut: () => {},
    onLogIn: () => {},
});

export const SiteContextProvider = (props) => {
    // on initial render we will want to fetch the state of both being logged in and dark mode
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === '1');
    const [isInDarkMode, setDarkMode] = useState(localStorage.getItem('isDarkMode') === '1');


    // handle dark mode toggling
    const onToggle = () => {
        setDarkMode((prevState) => {
            localStorage.setItem('isDarkMode', !prevState ? '1' : '0');
            return !prevState;
        });
    }

    // handle log out and log in
    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', '0');
        setLoggedIn(false);
      };
    
      const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setLoggedIn(true);
      };

    return (
        <SiteContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                isInDarkMode: isInDarkMode,
                onDarkModeToggle: onToggle,
                onLogOut: logoutHandler,
                onLogIn: loginHandler
            }}>
            {props.children}
        </SiteContext.Provider>
    );
    

}

export default SiteContext;