import { newSpecPage } from '@stencil/core/testing';
import { SmartSearch } from '../smart-search';

describe('smart-search (unit tests)', () => {
  let component: SmartSearch;

  beforeEach(() => {
    component = new SmartSearch();

    // Initialize fake data (as your component does in componentWillLoad)
    component.componentWillLoad();

    // Provide a safe mock hostEl so scrollHighlightedIntoView() won't throw during tests
    component['hostEl'] = {
      // a minimal shadowRoot mock — querySelector returns null (no-op)
      shadowRoot: {
        querySelector: () => null,
      },
    } as any;
  });

  afterEach(() => {
    // restore timers if any test used fake timers
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should initialize with fake users', () => {
    expect(component.users.length).toBe(20);
    expect(component.filteredUsers.length).toBe(20);
  });

  it('should filter users based on name (debounced)', () => {
    const firstUser = component.users[0];
    const query = firstUser.name.split(' ')[0].toLowerCase();

    jest.useFakeTimers();

    const event = { target: { value: query } } as any;
    component.handleInput(event);

    // advance the 500ms debounce
    jest.advanceTimersByTime(500);

    // after timer advance, filteredUsers should contain matching name
    expect(component.filteredUsers.some(u => u.name.toLowerCase().includes(query))).toBe(true);

    jest.useRealTimers();
  });

  it('should clear search correctly', () => {
    component.searchTerm = 'John';
    component.filteredUsers = [];
    component.showResults = true;

    component.clearSearch();

    expect(component.searchTerm).toBe('');
    expect(component.showResults).toBe(false);
    expect(component.highlightedIndex).toBe(-1);
  });

  it('should update highlighted index on ArrowDown', () => {
    component.filteredUsers = component.users.slice(0, 5);
    component.showResults = true;

    const event = { key: 'ArrowDown', preventDefault: jest.fn() } as any;
    component.handleKeyDown(event);

    expect(component.highlightedIndex).toBe(0);
  });

  it('should move highlight up with ArrowUp', () => {
    component.filteredUsers = component.users.slice(0, 5);
    component.showResults = true;
    component.highlightedIndex = 1;

    const event = { key: 'ArrowUp', preventDefault: jest.fn() } as any;
    component.handleKeyDown(event);

    expect(component.highlightedIndex).toBe(0);
  });

  it('should close dropdown on Escape key', () => {
    component.showResults = true;
    const event = { key: 'Escape', preventDefault: jest.fn() } as any;

    component.handleKeyDown(event);

    expect(component.showResults).toBe(false);
    expect(component.highlightedIndex).toBe(-1);
  });

  it('should select user on Enter', () => {
    const mockUser = { name: 'Alice', account: '12345' } as any;
    component.filteredUsers = [mockUser];
    component.showResults = true;
    component.highlightedIndex = 0;

    const event = { key: 'Enter', preventDefault: jest.fn() } as any;
    component.handleKeyDown(event);

    expect(component.searchTerm).toContain('Alice');
    expect(component.showResults).toBe(false);
  });

  it('should hide dropdown when focus leaves', () => {
    component.showResults = true;

    const event = {
      relatedTarget: null,
      currentTarget: document.createElement('div'),
    } as unknown as FocusEvent;

    component.onFocusOut(event);

    expect(component.showResults).toBe(false);
  });

  it('should render expected structure', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });

    // ensure Stencil has finished rendering
    await page.waitForChanges();

    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();

    const label = page.root.shadowRoot.querySelector('.input-label');
    expect(label.textContent).toContain('Search Bank Accounts');
  });

  it('should react to theme change via @Watch', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    component.handleThemeChange('dark');
    expect(spy).toHaveBeenCalledWith('Theme changed to: dark');
    spy.mockRestore();
  });
});
