import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { Layout as AntLayout, Menu, Drawer } from 'antd';
import {
  HomeOutlined,
  CompassOutlined,
  HeartOutlined,
  BookOutlined,
  GlobalOutlined,
  SearchOutlined,
  CloseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Header } from '../header';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import styles from './Layout.module.scss';

const { Sider, Content } = AntLayout;

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/explore',
      icon: <CompassOutlined />,
      label: 'Explore',
    },
    {
      key: '/search',
      icon: <SearchOutlined />,
      label: 'Search',
    },
    {
      key: '/favorites',
      icon: <HeartOutlined />,
      label: 'Favorites',
    },
    {
      key: '/read-later',
      icon: <BookOutlined />,
      label: 'Read Later',
    },
    {
      key: '/regions',
      icon: <GlobalOutlined />,
      label: 'Regions',
    },
  ];

  const menuContent = (
    <Menu
      mode="inline"
      items={menuItems}
      onClick={({ key }) => {
        navigate(key);
        if (isMobile) {
          setMobileOpen(false);
        }
      }}
      className={styles.menu}
    />
  );

  return (
    <div className={styles.layout}>
      <AntLayout hasSider>
        {!isMobile ? (
          <Sider
            className={styles.sider}
            theme="light"
            collapsed={collapsed}
            trigger={null}
            width={200}
          >
            <div className={styles.siderContent}>
              {menuContent}
              <div 
                className={styles.trigger}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </div>
          </Sider>
        ) : (
          <Drawer
            placement="left"
            onClose={() => setMobileOpen(false)}
            open={mobileOpen}
            closable={true}
            closeIcon={<CloseOutlined />}
            className={styles.mobileDrawer}
            width="90%"
            bodyStyle={{ padding: 0 }}
          >
            {menuContent}
          </Drawer>
        )}
        <AntLayout>
          <Header 
            collapsed={collapsed} 
            onCollapse={isMobile ? () => setMobileOpen(true) : setCollapsed}
            showTrigger={isMobile}
          />
          <Content className={styles.content}>
            <main className={styles.main}>
              {children}
            </main>
          </Content>
        </AntLayout>
      </AntLayout>
    </div>
  );
}; 