import { message } from 'antd';
import React, { useState } from 'react';

interface VideoUploaderProps {
  value: string;
  onChange: (url: string) => void;
  onUploadFile: (file: File) => Promise<string>; // функция загрузки на сервер
}

const isYoutube = (url: string) =>
  url.includes('youtube.com') || url.includes('youtu.be');
const getYoutubeEmbed = (url: string) =>
  url.includes('watch?v=')
    ? url.replace('watch?v=', 'embed/')
    : `https://www.youtube.com/embed/${url.split('/').pop()}`;

const isVimeo = (url: string) => url.includes('vimeo.com');
const getVimeoEmbed = (url: string) => {
  const id = url.split('/').pop();

  return `https://player.vimeo.com/video/${id}`;
};

const isRutube = (url: string) => url.includes('rutube.ru/video/');
const getRutubeEmbed = (url: string) => {
  const id = url.split('/video/')[1]?.split('/')[0];

  return `https://rutube.ru/play/embed/${id}`;
};

const isDirectVideo = (url: string) =>
  url.match(/\.(mp4|webm|ogg)(\?.*)?$/i) || url.startsWith('blob:');

export const VideoUploader: React.FC<VideoUploaderProps> = ({
  value,
  onChange,
  onUploadFile,
}) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const url = await onUploadFile(file); // upload logic here

      onChange(url);
    } catch (err) {
      message.error('Ошибка при загрузке файла');
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!value) {
      return null;
    }

    if (isYoutube(value)) {
      return (
        <iframe
          src={getYoutubeEmbed(value)}
          width="100%"
          height="200"
          allowFullScreen
        />
      );
    }

    if (isVimeo(value)) {
      return (
        <iframe
          src={getVimeoEmbed(value)}
          width="100%"
          height="200"
          allowFullScreen
        />
      );
    }

    if (isRutube(value)) {
      return (
        <iframe
          src={getRutubeEmbed(value)}
          width="100%"
          height="200"
          allowFullScreen
        />
      );
    }

    if (isDirectVideo(value)) {
      return <video src={value} width="100%" height="200" controls />;
    }

    return <p>Невозможно отобразить видео</p>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label>
        Ссылка:
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://youtube.com/... или .mp4"
          style={{ width: '100%' }}
        />
      </label>

      <span>или</span>

      <input
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        disabled={loading}
      />

      <div style={{ marginTop: 10 }}>{renderPreview()}</div>
    </div>
  );
};
