import { createContext, useEffect, useState } from 'react';

const defaultUserData = {
    gdud: '',
    isManager: false,
    pernum: '',
};
const SiteContext = createContext({
    isLoggedIn: false,
    isInDarkMode: false,
    isLoading: false,
    serverError: '',
    userData : defaultUserData,
    onDarkModeToggle: () => {},
    onLogOut: () => {},
    onLogIn: (pernum) => {},
    onAddRakam: () => {},
});

export const SiteContextProvider = (props) => {
    // on initial render we will want to fetch the state of both being logged in and dark mode
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isInDarkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        gdud: '',
        isManager: false,
        pernum: '',
    });
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        setDarkMode(localStorage.getItem('isDarkMode') === '1');
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/isLoggedIn', {credentials: "include",})
        .then(resp => {
            setIsLoading(false);
            if (!resp.ok){
                throw new Error("resp not okay");
            }

            resp.json()
            .then(result => {
                if (result.error){
                    throw new Error(result.error_message);
                }

                if (result.user){
                    setUserData(result.user);
                    setLoggedIn(true);
                }

                else {
                    throw new Error("not marked as logged in in the system");
                }
            })

            .catch(err => {console.log("error on checking if signed in:", err)});
        })
        .catch(err => {
            console.log("error on checking if signed in:", err);
        })
    }, []);
    // handle dark mode toggling
    const onToggle = () => {
        setDarkMode((prevState) => {
            localStorage.setItem('isDarkMode', !prevState ? '1' : '0');
            return !prevState;
        });
    }

    // handle log out and log in
    const logoutHandler = () => {
        fetch('/api/logout', {credentials: "include",})
        .then(resp => {
            if (!resp.ok){
                throw new Error("resp not okay");
            }

            resp.json()
            .then(result => {
                if (result.error){
                    throw new Error(result.error_message);
                }
                else {
                    setUserData(defaultUserData);
                    setLoggedIn(false);
                }
            })

            .catch(err => {console.log("error on parsing signout:", err)});
        })
        .catch(err => {
            console.log("error on signing out:", err);
        })
      };

    const loginHandler = async (pernum) => {
        setIsLoading(true);
        try {
            const result = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pernum})
                });

            if (!result.ok){
                throw new Error('Didnt get right result code');
            }
            const data = await result.json();
            if (data.error){
                throw new Error(data.error_message);
            }
            setUserData(data.user);
            setServerError('');
            setLoggedIn(true);
        }
        catch (err){
            console.log("ERROR: ", err);
            setServerError('התחברות נכשלה. אנא וודא שהכנסת מספר אישי נכון');
        }
        setIsLoading(false);

    };
    
    return (
        <SiteContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                isInDarkMode: isInDarkMode,
                userData: userData,
                isLoading: isLoading,
                serverError: serverError,
                onDarkModeToggle: onToggle,
                onLogOut: logoutHandler,
                onLogIn: loginHandler,
                onAddRakam: () => {},
            }}>
            {props.children}
        </SiteContext.Provider>
    );
    
}

export default SiteContext;