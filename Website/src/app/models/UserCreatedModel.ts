export class UserCreatedModel {
    username: string;
    email_address: string;
    password: string;
    password_salt: string;
    error?: {
        email_address?: string;
        username?: string;
        password?: string;
    }
}