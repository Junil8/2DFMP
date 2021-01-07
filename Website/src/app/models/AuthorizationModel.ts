export class AuthorizationModel {
    token: string;
    error?: {
        authentication?: string;
    }
}