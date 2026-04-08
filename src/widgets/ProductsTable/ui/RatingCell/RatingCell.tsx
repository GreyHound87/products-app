import { Typography } from 'antd'

const RATING_ERROR_THRESHOLD = 3.5

interface RatingCellProps {
  rating: number
}

export const RatingCell = ({ rating }: RatingCellProps) => (
  <Typography.Text type={rating < RATING_ERROR_THRESHOLD ? 'danger' : undefined}>
    {Math.round(rating * 10) / 10}/5
  </Typography.Text>
)
