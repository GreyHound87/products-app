import { Checkbox, Form, Input, Typography } from 'antd'

import { CloseOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'

import { FormFieldLabel } from '@/shared/ui/FormFieldLabel'

import styles from './LoginFormFields.module.scss'

const LoginFormFields = () => (
  <>
    <Form.Item
      name='username'
      label={<FormFieldLabel>Логин</FormFieldLabel>}
      rules={[{ required: true, message: 'Введите логин' }]}
    >
      <Input
        prefix={<UserOutlined className={styles.prefixIcon} />}
        placeholder='Введите логин'
        allowClear={{ clearIcon: <CloseOutlined /> }}
      />
    </Form.Item>

    <Form.Item
      name='password'
      label={<FormFieldLabel>Пароль</FormFieldLabel>}
      rules={[{ required: true, message: 'Введите пароль' }]}
    >
      <Input.Password
        prefix={<LockOutlined className={styles.prefixIcon} />}
        placeholder='Введите пароль'
      />
    </Form.Item>

    <Form.Item name='remember' valuePropName='checked'>
      <Checkbox>
        <Typography.Text type='secondary' className={styles.checkboxText}>
          Запомнить данные
        </Typography.Text>
      </Checkbox>
    </Form.Item>
  </>
)

export default LoginFormFields
