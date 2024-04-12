import Footer from './slots/Footer';
import type { IAllThemeConfig } from './types';
import Loading from './common/Loading';
import HomeBaseLayout from './builtins/HomeBaseLayout';
import GlobalLayout from './layouts/GlobalLayout';

/**
 * @description provider declaration of config files
 * @param {ThemeConfig} config theme config
 * @returns {ThemeConfig}
 */
export function defineThemeConfig(config: IAllThemeConfig): IAllThemeConfig {
  return config;
}

export { Loading, Footer, HomeBaseLayout, GlobalLayout };
