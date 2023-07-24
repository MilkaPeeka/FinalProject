import './App.css';
import CustomDoughnut from './Components/Doughnut';
import CustomGraph from './Components/Graph';
import Navbar from './Components/Navbar';
import {SiteContextProvider} from './Store/context';
function App() {
  return (
    <SiteContextProvider>
      <Navbar />  
      <CustomDoughnut items={[{
        color: "#46B1C9",
        value: 100,
        label: "תקול זמנית"
      },
      {
        value: 20,
        color: "#E2A1E9",
        label: "עובדים"
      }]} />

      <CustomGraph items={[{
        value: 100,
        label: "תקול זמנית"
      },
      {
        color: "#49E1C9",
        value: 20,
        label: "עובדים"
      }]}/>
    </SiteContextProvider>
  );
}

export default App;
