import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import * as url from 'url';

@Directive({
    selector: '[appMilovanaUrl]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MilovanaUrlValidator, multi: true }],
})
export class MilovanaUrlValidator implements Validator {

    validate(control: AbstractControl): { [key: string]: any } | null {
        if (!control.value) { return null; }
        const urlObj = url.parse(control.value);
        const fail =
            urlObj.hostname !== 'milovana.com' || urlObj.pathname !== '/webteases/showtease.php' || !urlObj.query.startsWith('id=');
        return fail ? { milovanaUrl: { value: control.value } } : null;
    }

}
