import { AbstractElement, TitaniumElement } from '.';
import { AbstractNode } from '..';

/**
 * Representation of all elements that are not associated with a Titanium
 * view and thus not directly part of the visual tree.
 * 
 * Used for all elements that are not known to the Titanium element registry.
 * 
 * As this element is not part of the Titanium visual tree but still can
 * contain Titanium views as its children a special child element handling will
 * be applied. Invisible elements will recursively pass through all of their
 * children to its parent elements. If a Titanium element is reached the child
 * view will be inserted into the Titanium visual tree.
 * 
 * Example template:
 * 
 *  <View>
 *      <Label>1</Label>
 *      <SomeComponent>  <-- This is an invisible element
 *          <Label>2</Label>
 *      </SomeComponent>
 *      <Label>3</Label>
 *  </View>
 * 
 * Resulting visual tree:
 *  
 *  View
 *      Label 1
 *      Label 2
 *      Label 3
 * 
 * Likewise a similar handling is applied when setting attributes on invisible
 * elements. All attributes will be passed along child elements until a visual
 * element is reached and the attributes will also be applied to that element.
 */
export class InvisibleElement extends AbstractElement {

    public getAttribute(name: string): any {
        try {
            const visualElement = AbstractElement.findSingleVisualElement(this);
            return visualElement.getAttribute(name);
        } catch (e) {
            return super.getAttribute(name);
        }
    }

    public setAttribute(name: string, value: any, namespace?: string |  null): void {
        super.setAttribute(name, value, namespace);

        try {
            const visualElement = AbstractElement.findSingleVisualElement(this);
            visualElement.setAttribute(name, value, namespace);
        } catch (e) {
            // Do nothing of no visual element was found
        }
    }

    public insertBefore(newChild: AbstractNode, referenceChild: AbstractNode) {
        super.insertBefore(newChild, referenceChild);

        if (newChild instanceof AbstractElement) {
            this.insertIntoVisualTree(newChild);

            for (const child of newChild.children) {
                if (child instanceof AbstractElement) {
                    newChild.insertIntoVisualTree(child);
                }
            }

            if (this.firstElementChild === newChild && newChild instanceof TitaniumElement) {
                this.projectAttributesToVisualElement(newChild);
            }
        }
    }

    public insertIntoVisualTree(child: AbstractElement, atIndex?: number) {
        const parent = this.parentTemplateElement;
        if (parent === null) {
            return;
        }

        if (child instanceof TitaniumElement) {
            if (child.meta.detached) {
                return;
            }
        }

        const baseIndex = this.parentElement !== null ? this.parentElement.children.indexOf(this) : 0;
        const insideIndex = atIndex === null || atIndex === undefined ? this.children.indexOf(child) : atIndex;

        parent.insertIntoVisualTree(child, baseIndex + insideIndex);
    }

    private projectAttributesToVisualElement<T extends Titanium.UI.View>(visualElement: TitaniumElement<T>) {
        for (const [attributeName, attributeValue] of this.attributes) {
            let name = attributeName;
            let namespace = null;
            const nameParts = attributeName.split(':');
            if (nameParts.length === 2) {
                name = nameParts[1];
                namespace = nameParts[0];
            }
            visualElement.setAttribute(attributeName, attributeValue);
        }
    }

}
