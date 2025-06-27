import { Form, Input, Select, Checkbox, Button } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import styles from './CreateQuestion.module.css';
interface CreateQuestionProps {
  name: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restField: any;
  remove: (name: number) => void;
}

export const CreateQuestion = ({
  name,
  restField,
  remove,
}: CreateQuestionProps) => {
  const form = useFormInstance();

  return (
    <div
      style={{
        padding: 16,
        border: '1px solid #444',
        borderRadius: 8,
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.label}>Тип вопроса:</div>
        <Form.Item
          style={{ width: '60%' }}
          {...restField}
          name={[name, 'type']}
          rules={[{ required: true }]}
        >
          <Select
            className={styles.input}
            placeholder="-- Выберите --"
            bordered={false}
            dropdownClassName={styles.dropdown}
          >
            <Select.Option value="text">Текстовый</Select.Option>
            <Select.Option value="checkbox">Множественный</Select.Option>
          </Select>
        </Form.Item>
      </div>
      <div style={{ marginBottom: 10 }} className={styles.label}>
        Текст вопроса:
      </div>

      <Form.Item
        {...restField}
        name={[name, 'title']}
        rules={[{ required: true }]}
      >
        <Input className={styles.input} placeholder="Введите текст вопроса" />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => {
          const type = form.getFieldValue(['questions', name, 'type']);

          if (type === 'checkbox') {
            return (
              <Form.List name={[name, 'options']}>
                {(optionFields, { add, remove: removeOption }) => (
                  <Fragment>
                    {optionFields.map(({ key: optKey, name: optName }) => {
                      const isChecked =
                        form
                          .getFieldValue(['questions', name, 'correct'])
                          ?.includes(optName) || false;

                      return (
                        <div
                          key={optKey}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '8px 12px',
                            backgroundColor: isChecked
                              ? '#e6ffed'
                              : 'transparent',
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            marginBottom: 10,
                          }}
                        >
                          <Checkbox
                            checked={isChecked}
                            onChange={e => {
                              const prev =
                                form.getFieldValue([
                                  'questions',
                                  name,
                                  'correct',
                                ]) || [];
                              const updated = e.target.checked
                                ? [...prev, optName]
                                : prev.filter((val: number) => val !== optName);

                              form.setFieldsValue({
                                questions: {
                                  [name]: {
                                    correct: updated,
                                  },
                                },
                              });
                            }}
                          />
                          <Form.Item
                            name={[optName]}
                            rules={[
                              { required: true, message: 'Введите вариант' },
                            ]}
                            style={{ flexGrow: 1, marginBottom: 0 }}
                          >
                            <Input placeholder={`Вариант ${optName + 1}`} />
                          </Form.Item>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => removeOption(optName)}
                          />
                        </div>
                      );
                    })}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      block
                    >
                      Добавить вариант ответа
                    </Button>
                  </Fragment>
                )}
              </Form.List>
            );
          }

          return (
            <>
              <div className={styles.label}>Правильный ответ:</div>

              <Form.Item name={[name, 'correct']} rules={[{ required: true }]}>
                <Input className={styles.input} placeholder="Ответ" />
              </Form.Item>
            </>
          );
        }}
      </Form.Item>

      <Button danger onClick={() => remove(name)} className={styles.dltBtn}>
        Удалить этот вопрос
      </Button>
    </div>
  );
};
