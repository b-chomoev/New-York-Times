import { Container, CssBaseline } from "@mui/material";
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './features/users/LoginPage';
import RegisterPage from './features/users/RegisterPage';
import NewsForm from './features/news/NewsForm/NewsForm';
import MainPage from './containers/MainPage/MainPage';
import UserNewsPage from './containers/UserNewsPage/UserNewsPage';

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
            <Route path="/" element={<MainPage />} />
            <Route path="/new-news" element={<NewsForm />} />
            <Route path="/news/user/:id" element={<UserNewsPage />} />
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