export class UserDeletedModel {
    deleted: boolean;
    error?: {
        password?: string;
        authentication?: string;
    }
}