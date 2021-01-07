export class UserUpdatedModel {
    updated: boolean;
    error?: {
        new_username?: string;
        new_password?: string;
        password?: string;
        authentication?: string;
    }
}