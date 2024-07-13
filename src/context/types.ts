import type {
  BrowserNavigator,
  InitData,
  LaunchParams,
  MiniApp,
  ThemeParams,
  Utils,
  Viewport,
} from '@telegram-apps/sdk';

export interface AppContext {
  initData?: InitData;
  launchParams: LaunchParams;
  miniApp: MiniApp;
  navigator: BrowserNavigator;
  themeParams: ThemeParams;
  utils: Utils;
  viewport: Viewport;
}