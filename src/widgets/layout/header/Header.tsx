import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, message } from 'antd';
import { 
  UserOutlined, 
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined 
} from '@ant-design/icons';
import { useAuth } from '@/entities/auth';
import styles from './Header.module.scss';
import authStyles from '@/entities/auth/ui/styles/auth.module.scss';
import { ThemeToggle } from '@/features/theme-toggle/ui/ThemeToggle';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  showTrigger?: boolean;
}

export const Header = ({ collapsed, onCollapse, showTrigger = false }: HeaderProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
      messageApi.success('Successfully logged out!');
      navigate('/login');
    } else if (key === 'profile') {
      navigate('/profile');
    }
  };

  const userMenu = {
    items: [
      {
        key: 'profile',
        label: 'Profile Settings',
        icon: <SettingOutlined />,
      },
      {
        key: 'logout',
        label: 'Logout',
        danger: true,
      },
    ],
    onClick: handleMenuClick,
  };

  const isAuthPage = location.pathname.includes('login') || location.pathname.includes('register');

  return (
    <header className={`${styles.header} ${isAuthPage ? styles.authHeader : ''}`}>
      {contextHolder}
      <div className={styles.nav}>
        {showTrigger ? (
          <div className={styles.headerStart}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => onCollapse(!collapsed)}
              className={styles.trigger}
            />
            {isAuthPage && (
              <span className={styles.mobileTitle}>NewsApp</span>
            )}
          </div>
        ) : (
          <div className={styles.placeholder} />
        )}
        <Link to="/" className={styles.logo}>
          NewsApp
        </Link>
        <div className={styles.auth}>
          <ThemeToggle />
          {isAuthenticated ? (
            <Dropdown menu={userMenu} placement="bottomRight">
              <Button 
                icon={<UserOutlined />}
                className={authStyles.authButton}
              >
                {user?.nickname}
              </Button>
            </Dropdown>
          ) : (
            <>
              <Button 
                type="default"
                onClick={() => navigate('/login')}
                className={authStyles.authButton}
              >
                Login
              </Button>
              <Button
                type="primary"
                onClick={() => navigate('/register')}
                className={authStyles.authButton}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}; 