import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUserNews } from '../../features/news/newsSlice';
import { useEffect } from 'react';
import { deleteNews, fetchUserNews } from '../../features/news/newsThunks';
import { Button, Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { apiUrl } from '../../globalConstants';
import { toast } from 'react-toastify';

const UserNewsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const userNews = useAppSelector(selectUserNews);
  const name = userNews[0]?.user?.username;
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      dispatch(fetchUserNews(id));
    }
  }, [id, dispatch]);

  const onDelete = (id: string) => {
    try {
      dispatch(deleteNews(id));
      navigate('/')
      toast.success('News deleted');
    } catch (error) {
      toast.error('Error deleting news');
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>{name}'s Portal</Typography>
        <Grid container spacing={3}>
          {userNews.map((newsItem) => (
            <Grid key={newsItem._id} >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${apiUrl}/${newsItem.image}`}
                  alt={newsItem.title}
                />
                <CardContent>
                  <Typography variant="h6">{newsItem.title}</Typography>
                  <Typography>{newsItem.description}</Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(newsItem._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default UserNewsPage;