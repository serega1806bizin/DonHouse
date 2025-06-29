/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { useRef } from 'react';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import styles from './RegisterForeman.module.css';
import { Form, Input, Button, message } from 'antd';

interface FormValues {
  id: number;
  name: string;
  surname: string;
  phone?: string;
  telegram?: string;
  otherContacts?: string;
}

export const RegisterForeman = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm<FormValues>();

  useClickOutside(ref, onClose);

  const onFinish = (values: FormValues) => {
    if (!values.otherContacts) {
      delete values.otherContacts;
    }

    if (!values.phone) {
      delete values.phone;
    }

    console.log('✅ Успешно отправлено:', values);
    onClose();
    message.success('Прораб успешно зарегистрирован');
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('❌ Ошибка:', errorInfo);
  };

  const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Если удалили всё, вернуть @
    if (value === '') {
      form.setFieldValue('telegram', '@');

      return;
    }

    // Если не начинается с @, добавить
    if (!value.startsWith('@')) {
      value = '@' + value.replace(/@/g, '');
    }

    form.setFieldValue('telegram', value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={ref}>
        <h2 className={styles.modal__title}>Регистрация прораба</h2>
        <Form
          form={form}
          layout="vertical"
          name="create-foreman"
          initialValues={{
            id: Date.now(),
            name: '',
            surname: '',
            phone: '',
            telegram: '@',
            otherContacts: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<b className={styles.label}>Фамилия</b>}
            name="surname"
            rules={[{ required: true }]}
          >
            <Input placeholder="Петров" />
          </Form.Item>

          <Form.Item
            label={<b className={styles.label}>Имя</b>}
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Даниил" />
          </Form.Item>

          <Form.Item
            label={<b className={styles.label}>Номер телефона</b>}
            name="phone"
            rules={[
              {
                pattern: /^\+7\d{10}$/,
                message: 'Номер должен начинаться с +7 и содержать 10 цифр',
              },
            ]}
          >
            <Input
              placeholder="+7..."
              maxLength={12}
              onClick={e => {
                const input = e.target as HTMLInputElement;

                if (!input.value) {
                  input.value = '+7';
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label={<b className={styles.label}>Telegram ник</b>}
            name="telegram"
            rules={[
              {
                required: true,
                message: 'Ник Telegram обязателен',
              },
              {
                validator: (_, value) => {
                  if (value === '@' || value.length < 2) {
                    return Promise.reject(new Error('Введите имя после @'));
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              placeholder="@example"
              onChange={handleTelegramChange}
              onClick={e => {
                const input = e.target as HTMLInputElement;

                if (input.selectionStart !== null && input.selectionStart < 1) {
                  input.setSelectionRange(1, 1);
                }
              }}
              onKeyDown={e => {
                const input = e.currentTarget;

                if (
                  (e.key === 'ArrowLeft' || e.key === 'Backspace') &&
                  input.selectionStart !== null &&
                  input.selectionStart <= 1
                ) {
                  e.preventDefault();
                  input.setSelectionRange(1, 1);
                }
              }}
            />
          </Form.Item>

          <Form.Item label={<b className={styles.label}>Другие контакты</b>}>
            <Input.TextArea placeholder="Email, Viber и т.п." />
          </Form.Item>

          <div className={styles.buttons}>
            <Button className={styles.cancelButton} onClick={onClose}>
              Отмена
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.createButton}
            >
              Сохранить
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
