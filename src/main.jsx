import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import RootStore from "./store";

const store = RootStore.create({});
export const StoreContext = createContext(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>   
  </StrictMode>,
)
