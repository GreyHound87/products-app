import { App as AntdApp, ConfigProvider } from 'antd';
import { AppRouterProvider } from './providers/AppRouterProvider';

export const App = () => {
  return (
    <ConfigProvider theme={{ cssVar: true }}>
      <AntdApp>
        <AppRouterProvider />
      </AntdApp>
    </ConfigProvider>
  );
};
