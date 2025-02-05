
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StoreProvider } from 'easy-peasy';
import store from './store/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
<StoreProvider store={store}>
  <ToastContainer/>
  {/* <RouterProvider router={router}> */}
  <BrowserRouter>
    <App />
  
  </BrowserRouter>
  {/* </RouterProvider> */}
</StoreProvider>
  // </StrictMode>,
)
