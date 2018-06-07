import { AbstractNode } from './AbstractNode';

export abstract class AbstractTextualNode extends AbstractNode {
    constructor(text: string) {
        super();

        this._nodeValue = text;
    }

    get nodeValue() {
        return this._nodeValue as string;
    }

    set nodeValue(value: string) {
        this._nodeValue = value;

        if (this.parentElement) {
            this.parentElement.updateText();
        }
    }

    public toString(): string {
        return `${this.constructor.name}("${this.nodeValue.replace(/\s/g, '')}")`;
    }
}
