import {
  initWeb,
  isIframe,
  retrieveLaunchParams,
  setDebug,
} from '@telegram-apps/sdk';

import { mockEnv } from '@/mockEnv.js';
import { type RoutePage, routes } from '@/navigation/routes';
import { initComponents } from '@/initComponents';
import { initNavigator } from '@/initNavigator';
import { initTonConnectUI } from '@/initTonConnectUI';
import type { AppContext } from '@/context/types.js';

import './index.css';

if (import.meta.env.DEV) {
  // It is important, to mock the environment only for development purposes. When building the
  // application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
  // so you will not see it in your final bundle.
  mockEnv();
}

const launchParams = retrieveLaunchParams();

// Launch eruda and enable SDK debug mode, if debug mode was requested outside.
const debug = launchParams.startParam === 'debug';
if (debug) {
  import('eruda').then((lib) => lib.default.init());
  setDebug(debug);
}

// The web version of Telegram is capable of sending some specific CSS styles we would
// like to catch.
if (isIframe()) {
  initWeb(true);
}

const {
  miniApp,
  viewport,
  utils,
  themeParams,
  initData,
} = await initComponents();
const navigator = await initNavigator();
const tonConnectUI = initTonConnectUI();

const root = document.getElementById('root')!;
const appContext: AppContext = {
  initData,
  launchParams,
  miniApp,
  navigator,
  themeParams,
  utils,
  viewport,
  tonConnectUI,
};
let prevPage: RoutePage;

function renderCurrentRoute() {
  const route = routes.find(r => r.pathname === navigator.pathname);
  if (!route) {
    navigator.replace('/');
    return;
  }
  prevPage && prevPage.destroy && prevPage.destroy();
  prevPage = new route.Page(appContext);
  prevPage.init && prevPage.init();
  prevPage.render(root);
}

navigator.on('change', renderCurrentRoute);
renderCurrentRoute();
