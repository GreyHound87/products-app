import { Typography } from 'antd'

export interface ProductsPaginationTotalProps {
  total: number
  range: [number, number]
}

export const ProductsPaginationTotal = ({ total, range }: ProductsPaginationTotalProps) => {
  const [from, to] = range

  return (
    <Typography.Text>
      <Typography.Text type='secondary'>Показано </Typography.Text>
      {total === 0 ? '0' : `${String(from)}-${String(to)}`}
      <Typography.Text type='secondary'> из </Typography.Text>
      {total}
    </Typography.Text>
  )
}
