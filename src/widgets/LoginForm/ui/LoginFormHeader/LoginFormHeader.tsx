import { Flex, Typography } from 'antd'

import { LogoIcon } from '@/shared/ui'

import styles from './LoginFormHeader.module.scss'

const LoginFormHeader = () => (
  <Flex vertical align='center' className={styles.header}>
    <Flex justify='center' align='center' className={styles.logoOuter}>
      <Flex justify='center' align='center' className={styles.logoInner}>
        <LogoIcon />
      </Flex>
    </Flex>

    <Typography.Title level={2} className={styles.title}>
      Добро пожаловать!
    </Typography.Title>
    <Typography.Text type='secondary' className={styles.subtitle}>
      Пожалуйста, авторизируйтесь
    </Typography.Text>
  </Flex>
)

export default LoginFormHeader
