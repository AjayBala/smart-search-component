import { newE2EPage } from '@stencil/core/testing';

describe('smart-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<smart-search></smart-search>');

    const element = await page.find('smart-search');
    expect(element).toHaveClass('hydrated');
  });
});
