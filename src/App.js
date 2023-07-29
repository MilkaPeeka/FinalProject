import './App.css';
import Navbar from './Components/Navbar';
import AddRakamPage from './Components/AddRakamPage';
import {SiteContextProvider} from './Store/context';
import ThemeWrapper from './ThemeWrapper';
import SignInForm from './Components/SignInForm';
import Dashboard from './Components/Dashboard';


// use axios


function App() {
  return (
    <SiteContextProvider>
      <ThemeWrapper>
        <Navbar />  
        <Dashboard />
        <AddRakamPage />
        <SignInForm />
      </ThemeWrapper>
    </SiteContextProvider>
  );
}

export default App;
