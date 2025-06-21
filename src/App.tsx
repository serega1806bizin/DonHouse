import React from 'react';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

// eslint-disable-next-line react/display-name
export const Provider: React.FC<Props> = React.memo(({ onClick, children }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
));

export const App: React.FC = () => {
  return (
    <div className="starter">
      <Provider onClick={() => ({})}>TodoList</Provider>
    </div>
  );
};
