import { MilovanaUrlValidator as MilovanaUrlValidator } from './milovana-url.validator';

describe('MilovanaUrlValidatorDirective', () => {
    it('should create an instance', () => {
        const directive = new MilovanaUrlValidator();
        expect(directive).toBeTruthy();
    });
});
