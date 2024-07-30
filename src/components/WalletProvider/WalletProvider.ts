import $ from 'jquery';
import { WalletInfoBase } from '@tonconnect/ui';
import { classNames } from '@telegram-apps/sdk';

import { Link } from '@/components/Link/Link';
import { AppContext } from '@/context/types';

import './styles.css';

export class WalletProvider {
  private context: AppContext;
  private readonly el: JQuery<HTMLDivElement>;
  private readonly img: JQuery<HTMLImageElement>;

  constructor({ context, class: className }: { context: AppContext, class?: string }) {
    this.context = context;
    this.img = $<HTMLImageElement>('<img class="wallet-provider__image" height="60" width="60">')
      .attr('alt', 'Provider logo');
    this.el = $<HTMLDivElement>('<div/>')
      .attr('class', classNames(className, 'wallet-provider'))
      .attr('style', 'display: none;');
  }

  setWallet(wallet: WalletInfoBase | null): void {
    if (!wallet) {
      this.el.attr('style', 'display: none;');
      this.el.empty();
      return;
    } else {
      this.el.attr('style', '');
      this.el.append([
        this.img.attr('src', wallet.imageUrl),
        $('<div class="wallet-provider__meta"/>')
          .append([
            $('<p class="wallet-provider__wallet-name"/>')
              .append(`${wallet.name}&nbsp;`)
              .append($('<span class="wallet-provider__app-name"/>').append(`(${wallet.appName})`)),
            new Link({ href: wallet.aboutUrl }, this.context).appendChild('About connected wallet').element(),
          ])
      ])
    }
  }

  element() {
    return this.el[0];
  }
}