
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StoreProvider } from 'easy-peasy';
import store from './store/index.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
<StoreProvider store={store}>
  <ToastContainer/>
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
</StoreProvider>
  // </StrictMode>,
)
