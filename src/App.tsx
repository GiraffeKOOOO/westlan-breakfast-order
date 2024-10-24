// libraries
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// providers
import { UserProvider } from './Context/UserContext.tsx';
import { OrderProvider } from './Context/OrderContext.tsx';
// import { ThemeProvider } from './components/ThemeContext/ThemeContext';
// files
import Home from './Pages/Home.tsx';
import Admin from './Pages/Admin.tsx';
// styles
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);

function App() {
  return (
    // <ThemeProvider>
    <UserProvider>
      <OrderProvider>
        <RouterProvider router={router} />
      </OrderProvider>
    </UserProvider>
    // </ThemeProvider>
  );
}

export default App;
