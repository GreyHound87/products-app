import { Button, Flex } from 'antd'

import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'

import styles from './ActionsCell.module.scss'

export const ActionsCell = () => (
  <Flex gap={8} justify='center'>
    <Button
      type='primary'
      size='small'
      icon={<PlusOutlined />}
      className={styles.addButton}
      styles={{ root: { width: 52, minWidth: 52 } }}
    />
    <Button shape='circle' size='small' icon={<EllipsisOutlined className={styles.moreIcon} />} />
  </Flex>
)
