import { useRef } from 'react';
import styles from './RegisterProject.module.css';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { Button, DatePicker, Form, Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
// eslint-disable-next-line max-len
import { SelectTelegramGroup } from '../../components/SelectTelegramGroup/SelectTelegramGroup';
import { SelectForeman } from '../../components/SelectForeman/SelectForeman';
moment.locale('ru');

const telegramGroups = [
  { id: 1, name: 'Группа 1' },
  { id: 2, name: 'Группа 2' },
  { id: 3, name: 'Группа 3' },
];

const foremens = [
  { id: 1, fullName: 'Александр Лебедев' },
  { id: 2, fullName: 'Иван Иванов' },
  { id: 3, fullName: 'Пётр Петров' },
  { id: 8, fullName: 'Михаил Сидоров' },
];

interface FormValues {
  id: number;
  id_telegramGroup: number | null;
  id_foreman: number | null;
  start_date: moment.Moment | null;
  end_date: moment.Moment | null;
  description?: string;
}

export const RegisterProject = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm<FormValues>();

  useClickOutside(ref, onClose);
  const onFinish = (values: FormValues) => {
    if (!values.description) {
      // eslint-disable-next-line no-param-reassign
      delete values.description; // Удаляем поле, если оно пустое
    }

    console.log('✅ Успешно отправлено:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('❌ Ошибка:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={ref}>
        <h2 className={styles.modal__title}>Регистрация проекта</h2>
        <Form
          form={form}
          layout="vertical"
          name="register_project"
          initialValues={{
            id: Date.now(),
            id_telegramGroup: null,
            id_foreman: null,
            start_date: null,
            end_date: null,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Поле выбора рабочей группы */}
          <Form.Item
            label={<b className={styles.label}>Рабочая группа</b>}
            name="id_telegramGroup"
            rules={[{ required: true, message: 'Выберите рабочую группу' }]}
          >
            <SelectTelegramGroup
              telegramGroups={telegramGroups}
              value={form.getFieldValue('id_telegramGroup')}
              onChange={val => form.setFieldsValue({ id_telegramGroup: val })}
              placeholder="-- Выберите из списка --"
            />
          </Form.Item>
          {/* Поле выбора прораба */}
          <Form.Item
            label={<b className={styles.label}>Прораб</b>}
            name="id_foreman"
            rules={[{ required: true, message: 'Выберите прораба' }]}
          >
            <SelectForeman
              foremens={foremens}
              value={form.getFieldValue('id_foreman')}
              onChange={val => form.setFieldsValue({ id_foreman: val })}
              placeholder="-- Выберите из списка --"
            />
          </Form.Item>
          {/* Поле для ввода начала проекта */}
          <Form.Item
            label={<b className={styles.label}>Начало</b>}
            name="start_date"
            rules={[{ required: true, message: 'Введите дату начала' }]}
          >
            <DatePicker
              className={styles.datePicker}
              onChange={val => form.setFieldsValue({ start_date: val })}
              value={form.getFieldValue('start_date')}
              format="DD.MM.YYYY"
              placeholder="01.01.2025"
            />
          </Form.Item>
          {/* Поле для ввода описания */}
          <Form.Item
            label={
              <b className={styles.label}>Описание проекта (необязательно)</b>
            }
            name="description"
          >
            <Input.TextArea
              style={{ height: 200 }}
              placeholder="Опишите проект..."
            />
          </Form.Item>
          <div className={styles.buttons}>
            <Button
              className={styles.cancelButton}
              onClick={onClose}
              aria-label="Закрыть"
            >
              Отмена
            </Button>
            <Form.Item className={styles.createButton}>
              <Button
                style={{
                  padding: 0,
                  margin: 0,
                  backgroundColor: '#52c41a',
                  fontWeight: 'bold',
                  color: '#000',
                  border: 'none',
                }}
                type="primary"
                htmlType="submit"
              >
                Создать
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
