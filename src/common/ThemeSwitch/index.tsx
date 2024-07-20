import { FloatButton } from 'antd';
import { CompactTheme, DarkTheme } from 'antd-token-previewer/lib/icons';
import { FormattedMessage } from 'dumi';
import React from 'react';
import ThemeIcon from './ThemeIcon';
import useThemeAnimation from '../../hooks/useThemeAnimation';

export type ThemeName = 'light' | 'dark' | 'compact';

export type ThemeSwitchProps = {
  value?: ThemeName[];
  onChange: (value: ThemeName[]) => void;
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = (props: ThemeSwitchProps) => {
  const { value = ['light'], onChange } = props;
  const toggleAnimationTheme = useThemeAnimation();
  const isDark = value.includes('dark');
  return (
    <FloatButton.Group trigger="click" icon={<ThemeIcon />}>
      <FloatButton
        icon={<DarkTheme />}
        type={isDark ? 'primary' : 'default'}
        onClick={async (e) => {
          // Toggle animation when switch theme
          toggleAnimationTheme(e, isDark);
          await new Promise((resolve) => {
            setTimeout(resolve, 1000 / 60);
          });
          if (isDark) {
            onChange(value.filter((theme) => theme !== 'dark'));
          } else {
            onChange([...value, 'dark']);
          }
        }}
        tooltip={<FormattedMessage id="app.theme.switch.dark" />}
      />
      <FloatButton
        icon={<CompactTheme />}
        type={value.includes('compact') ? 'primary' : 'default'}
        onClick={() => {
          if (value.includes('compact')) {
            onChange(value.filter((item) => item !== 'compact'));
          } else {
            onChange([...value, 'compact']);
          }
        }}
        tooltip={<FormattedMessage id="app.theme.switch.compact" />}
      />
    </FloatButton.Group>
  );
};

export default ThemeSwitch;
