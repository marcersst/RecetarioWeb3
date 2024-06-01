import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ContratoProvider } from "./helpers/context.jsx"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ContratoProvider>
      <App />
    </ContratoProvider>
  </BrowserRouter>
)
