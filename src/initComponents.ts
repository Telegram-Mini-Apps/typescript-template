import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initInitData,
  initMiniApp,
  initThemeParams,
  initUtils,
  initViewport,
} from '@telegram-apps/sdk';

export async function initComponents() {
  const [miniApp] = initMiniApp();
  const [themeParams] = initThemeParams();
  const utils = initUtils();
  const initData = initInitData();
  const [viewportPromise] = initViewport();

  const viewport = await viewportPromise;

  // Generate Mini Apps related CSS-variables and track their changes.
  bindMiniAppCSSVars(miniApp, themeParams);
  bindThemeParamsCSSVars(themeParams);
  bindViewportCSSVars(viewport);

  return {
    initData,
    miniApp,
    themeParams,
    utils,
    viewport,
  };
}