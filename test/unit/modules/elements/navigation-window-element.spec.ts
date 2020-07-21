import { NavigationWindowElement } from 'vdom/index';

import { createElement } from '../../helpers';

describe('NavigationWindow', () => {
  describe('constructor', () => {
    it('should configure element', () => {
      const nav = new NavigationWindowElement();
      expect(nav.tagName).toBe('NAVIGATION-WINDOW');
      expect(nav.meta).toEqual({
        typeName: 'Ti.UI.NavigationWindow',
        detached: true
      });
    });
  });

  describe('insertChild', () => {
    it('should set window attribute', () => {
      const nav = new NavigationWindowElement();
      const window = createElement('Window');
      nav.appendChild(window);
      expect(nav.getAttribute('window')).toBe(window.titaniumView);
    });
  });
});
