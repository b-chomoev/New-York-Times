import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import { apiUrl } from '../../globalConstants';
import { selectNews } from '../../features/news/newsSlice';
import { fetchNews } from '../../features/news/newsThunks';

const MainPage = () => {
  const news = useAppSelector(selectNews);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Cocktails
        </Typography>
        <Grid container spacing={3}>
          {news.map((event) => (
            <Grid key={event._id} component='div'>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  src={`${apiUrl}/${event.image}`} // Путь к изображению
                  alt={event.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    Title: {event.title}
                  </Typography>
                  <Typography variant="h6" component="div">
                    By: {event.user.username}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;