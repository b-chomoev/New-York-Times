import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { apiUrl } from '../../globalConstants';
import { selectNews, selectNewsFetchLoading } from '../../features/news/newsSlice';
import { fetchNews } from '../../features/news/newsThunks';
import { News } from '../../types';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const news = useAppSelector(selectNews);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectNewsFetchLoading);

  const [open, setOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const modalOpen = (newsItem: News) => {
    setSelectedNews(newsItem);
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
    setSelectedNews(null);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          News
        </Typography>

        {loading ? (
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {news.map((event) => (
              <Grid key={event._id} component='div'>
                <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => modalOpen(event)}>
                  <CardMedia
                    component="img"
                    height="200"
                    src={`${apiUrl}/${event.image}`}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Title: {event.title}
                    </Typography>
                    <Typography variant="h6" component="div">
                      By: <Link to={`/news/user/${event.user._id}`}>{event.user.username}</Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog
        open={open}
        onClose={modalClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ padding: '1rem 2rem' }}>
          <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
            Title: {selectedNews?.title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
          <div style={{ flex: '0 0 40%' }}>
            <img
              src={`${apiUrl}/${selectedNews?.image}`}
              alt={selectedNews?.title}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ flex: '1' }}>
            <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.6 }}>
              Description: {selectedNews?.description}
            </Typography>
            <Typography variant="body2" sx={{ color: '#888', marginTop: '1rem' }}>
              Author: {selectedNews?.user?.username}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: '1rem 2rem' }}>
          <Button onClick={modalClose} sx={{ color: '#333', textTransform: 'none' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainPage;