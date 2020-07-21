import { NavigationWindowElement } from 'vdom/index';

import { createElement } from '../../helpers';

describe('NavigationWindow', () => {
  let nav!: NavigationWindowElement | null;

  beforeEach(() => {
    nav = new NavigationWindowElement();
  });

  afterEach(() => {
    nav = null;
  });

  describe('constructor', () => {
    it('should configure element', () => {
      expect(nav.tagName).toBe('NAVIGATION-WINDOW');
      expect(nav.meta).toEqual({
        typeName: 'Ti.UI.NavigationWindow',
        detached: true
      });
    });
  });

  describe('insertChild', () => {
    it('should set root window', () => {
      const window = createElement('Window');
      nav.appendChild(window);
      expect(nav.titaniumView.window).toBe(window.titaniumView);
    });

    it('should ignore elements other than window', () => {
      const window = createElement('View');
      nav.appendChild(window);
      expect(nav.titaniumView.window).toBeUndefined();
    });
  });
});
