import { Avatar, Flex, Typography } from 'antd'

interface NameCellProps {
  title: string
  category: string
  thumbnail: string
}

export const NameCell = ({ title, category, thumbnail }: NameCellProps) => (
  <Flex align='center' gap={12}>
    <Avatar shape='square' size={48} src={thumbnail} />
    <Flex vertical gap={2}>
      <Typography.Text strong>{title}</Typography.Text>
      <Typography.Text type='secondary'>{category}</Typography.Text>
    </Flex>
  </Flex>
)
