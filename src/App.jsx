import './App.css';
import MainBoard from './components/MainBoard';
import { CurrencyProvider } from './contexts/CurrencyContext';

function App() {
  return (
    <CurrencyProvider>
      <MainBoard />
    </CurrencyProvider>
  );
}
export default App;
