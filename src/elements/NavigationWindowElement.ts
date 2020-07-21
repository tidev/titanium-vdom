import { TitaniumElement } from './TitaniumElement';

export class NavigationWindowElement extends TitaniumElement<Ti.UI.NavigationWindow> {
  constructor() {
    super('navigation-window', Ti.UI.createNavigationWindow, {
      typeName: 'Ti.UI.NavigationWindow',
      detached: true
    });
  }

  protected insertChild<U extends Titanium.Proxy>(element: TitaniumElement<U>, atIndex?: number | null): void {
    if (element.tagName !== 'WINDOW') {
      return;
    }
    this.setAttribute('window', element.titaniumView);
    super.insertChild(element, atIndex);
  }
}
