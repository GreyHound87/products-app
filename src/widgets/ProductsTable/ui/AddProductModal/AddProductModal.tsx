import { App, Form, Input, InputNumber, Modal } from 'antd'

import { CloseOutlined } from '@ant-design/icons'

import { FormFieldLabel } from '@/shared/ui/FormFieldLabel'

export interface AddProductFormValues {
  title: string
  price: number
  brand: string
  sku: string
}

export interface AddProductModalProps {
  open: boolean
  onClose: () => void
}

export const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const { message } = App.useApp()
  const [form] = Form.useForm<AddProductFormValues>()

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  const handleOk = () => {
    return form.validateFields().then(() => {
      message.success('Товар успешно добавлен')
      form.resetFields()
      onClose()
    })
  }

  return (
    <Modal
      title='Добавить товар'
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText='Сохранить'
      cancelText='Отмена'
      destroyOnHidden
      mask={{ closable: false }}
    >
      <Form form={form} layout='vertical' preserve={false} requiredMark={false} size='large'>
        <Form.Item
          name='title'
          label={<FormFieldLabel>Наименование</FormFieldLabel>}
          rules={[{ required: true, message: 'Введите наименование' }]}
        >
          <Input
            placeholder='Введите наименование'
            allowClear={{ clearIcon: <CloseOutlined /> }}
            autoComplete='off'
          />
        </Form.Item>
        <Form.Item
          name='price'
          label={<FormFieldLabel>Цена</FormFieldLabel>}
          rules={[
            { required: true, message: 'Введите цену' },
            {
              type: 'number',
              min: 0,
              message: 'Цена не может быть отрицательной',
            },
          ]}
        >
          <InputNumber placeholder='0' min={0} precision={2} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='brand'
          label={<FormFieldLabel>Вендор</FormFieldLabel>}
          rules={[{ required: true, message: 'Введите вендора' }]}
        >
          <Input
            placeholder='Введите вендора'
            allowClear={{ clearIcon: <CloseOutlined /> }}
            autoComplete='off'
          />
        </Form.Item>
        <Form.Item
          name='sku'
          label={<FormFieldLabel>Артикул</FormFieldLabel>}
          rules={[{ required: true, message: 'Введите артикул' }]}
        >
          <Input
            placeholder='Введите артикул'
            allowClear={{ clearIcon: <CloseOutlined /> }}
            autoComplete='off'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
