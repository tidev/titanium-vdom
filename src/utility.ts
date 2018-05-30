export function camelize(value: string): string {
    return value.replace(/-(\w)/g, (match, firstSubMatch) => firstSubMatch ? firstSubMatch.toUpperCase() : '');
}

export function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export function runs(name: string): boolean {
    if (name === 'ios') {
        return ['iphone', 'ipad'].indexOf(Ti.Platform.osname) !== -1;
    }

    return name === Ti.Platform.osname;
}
