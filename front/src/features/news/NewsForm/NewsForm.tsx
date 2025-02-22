import React, { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, TextField, Typography, Container } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NewsMutation } from '../../../types';
import { createNews } from '../newsThunks';

const initialState = {
  title: '',
  description: '',
  image: null,
};

const NewsForm = () => {
  const [form, setForm] = useState<NewsMutation>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    try {
      dispatch(createNews({ ...form}));
      setForm(initialState);
      navigate('/');
      toast.success('News created successfully');
    } catch (error) {
      toast.error('Error creating news');
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={submitFormHandler}>
        <Grid container direction="column" spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Title</Typography>
            <TextField
              id="title"
              name="title"
              label="News title"
              required
              value={form.title}
              onChange={inputChangeHandler}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Description</Typography>
            <TextField
              id="description"
              name="description"
              label="Description"
              required
              value={form.description}
              onChange={inputChangeHandler}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Image</Typography>
            <FileInput name="image" label="Image" onGetFile={fileEventChangeHandler} />
          </Grid>

          <Grid container justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Create News
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewsForm;