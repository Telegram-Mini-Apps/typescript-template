import $ from 'jquery';
import { classNames } from '@telegram-apps/sdk';

export class TonConnectButton {
  private readonly el: JQuery<HTMLDivElement>;

  constructor({ id, class: className }: { id: string, class?: string }) {
    this.el = $<HTMLDivElement>('<div/>')
      .attr('class', classNames(className))
      .append($('<div style="width: fit-content;"/>').attr('id', id));
  }

  element(): HTMLDivElement {
    return this.el[0]
  }
}