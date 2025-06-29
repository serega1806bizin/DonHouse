export const useGoHomeAdmin = () => {
  const goHome = () => {
    window.location.href = '/admin';
  };

  return goHome;
};
