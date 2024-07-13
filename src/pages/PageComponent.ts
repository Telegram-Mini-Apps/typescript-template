import $ from 'jquery';

import { Page } from '@/components/Page/Page';

export class PageComponent {
  constructor(protected readonly page: Page) {
  }

  render(root: HTMLElement): void {
    $(root).empty().append(this.page.element());
  }
}