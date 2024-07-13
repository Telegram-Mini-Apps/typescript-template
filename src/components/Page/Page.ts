import $ from 'jquery';

import { toArray } from '@/utils/toArray';
import { filterChildren } from '@/utils/filterChildren';
import type { Children, MaybeChild } from '@/types';

import './styles.css';

export class Page {
  private readonly el: JQuery<HTMLDivElement>;
  private disclaimer?: JQuery<HTMLDivElement>;

  constructor({ title }: { title: string }) {
    this.el = $<HTMLDivElement>('<div class="page"/>').append($('<h1/>').text(title));
  }

  appendChild(...children: MaybeChild[]): this {
    this.el.append(...filterChildren(children));
    return this;
  }

  element(): HTMLDivElement {
    return this.el[0];
  }

  setDisclaimer(disclaimer: Children): this {
    if (this.disclaimer) {
      this.disclaimer.empty().append(...toArray(disclaimer));
    } else {
      this.disclaimer = $<HTMLDivElement>('<div class="page__disclaimer"/>')
        .append(...toArray(disclaimer))
        .insertAfter(this.el.children('h1'));
    }
    return this;
  }
}
