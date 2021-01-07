import { AbstractControl, AsyncValidatorFn, ValidatorFn } from "@angular/forms";

import { ApiService } from '../services/api.service';

export class CustomValidator {
    static match(field: AbstractControl): ValidatorFn {
        return (control: AbstractControl): {[key: string]: boolean} | null => {
            return field.value !== control.value? {match: true } : null;
        }
    }

    static emailAvailable(api: ApiService): AsyncValidatorFn {
        return async (control: AbstractControl): Promise<{[key: string]: boolean} | null> => {
            let available = await api.emailAvailable(control.value);
    
            if (!available.available) return null;
            
            return available.available.email_address ? null : {emailAvailable: true };
        }
    }

    static usernameAvailable(api: ApiService): AsyncValidatorFn {
        return async (control: AbstractControl): Promise<{[key: string]: boolean} | null> => {
            let available = await api.usernameAvailable(control.value);
    
            if (!available.available) return null;
            
            return available.available.username ? null : {usernameAvailable: true };
        }
    }
}