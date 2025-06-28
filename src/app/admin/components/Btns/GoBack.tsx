import { useGoBack } from '../../../../hooks/useGoBack';

export const GoBack = () => {
  const goBack = useGoBack();

  return <img onClick={goBack} src="/icons/back.svg" alt="назад" />;
};
