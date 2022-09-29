export interface IBase {
  children?: React.ReactNode;
}

const Base: React.FC<IBase> = ({ children }) => {
  return <div>{children}</div>;
};

Base.displayName = 'Base';
export default Base;
