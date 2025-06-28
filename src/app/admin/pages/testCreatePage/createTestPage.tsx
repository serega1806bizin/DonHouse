/* eslint-disable no-param-reassign */
import { useState } from 'react';
import styles from './createTestPage.module.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs'; // убедись, что установлен

import {
  Form,
  DatePicker,
  ConfigProvider,
  Button,
  Checkbox,
  InputNumber,
  message,
} from 'antd';
import { CreateQuestion } from '../../components/CreateQuestion/CreateQuestion';
import { GoBack } from '../../components/Btns/GoBack';

type QuestionType = 'text' | 'checkbox';

interface Question {
  id: number;
  title: string;
  type: QuestionType;
  options?: string[];
  correсt: string | boolean[];
}
interface Test {
  id: number;
  dateCreated: string;
  dateStart: string;
  dateEnd: string;
  limit: number;
  questions: Question[];
}

export const CreateTestPage = () => {
  const [checked, setChecked] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: never) => {
    const { dateStart, timeStart, dateEnd, timeEnd } = values;

    const start = dayjs(dateStart)
      .hour(dayjs(timeStart).hour())
      .minute(dayjs(timeStart).minute())
      .toISOString();

    const end = dayjs(dateEnd)
      .hour(dayjs(timeEnd).hour())
      .minute(dayjs(timeEnd).minute())
      .toISOString();

    const questions = (values.questions || []).map((q: any) => {
      if (q.type === 'checkbox') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const correctVector = (q.options || []).map((_: any, idx: any) =>
          q.correct?.includes(idx),
        );

        return { ...q, correct: correctVector };
      }

      return q;
    });

    if (!questions.length) {
      message.warning('Извините, добавьте хотя бы один вопрос');

      return;
    }

    const test: Test = {
      id: Date.now(),
      dateCreated: dayjs().toISOString(),
      dateStart: start,
      dateEnd: end,
      ...(values.limit && { limit: values.limit }),
      questions,
    };

    console.log('Тест:', test);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <div className={styles.createTestPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Создать тест</h1>
        <GoBack />
      </header>
      <ConfigProvider
        theme={{
          token: {
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.5)',
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-test"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.conteinerDataInput}>
            <div className={styles.label}>Дата открытия</div>

            <div className={styles.dataInpun}>
              <Form.Item
                name="dateStart"
                className={styles.in}
                rules={[{ required: true, message: 'Введите дату открытия' }]}
                style={{ margin: 0 }}
              >
                <DatePicker
                  className={styles.datePicker}
                  format="DD.MM.YYYY"
                  placeholder="01.01.2025"
                  suffixIcon={null}
                  onChange={val => form.setFieldsValue({ dateStart: val })}
                />
              </Form.Item>
              <Form.Item
                name="timeStart"
                className={styles.in}
                rules={[{ required: true, message: 'Введите время открытия' }]}
                style={{ margin: 0 }}
              >
                <DatePicker.TimePicker
                  className={styles.timePicker}
                  format="HH:mm"
                  placeholder="06:00"
                  suffixIcon={null}
                />
              </Form.Item>
            </div>
          </div>
          <div
            style={{ marginBottom: '20px' }}
            className={styles.conteinerDataInput}
          >
            <div className={styles.label}>Дата закрытия</div>

            <div className={styles.dataInpun}>
              <Form.Item
                name="dateEnd"
                className={styles.in}
                rules={[{ required: true, message: 'Введите дату закрытия' }]}
                style={{ margin: 0 }}
              >
                <DatePicker
                  className={styles.datePicker}
                  format="DD.MM.YYYY"
                  placeholder="07.01.2025"
                  suffixIcon={null}
                  onChange={val => form.setFieldsValue({ dateEnd: val })}
                />
              </Form.Item>
              <Form.Item
                name="timeEnd"
                className={styles.in}
                rules={[{ required: true, message: 'Введите время закрытия' }]}
                style={{ margin: 0 }}
              >
                <DatePicker.TimePicker
                  className={styles.timePicker}
                  format="HH:mm"
                  placeholder="21:00"
                  suffixIcon={null}
                  onChange={val => form.setFieldsValue({ timeEnd: val })}
                />
              </Form.Item>
            </div>
          </div>
          <Checkbox
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            style={{ color: 'white', marginBottom: '10px' }}
          >
            Добавить ограничение по времени
          </Checkbox>
          {checked && (
            <div className={styles.numberInputWrapper}>
              <div className={styles.label} style={{ marginBottom: '25px' }}>
                Время для прохождения (мин.)
              </div>
              <Form.Item
                name="limit"
                rules={[
                  { required: true, message: 'Введите время ограничения' },
                ]}
              >
                <InputNumber
                  className={styles.numberInput}
                  style={{
                    color: 'white',
                  }}
                  onFocus={e => {
                    e.target.style.color = 'black';
                  }}
                  onBlur={e => {
                    e.target.style.color = 'white';
                  }}
                  min={0}
                  max={300}
                  placeholder="15"
                />
              </Form.Item>
            </div>
          )}
          <div className={styles.dividerWithText}>
            <div className={styles.line} />
            <span className={styles.text}>Вопросы</span>
            <div className={styles.line} />
          </div>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <CreateQuestion
                    key={key}
                    name={name}
                    restField={restField}
                    remove={remove}
                  />
                ))}

                <Form.Item>
                  <div className={styles.buttonRow}>
                    <Button
                      className={styles.addBtn}
                      onClick={() =>
                        add({
                          id: Date.now(),
                          type: 'text',
                          title: '',
                          correct: '',
                          options: [],
                        })
                      }
                    >
                      Добавить вопрос
                    </Button>

                    <Button htmlType="submit" className={styles.submitBtn}>
                      Создать тест
                    </Button>
                  </div>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </ConfigProvider>
    </div>
  );
};
