import '/src/App.css';
import MainBoard from '/src/components/MainBoard';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <MainBoard />
    </CurrencyProvider>
  );
}
export default App;
