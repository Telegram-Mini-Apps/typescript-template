import { Page } from '@/components/Page/Page';
import { Link } from '@/components/Link/Link';
import { DisplayData, type DisplayDataRow } from '@/components/DisplayData/DisplayData';
import { PageComponent } from '@/pages/PageComponent';
import type { AppContext } from '@/context/types';

export class ThemeParamsPage extends PageComponent {
  private readonly dd: DisplayData;

  constructor(private readonly context: AppContext) {
    super(new Page({ title: 'Theme Params' }));
    this.dd = new DisplayData({ rows: this.computeRows() });
    this
      .page
      .setDisclaimer([
        'This page displays current ',
        new Link({ href: 'https://docs.telegram-mini-apps.com/platform/theming' }, context)
          .appendChild('theme parameters')
          .element(),
        '. It is reactive, so, changing theme externally will lead to this page updates.',
      ])
      .appendChild(this.dd.element());
  }

  private computeRows(): DisplayDataRow[] {
    return Object
      .entries(this.context.themeParams.getState())
      .map(([title, value]) => ({
        title: title
          .replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`)
          .replace(/background/, 'bg'),
        value,
      }));
  }

  private onThemeChange = () => {
    this.dd.setRows(this.computeRows());
  };

  init() {
    this.context.themeParams.on('change', this.onThemeChange);
  }

  destroy() {
    this.context.themeParams.off('change', this.onThemeChange);
  }
}