import type {
  BrowserNavigator,
  InitData,
  LaunchParams,
  MiniApp,
  ThemeParams,
  Utils,
  Viewport,
} from '@telegram-apps/sdk';
import { TonConnectUI } from '@tonconnect/ui';

export interface AppContext {
  initData?: InitData;
  launchParams: LaunchParams;
  miniApp: MiniApp;
  navigator: BrowserNavigator;
  themeParams: ThemeParams;
  utils: Utils;
  viewport: Viewport;
  tonConnectUI: TonConnectUI;
}