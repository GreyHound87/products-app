import { App } from 'antd'

export const AntdAppProvider = ({ children }: { children: React.ReactNode }) => (
  <App>{children}</App>
)
