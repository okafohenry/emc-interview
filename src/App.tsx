import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from "./utils/routes"
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position='top-right' />
    </>
  );
}

export default App;
