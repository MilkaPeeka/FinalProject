import './App.css';
import Navbar from './Components/Navbar';
import {SiteContextProvider} from './Store/context';
function App() {
  return (
    <SiteContextProvider>
      <Navbar />  
    </SiteContextProvider>
  );
}

export default App;
