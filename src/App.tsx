// libraries
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// providers
import { UserProvider } from './Context/UserContext.tsx';
import { DarkModeProvider } from './Context/DarkModeContext.tsx';
import { SnackbarProvider } from 'notistack';
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
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <DarkModeProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </DarkModeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
