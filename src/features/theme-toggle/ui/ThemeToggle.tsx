import { FC } from 'react';
import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/shared/hooks';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle: FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      type="text"
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    />
  );
}; 