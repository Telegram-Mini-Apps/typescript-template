import { Page } from '@/components/Page/Page';
import { Link } from '@/components/Link/Link';
import { DisplayData } from '@/components/DisplayData/DisplayData';
import { PageComponent } from '@/pages/PageComponent';
import type { AppContext } from '@/context/types';

export class LaunchParamsPage extends PageComponent {
  constructor(context: AppContext) {
    super(new Page({ title: 'Launch Params' }));
    const { launchParams: lp } = context;
    this
      .page
      .setDisclaimer([
        'This page displays application ',
        new Link({
          href: 'https://docs.telegram-mini-apps.com/platform/launch-parameters',
        }, context)
          .appendChild('launch parameters')
          .element(),
        '.',
      ])
      .appendChild(
        new DisplayData({
          rows: [
            { title: 'tgWebAppPlatform', value: lp.platform },
            { title: 'tgWebAppShowSettings', value: lp.showSettings },
            { title: 'tgWebAppVersion', value: lp.version },
            { title: 'tgWebAppBotInline', value: lp.botInline },
            { title: 'tgWebAppStartParam', value: lp.startParam },
            {
              title: 'tgWebAppData',
              value: new Link({ href: '/init-data' }, context)
                .appendChild('View')
                .element(),
            },
            {
              title: 'tgWebAppThemeParams',
              value: new Link({ href: '/theme-params' }, context)
                .appendChild('View')
                .element(),
            }],
        }).element(),
      );
  }
}