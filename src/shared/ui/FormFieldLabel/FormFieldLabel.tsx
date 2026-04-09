import type { ReactNode } from 'react'

import styles from './FormFieldLabel.module.scss'

interface FormFieldLabelProps {
  children: ReactNode
}

export const FormFieldLabel = ({ children }: FormFieldLabelProps) => (
  <span className={styles.label}>{children}</span>
)
