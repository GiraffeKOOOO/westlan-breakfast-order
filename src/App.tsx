// libraries
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// providers
// import { ThemeProvider } from './components/ThemeContext/ThemeContext';
// files
import Home from './pages/Home.tsx';
import Admin from './pages/Admin.tsx';
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
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
