// components/CopyToClipboardIcon.tsx
import { message } from 'antd';
import { useState } from 'react';

interface CopyToClipboardIconProps {
  text: string;
  successMessage?: string;
}

export const CopyToClipboardIcon = ({
  text,
  successMessage = 'Скопировано!',
}: CopyToClipboardIconProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (successMessage) {
        // Можно заменить на message.success или toast
        message.success(successMessage);
      }

      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      message.error('Не удалось скопировать');
    }
  };

  return (
    <img
      src="/icons/copy.svg"
      alt="Копировать"
      onClick={handleCopy}
      style={{ cursor: 'pointer' }}
      title={copied ? 'Скопировано!' : 'Копировать'}
    />
  );
};
