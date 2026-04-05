import { ConfigProvider } from 'antd'

import { AntdAppProvider } from './providers/AntdAppProvider'
import { AppRouterProvider } from './providers/AppRouterProvider'

export const App = () => {
  return (
    <ConfigProvider theme={{ cssVar: {} }}>
      <AntdAppProvider>
        <AppRouterProvider />
      </AntdAppProvider>
    </ConfigProvider>
  )
}
