import { isNavPathActive } from './isNavPathActive';

describe('isNavPathActive', () => {
  it('treats home as only /', () => {
    expect(isNavPathActive('/', '/')).toBe(true);
    expect(isNavPathActive('/projects', '/')).toBe(false);
  });
  it('matches route prefix', () => {
    expect(isNavPathActive('/projects/foo', '/projects')).toBe(true);
  });
  it('strips query and hash', () => {
    expect(isNavPathActive('/projects#x', '/projects')).toBe(true);
  });
});
