import { useGoHomeAdmin } from '../../../../hooks/useGoHomeAdmin';

export const GoHome = () => {
  const goHome = useGoHomeAdmin();

  return <img onClick={goHome} src="/icons/home.svg" alt="домой" />;
};
