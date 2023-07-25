import { createTheme, ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const RTLWrapper = (props) => {
    const theme = createTheme({
        direction: 'rtl',
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


export default RTLWrapper;