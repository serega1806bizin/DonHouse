/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import styles from './CreateTask.module.css';
import { Form, Button, DatePicker, Input, Upload, Modal, message } from 'antd';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useRef, useState } from 'react';
import { SelectProject } from '../../components/SelectProject/SelectProject';

import moment from 'moment';

// Устанавливаем локализацию для Moment.js
moment.locale('ru');

// Типы данных для формы
interface FormValues {
  id: number;
  id_project: number | null;
  start_date: moment.Moment | null;
  end_date: moment.Moment | null;
  title: string;
  decription: string;
  photos: File[];
  id_foreman: number | null;
  color: string;
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

// const masters = [
//   { id: 1, fullName: 'Александр Лебедев', isBusy: false },
//   { id: 2, fullName: 'Иван Иванов', isBusy: true },
//   { id: 3, fullName: 'Пётр Петров', isBusy: false },
//   { id: 8, fullName: 'Михаил Сидоров', isBusy: true },
// ];

const projects = [
  { id: 1, telegramGroup: { id: 1, name: 'Группа 1' } },
  { id: 2, telegramGroup: { id: 2, name: 'Группа 2' } },
  { id: 3, telegramGroup: { id: 3, name: 'Группа 3' } },
];

export const CreateTask = ({ onClose }: { onClose: () => void }) => {
  const [form] = Form.useForm<FormValues>();
  const ref = useRef<HTMLDivElement>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useClickOutside(ref, onClose);

  const onFinish = (values: FormValues) => {
    console.log('✅ Успешно отправлено:', values);
    onClose();
    message.success('Задача успешно создана!');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinishFailed = (errorInfo: any) => {
    console.error('❌ Ошибка:', errorInfo);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const handleCancel = () => setPreviewOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.modal} ref={ref}>
        <h2 className={styles.modal__title}>Новая задача</h2>

        <Form
          form={form}
          layout="vertical"
          name="create_task"
          initialValues={{
            id: Date.now(),
            id_project: null,
            start_date: null,
            end_date: null,
            title: '',
            decription: '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Поле выбора проекта */}
          <Form.Item
            label={<b className={styles.label}>Проект</b>}
            name="id_project"
            rules={[{ required: true, message: 'Выберите проект' }]}
          >
            <SelectProject
              projects={projects}
              value={form.getFieldValue('id_project')}
              onChange={val => form.setFieldsValue({ id_project: val })}
              placeholder="-- Выберите из списка --"
            />
          </Form.Item>
          {/* Поле выбора даты начала */}
          <Form.Item
            label={<b className={styles.label}>Начало</b>}
            name="start_date"
            rules={[
              { required: true, message: 'Введите дату начала' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    !getFieldValue('end_date') ||
                    value.isBefore(getFieldValue('end_date'))
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error('Дата начала не может быть позже даты конца'),
                  );
                },
              }),
            ]}
          >
            <DatePicker
              className={styles.datePicker}
              onChange={val => form.setFieldsValue({ start_date: val })}
              value={form.getFieldValue('start_date')}
              format="DD.MM.YYYY"
              placeholder="01.01.2025"
            />
          </Form.Item>
          <Form.Item
            label={<b className={styles.label}>Конец</b>}
            name="end_date"
            rules={[
              { required: true, message: 'Введите дату конца' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    !getFieldValue('start_date') ||
                    value.isAfter(getFieldValue('start_date'))
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error('Дата конца не может быть раньше даты начала'),
                  );
                },
              }),
            ]}
          >
            <DatePicker
              className={styles.datePicker}
              onChange={val => form.setFieldsValue({ end_date: val })}
              value={form.getFieldValue('end_date')}
              format="DD.MM.YYYY"
              placeholder="07.01.2025"
            />
          </Form.Item>
          {/* Поле ввода заголовка */}
          <Form.Item
            label={<b className={styles.label}>Короткое название задачи</b>}
            name="title"
            rules={[{ required: true, message: 'Введите заголовок задачи' }]}
          >
            <Input
              style={{ height: 40 }}
              placeholder="Например, 'Покраска фасада'"
            />
          </Form.Item>
          {/* Поле ввода описания */}
          <Form.Item
            label={<b className={styles.label}>Что нужно сделать?</b>}
            name="description"
            rules={[{ required: true, message: 'Введите описание' }]}
          >
            <Input.TextArea
              style={{ height: 100 }}
              placeholder="Опишите задачу..."
            />
          </Form.Item>
          <Form.Item
            label={<b className={styles.label}>Фотографии</b>}
            style={{ marginBottom: 40 }}
            name="photos"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              accept="image/*"
              multiple={true}
            >
              {fileList.length >= 20 ? null : (
                <div style={{ color: 'white' }}>
                  +<div style={{ color: 'white' }}>Добавить</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Modal
            open={previewOpen}
            title="Предпросмотр"
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="preview" style={{ width: '100%' }} src={previewImage} />
          </Modal>{' '}
          {/* Кнопка для отправки формы */}
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
