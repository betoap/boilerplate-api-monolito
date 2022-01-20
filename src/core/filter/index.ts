import validate from 'validate.js';

export abstract class Filter {

    public isValidCreate(data: object): any {
        const restrictions: object = {};
        return validate(data, restrictions);
    }

    public isValidUpdate(data: object): any {
        const restrictions: object = {};
        return validate(data, restrictions);
    }

    public isValidDelete(data: object): any {
        const restrictions: object = {};
        return validate(data, restrictions);
    }
}
