import { load, dump } from 'js-yaml';

export function parse<T>(value: string) {
    if (value.startsWith('{')) {
        return JSON.parse(value);
    }
    return load(value);
}

export function stringify<T>(value: T, type: string) {
    return type === 'yaml' ? dump(value) : JSON.stringify(value, null, '  ');
}
