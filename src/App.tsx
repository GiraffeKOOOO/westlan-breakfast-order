// libraries
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// providers
import { UserProvider } from './Context/UserContext.tsx';
import { LockedStatusProvider } from './Context/LockedStatusContext.tsx';
import { DarkModeProvider } from './Context/DarkModeContext.tsx';
// files
import Home from './Pages/Home.tsx';
import Admin from './Pages/Admin.tsx';
import AuthHandler from './Pages/AuthHandler.tsx';
// styles
import './App.css';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <LockedStatusProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </LockedStatusProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
