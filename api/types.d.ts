export interface UserFields {
    username: string;
    email: string;
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleID: string;
    facebookID: string;
    __confirmPassword: string;
}

export interface NewsMutation {
    email: string;
    title: string;
    description: string;
    image: string | null;
}