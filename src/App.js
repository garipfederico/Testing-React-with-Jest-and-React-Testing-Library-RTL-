import './App.css';
import SummaryForm from './pages/summary/SummaryForm';
import Options from './pages/entry/Options';
import { Container } from 'react-bootstrap';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './context/OrderDetails';

function App() {
  return (
    <div className="App">
      {/* <Options></Options>
      <SummaryForm /> */}
      <Container>
        <OrderDetailsProvider>
          {/* Sumary page and entry page need provider*/}
        <OrderEntry />
        </OrderDetailsProvider>
      </Container>
    </div>
  );
}

export default App;
