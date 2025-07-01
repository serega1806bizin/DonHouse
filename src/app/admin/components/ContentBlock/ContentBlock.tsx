/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable curly */
/* eslint-disable padding-line-between-statements */
import React, { useState } from 'react';
import styles from './ContentBlock.module.css';
import { TypeSelector } from '../TypeSelector/TypeSelector';
import { Modal, Upload } from 'antd';
import { VideoUploader } from '../VideoUploader/VideoUploader';

type ContentType = 'text' | 'images' | 'video' | 'documents';

interface ContentBlockProps {
  content: {
    type: ContentType;
    content: string | string[];
  };
  onChange: (updated: {
    type: ContentType;
    content: string | string[];
  }) => void;
  onDelete: () => void;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({
  content,
  onChange,
  onDelete,
}) => {
  const [selectedType, setSelectedType] = useState<ContentType>(content.type);
  const decodeName = (name: string) => {
    try {
      return decodeURIComponent(escape(name));
    } catch {
      return name;
    }
  };

  const handleTypeChange = (type: ContentType) => {
    setSelectedType(type);
    onChange({
      type,
      content:
        type === 'text'
          ? ''
          : type === 'images' || type === 'documents'
            ? []
            : '',
    });
  };

  const handleContentChange = (newContent: string | string[]) => {
    onChange({ type: selectedType, content: newContent });
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');

  return (
    <div className={styles.ContentBlock}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span>Выберите тип:</span>
          <TypeSelector
            selectedType={selectedType}
            onChange={handleTypeChange}
          />
        </div>
        <img onClick={onDelete} src="/icons/delete.svg" alt="удалить" />
      </div>

      <div style={{ marginTop: 10 }}>
        {selectedType === 'text' && (
          <textarea
            value={content.content as string}
            onChange={e => handleContentChange(e.target.value)}
            placeholder="Введите текст..."
            style={{
              width: '100%',
              minHeight: 128,
              resize: 'none',
              padding: 10,
              whiteSpace: 'pre-wrap',
            }}
          />
        )}
        {selectedType === 'images' && (
          <Upload
            listType="picture-card"
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: true,
            }}
            fileList={
              Array.isArray(content.content)
                ? content.content.map((item: any, i) => {
                    const isFile = item instanceof File;
                    return {
                      uid: `${i}`,
                      name: isFile ? item.name : `image-${i}`,
                      status: 'done',
                      url: isFile ? URL.createObjectURL(item) : item,
                    };
                  })
                : []
            }
            onPreview={file => {
              setPreviewImage(file.url || '');
              setPreviewVisible(true);
            }}
            onRemove={file => {
              const index = parseInt(file.uid, 10);
              const updated = [...(content.content as string[])];
              updated.splice(index, 1);
              handleContentChange(updated);
            }}
            beforeUpload={file => {
              (file as any).preview = URL.createObjectURL(file);
              const updated = [...(content.content as string[]), file];
              handleContentChange(updated);
              return false;
            }}
            multiple
          >
            <div>
              <div style={{ color: 'white' }}>Загрузить</div>
            </div>
          </Upload>
        )}
        {selectedType === 'video' && (
          <VideoUploader
            value={content.content as string}
            onChange={newVal => handleContentChange(newVal)}
            onUploadFile={async file => {
              const formData = new FormData();
              formData.append('file', file);

              try {
                const res = await fetch('http://localhost:40300/api/upload', {
                  // <---- здесь поправь
                  method: 'POST',
                  body: formData,
                });

                if (!res.ok) throw new Error('Upload failed');

                const data = await res.json(); // например { url: 'https://your-cdn.com/video.mp4' }
                return data.url;
              } catch (err) {
                console.error('Ошибка при загрузке видео', err);
                throw err;
              }
            }}
          />
        )}
        {selectedType === 'documents' && (
          <div>
            <input
              type="file"
              accept=".doc,.docx,.pdf,.xls,.xlsx,.txt"
              onChange={async e => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append('file', file);

                try {
                  const res = await fetch(
                    'http://localhost:4000/api/upload/doc',
                    {
                      method: 'POST',
                      body: formData,
                    },
                  );

                  const data = await res.json();

                  if (res.ok) {
                    const updated = [
                      ...(content.content as string[]),
                      JSON.stringify({ url: data.url, name: data.name }),
                    ];
                    handleContentChange(updated);
                  }
                } catch (err) {
                  console.error('Ошибка при загрузке документа:', err);
                }
              }}
            />
            {(content.content as string[]).map((docStr, i) => {
              const doc = JSON.parse(docStr);
              return (
                <div key={i} style={{ color: 'white', marginTop: 4 }}>
                  📄 {decodeName(doc.name)}
                  <span
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={async () => {
                      // Удаление с сервера (по желанию)
                      try {
                        await fetch('http://localhost:4000/api/upload', {
                          method: 'DELETE',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ url: doc.url }),
                        });
                      } catch (err) {
                        console.warn(
                          'Ошибка при удалении файла на сервере',
                          err,
                        );
                      }

                      const updated = [...(content.content as string[])];
                      updated.splice(i, 1);
                      handleContentChange(updated);
                    }}
                  >
                    Удалить
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};
