import { FC, ReactNode } from 'react';
import styles from './index.less';
interface HeaderProps {
  title: string;
  children?: ReactNode;
}
const Header: FC<HeaderProps> = ({ title, children }) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.right}>{children}</div>
    </div>
  );
};

export default Header;
