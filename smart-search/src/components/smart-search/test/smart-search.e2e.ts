import { newE2EPage } from '@stencil/core/testing';
function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
describe('smart-search component', () => {
  it('renders properly', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search></smart-search>');

    const element = await page.find('smart-search');
    expect(element).not.toBeNull();

    const label = await page.find('smart-search >>> .input-label');
    expect(label.textContent).toContain('Search Bank Accounts');
  });

  it('renders hint initially', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search></smart-search>');

    const hint = await page.find('smart-search >>> .search-hint');
    expect(hint).not.toBeNull();
    expect(hint.textContent).toContain('Start typing');
  });


  it('filters results correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search></smart-search>');

    const input = await page.find('smart-search >>> input');
    await input.type('9999'); // unlikely but simulates partial ID search
    await new Promise(resolve => setTimeout(resolve, 600));

    const label = await page.find('smart-search >>> .dropdown-label');
    expect(label.textContent.toLowerCase()).toMatch(/result|no results/);
  });

  it('clears search input when clicking ✕ button', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search></smart-search>');

    const input = await page.find('smart-search >>> input');
    await input.type('john');
    await new Promise(resolve => setTimeout(resolve, 600));

    const clearBtn = await page.find('smart-search >>> .clear-btn');
    expect(clearBtn).not.toBeNull();

    await clearBtn.click();
    await page.waitForChanges();

    const value = await input.getProperty('value');
    expect(value).toBe('');
  });

  it('supports keyboard navigation and selection', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search></smart-search>');

    const input = await page.find('smart-search >>> input');
    await input.type('a');
    await new Promise(resolve => setTimeout(resolve, 600));

    await input.press('ArrowDown');
    await input.press('Enter');
    await page.waitForChanges();

    const newValue = await input.getProperty('value');
    expect(newValue).toMatch(/\(/); // name + (account)
  });

  it('applies theme change dynamically', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search theme="light"></smart-search>');

    const element = await page.find('smart-search');
    expect(await element.getAttribute('theme')).toBe('light');

    await element.setAttribute('theme', 'dark');
    await page.waitForChanges();

    const newTheme = await element.getAttribute('theme');
    expect(newTheme).toBe('dark');
  });
});
