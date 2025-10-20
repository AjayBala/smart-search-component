import { newSpecPage } from '@stencil/core/testing';
import { SmartSearch } from '../smart-search';

describe('smart-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SmartSearch],
      html: `<smart-search></smart-search>`,
    });
    expect(page.root).toEqualHtml(`
      <smart-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </smart-search>
    `);
  });
});
