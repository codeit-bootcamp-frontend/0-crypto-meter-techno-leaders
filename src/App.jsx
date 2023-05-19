import './App.css';
import GNB from './components/GNB/GNB';
import { CurrencyProvider } from './contexts/CurrencyContext';

function App() {
  return (
    <CurrencyProvider value={'krw'}>
      <GNB />
    </CurrencyProvider>
  );
}

export default App;
