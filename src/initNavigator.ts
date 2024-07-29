import { initNavigator as initSDKNavigator } from '@telegram-apps/sdk';

export async function initNavigator() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const navigator = initSDKNavigator<{}>('app-navigator-state');

  // Attach the navigator to the browser history, so it could modify the history and listen to
  // its changes.
  await navigator.attach();
  return navigator;
}