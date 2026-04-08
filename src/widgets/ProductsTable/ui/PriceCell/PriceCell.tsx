import { Typography } from 'antd'

const formatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

interface PriceCellProps {
  price: number
}

export const PriceCell = ({ price }: PriceCellProps) => {
  const formatted = formatter.format(price)
  const commaIndex = formatted.lastIndexOf(',')
  const integer = formatted.slice(0, commaIndex)
  const decimal = formatted.slice(commaIndex)

  return (
    <Typography.Text>
      {integer}
      <Typography.Text type='secondary'>{decimal}</Typography.Text>
    </Typography.Text>
  )
}
