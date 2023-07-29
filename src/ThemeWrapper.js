import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useContext } from 'react';
import SiteContext from './Store/context';


const ThemeWrapper = (props) => {
    const ctx = useContext(SiteContext);
    const theme = createTheme({
        direction: 'rtl',
        palette: {
            mode: ctx.isInDarkMode ? 'dark' : 'light'
        }
      });
      const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      });

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </CacheProvider>

    );
}


export default ThemeWrapper;
