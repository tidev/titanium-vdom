import { camelize, capitalizeFirstLetter, runs } from '../../src/utility';

describe('utility', () => {
    describe('camelize', () => {
        it('should camelize string', () => {
            const source = 'kebab-case';
            const expected = 'kebabCase';
            expect(camelize(source)).toEqual(expected);
        });
    });

    describe('capitalizeFirstLetter', () => {
        it('should capitalize first letter', () => {
            const source = 'upper';
            const expected = 'Upper';
            expect(capitalizeFirstLetter(source)).toEqual(expected);
        });
    });

    describe('runs', () => {
        it('should detect current platform', () => {
            expect(runs(Ti.Platform.osname)).toBeTruthy();
        });

        if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
            it('should detect common "ios" platform name', () => {
                expect(runs('ios')).toBeTruthy();
            });
        }
    });
});
