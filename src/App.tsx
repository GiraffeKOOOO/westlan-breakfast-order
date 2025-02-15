// libraries
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// providers
import { UserProvider } from './Context/UserContext.tsx';
import { OrderProvider } from './Context/OrderContext.tsx';
import { LockedStatusProvider } from './Context/LockedStatusContext.tsx';
import { ThemeProvider } from './Context/ThemeContext';
// files
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
import AuthHandler from './pages/AuthHandler.tsx';
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
  {
    path: '/auth',
    element: <AuthHandler />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <LockedStatusProvider>
        <UserProvider>
          <OrderProvider>
            <RouterProvider router={router} />
          </OrderProvider>
        </UserProvider>
      </LockedStatusProvider>
    </ThemeProvider>
  );
}

export default App;
