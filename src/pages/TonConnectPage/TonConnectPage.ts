import { Wallet, WalletInfoWithOpenMethod } from '@tonconnect/ui';

import { Page } from '@/components/Page/Page';
import { TonConnectButton } from '@/components/TonConnectButton/TonConnectButton';
import { DisplayData, type DisplayDataRow } from '@/components/DisplayData/DisplayData';
import { WalletProvider } from '@/components/WalletProvider/WalletProvider';
import { PageComponent } from '@/pages/PageComponent';
import type { AppContext } from '@/context/types';

import './styles.css';

const DISCLAIMER_TEXT = 'To display the data related to the TON Connect, it is required to connect your wallet.';

export class TonConnectPage extends PageComponent {
  private readonly dd: DisplayData;
  private readonly walletProvider: WalletProvider;
  private readonly tonConnectButton: TonConnectButton;
  private readonly tonConnectButtonId = 'ton-connect-button';
  private connectedWallet: Wallet | (Wallet & WalletInfoWithOpenMethod) | null = null;
  private unsubscribe = () => { };

  constructor(private readonly context: AppContext) {
    super(new Page({ title: 'TON Connect' }));
    this.dd = new DisplayData({ rows: this.computeRows() });
    this.walletProvider = new WalletProvider({ context, class: 'ton-connect-page__provider' });
    this.tonConnectButton = new TonConnectButton({ id: this.tonConnectButtonId, class: 'ton-connect-page__button-container' });

    this
      .page
      .setDisclaimer([DISCLAIMER_TEXT])
      .appendChild(this.walletProvider.element())
      .appendChild(this.dd.element())
      .appendChild(this.tonConnectButton.element());
  }

  init() {
    // Have to wait until TON Connect button root is mounted in DOM
    setTimeout(() => {
      this.context.tonConnectUI.uiOptions = {
        buttonRootId: this.tonConnectButtonId,
      };
      this.unsubscribe = this.context.tonConnectUI.onStatusChange(this.onWalletChange);
      this.context.tonConnectUI.wallet && this.onWalletChange(this.context.tonConnectUI.wallet);
    }, 0);
  }

  destroy() {
    this.unsubscribe();
    this.context.tonConnectUI.uiOptions = {
      buttonRootId: null,
    };
  }

  private computeRows(): DisplayDataRow[] {
    if (this.connectedWallet === null) {
      return [];
    }

    return [
      { title: 'Address', value: this.connectedWallet.account.address },
      { title: 'Chain', value: this.connectedWallet.account.chain },
      { title: 'Public Key', value: this.connectedWallet.account.publicKey },
    ];
  }

  private onWalletChange = (walletInfo: Wallet | (Wallet & WalletInfoWithOpenMethod) | null) => {
    this.connectedWallet = walletInfo;
    this.dd.setRows(this.computeRows());

    if (!walletInfo) {
      this.page.setDisclaimer([DISCLAIMER_TEXT]);
      this.walletProvider.setWallet(walletInfo);
      return;
    }

    this.page.setDisclaimer([]);

    if ('imageUrl' in walletInfo) {
      this.walletProvider.setWallet(walletInfo);
    }
  }
}