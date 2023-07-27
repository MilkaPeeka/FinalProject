import './App.css';
import RakamDoughnut from './Components/RakamDoughnut';
import CustomGraph from './Components/Graph';
import Navbar from './Components/Navbar';
import AddRakamPage from './Components/AddRakamPage';
import {SiteContextProvider} from './Store/context';
import ThemeWrapper from './ThemeWrapper';
import SignInForm from './Components/SignInForm';

function App() {
  const data = {
    valid : 10,
    invalid : 4
  };

  return (
    <SiteContextProvider>
      <ThemeWrapper>
        <Navbar />  
          <RakamDoughnut width={700} height={700} {...data}/>
        <AddRakamPage />
        <SignInForm />
      </ThemeWrapper>
    </SiteContextProvider>
  );
}

export default App;
