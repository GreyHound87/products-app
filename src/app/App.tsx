import type { CSSProperties } from 'react'

import { ConfigProvider } from 'antd'

import { AntdAppProvider } from './providers/AntdAppProvider'
import { AppRouterProvider } from './providers/AppRouterProvider'
import { appTheme } from './theme.tokens'

const appCssVars = {
  display: 'contents',
  '--app-selection-accent': appTheme.selectionAccent,
} as CSSProperties

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        cssVar: {},
        token: {
          colorPrimary: appTheme.colorPrimary,
          colorLink: appTheme.colorLink,
        },
        components: {
          Checkbox: {
            colorPrimary: appTheme.selectionAccent,
          },
          Pagination: {
            itemActiveBg: appTheme.paginationItemActiveBg,
            itemActiveColor: appTheme.paginationItemActiveColor,
            itemActiveColorHover: appTheme.paginationItemActiveColor,
          },
          Table: {
            rowSelectedBg: 'transparent',
            rowSelectedHoverBg: 'var(--ant-table-row-hover-bg)',
          },
        },
      }}
    >
      <div style={appCssVars}>
        <AntdAppProvider>
          <AppRouterProvider />
        </AntdAppProvider>
      </div>
    </ConfigProvider>
  )
}
