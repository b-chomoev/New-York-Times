import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/users/LoginPage';
import RegisterPage from './features/users/RegisterPage';

const App = () => {

  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="*" element={(<h1>Not found</h1>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;