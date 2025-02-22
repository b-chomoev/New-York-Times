export interface RegisterMutation {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface News {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  user: User;
}

export interface NewsMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]:{
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}