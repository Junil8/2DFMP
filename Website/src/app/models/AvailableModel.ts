export class AvailableModel {
    available: {
        email_address?: boolean;
        username?: boolean;
    };
    error?: {
        email_address?: string;
        username?: string;
    }
}