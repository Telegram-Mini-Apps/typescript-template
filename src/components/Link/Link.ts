import $ from 'jquery';
import { classNames } from '@telegram-apps/sdk';

import type { MaybeChild } from '@/types';
import type { AppContext } from '@/context/types';

import './styles.css';
import { filterChildren } from '@/utils/filterChildren';

export class Link {
  private readonly el: JQuery<HTMLAnchorElement>;

  constructor(
    { href, class: className }: { href: string; class?: string },
    context: AppContext,
  ) {
    const targetUrl = new URL(href, window.location.toString());
    const currentUrl = new URL(window.location.toString());
    const isExternal = targetUrl.protocol !== currentUrl.protocol
      || targetUrl.host !== currentUrl.host;

    this.el = $<HTMLAnchorElement>('<a/>')
      .attr('class', classNames('link', className))
      .attr('href', isExternal ? href : context.navigator.renderPath(href));

    if (isExternal) {
      this.el.on('click', (e) => {
        e.preventDefault();
        context.utils.openLink(targetUrl.toString());
      });
    }
  }

  appendChild(...children: MaybeChild[]): this {
    this.el.append(...filterChildren(children));
    return this;
  }

  element(): HTMLAnchorElement {
    return this.el[0];
  }
}
