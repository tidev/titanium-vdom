import { ElementCollection } from './ElementCollection';
import { AbstractElement } from './elements/AbstractElement';
import { TitaniumElement } from './elements/TitaniumElement';

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

export function findSingleVisualElement<T extends Titanium.Proxy>(node: AbstractElement): TitaniumElement<T> {
    if (node instanceof TitaniumElement) {
        return node;
    }

    let visualElement = null;
    try {
        visualElement = findSingleVisualElementRecursive<T>(node.children);
    } catch (e) {
        throw new Error(`No suitable visual element found within ${node}. Reason: ${e.message}`);
    }

    return visualElement;
}

function findSingleVisualElementRecursive<T extends Titanium.Proxy>(elements: ElementCollection, nestingLevel: number = 0): TitaniumElement<T> {
    if (elements.length === 0) {
        throw new Error(`Reached buttom of tree without finding at least one visual element (nesting level: ${nestingLevel}).`);
    }

    if (elements.length > 1) {
        throw new Error(`Expected only one elemnt, but found ${elements.length} (nesting level: ${nestingLevel}).`);
    }

    if (nestingLevel > 50) {
        throw new Error(`Couldn't find a visual element after reaching nesting level limit (nesting level: ${nestingLevel}.`);
    }

    const candidateElement = elements.item(0);
    if (candidateElement instanceof TitaniumElement) {
        return candidateElement;
    }

    return findSingleVisualElementRecursive(candidateElement.children, nestingLevel + 1);
}
