import type { ComponentProps, SVGProps } from 'react'

import Icon from '@ant-design/icons'

export type SortIconProps = Omit<ComponentProps<typeof Icon>, 'component'>

const line = {
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
}

function AscLinesSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <line x1='9' y1='6' x2='15' y2='6' {...line} />
      <line x1='6' y1='12' x2='18' y2='12' {...line} />
      <line x1='3' y1='18' x2='21' y2='18' {...line} />
    </svg>
  )
}

function DescLinesSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <line x1='3' y1='6' x2='21' y2='6' {...line} />
      <line x1='6' y1='12' x2='18' y2='12' {...line} />
      <line x1='9' y1='18' x2='15' y2='18' {...line} />
    </svg>
  )
}

export function AscIcon(props: SortIconProps) {
  return <Icon component={AscLinesSvg} {...props} />
}

export function DescIcon(props: SortIconProps) {
  return <Icon component={DescLinesSvg} {...props} />
}
