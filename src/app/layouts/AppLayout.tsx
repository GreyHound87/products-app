import { Outlet } from 'react-router-dom'

import { Layout } from 'antd'

import { Header } from '@/widgets/Header'

import styles from './AppLayout.module.scss'

const AppLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout.Content className={styles.content}>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

export default AppLayout
