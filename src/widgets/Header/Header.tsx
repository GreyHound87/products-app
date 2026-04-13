import { useSearchParams } from 'react-router-dom'

import { Button, Flex, Input, Layout, Space, Typography } from 'antd'

import {
  BellOutlined,
  ControlOutlined,
  GlobalOutlined,
  MailOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import { useRouteHandle } from '@/shared/hooks/useRouteHandle'

import styles from './Header.module.scss'

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const handle = useRouteHandle()

  const title = handle.title ?? ''
  const showSearch = handle.search === true
  const q = searchParams.get('q') ?? ''

  const handleSearchChange = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) {
          next.set('q', value)
        } else {
          next.delete('q')
        }
        next.delete('page')
        return next
      },
      { replace: true },
    )
  }

  return (
    <Layout.Header className={styles.header}>
      <Flex align='center' gap={16}>
        <Typography.Title level={3} className={styles.title}>
          {title}
        </Typography.Title>

        <Flex flex={1} justify='center' align='center'>
          {showSearch && (
            <Input
              className={styles.searchInput}
              prefix={<SearchOutlined className={styles.searchIcon} />}
              value={q}
              onChange={(e) => {
                handleSearchChange(e.target.value)
              }}
              placeholder='Найти'
              allowClear
            />
          )}
        </Flex>

        <Space size={4}>
          <Button type='text' icon={<GlobalOutlined />} aria-label='Язык' />
          <Button type='text' icon={<BellOutlined />} aria-label='Уведомления' />
          <Button type='text' icon={<MailOutlined />} aria-label='Сообщения' />
          <Button type='text' icon={<ControlOutlined />} aria-label='Настройки' />
        </Space>
      </Flex>
    </Layout.Header>
  )
}
