import { FC, ReactNode } from 'react';
import styles from './index.less';
interface CardProps {
  headerIcon?: ReactNode;
  title: string;
  children: ReactNode;
  headerRight?: ReactNode;
}
const CardContainer: FC<CardProps> = ({ headerIcon, title, children, headerRight }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.layoutLeft}>
          {headerIcon && <div className={styles.icon}>{headerIcon}</div>}
          <div className={styles.titleText}>{title}</div>
        </div>
        <div className={styles.layoutRight}>{headerRight}</div>
      </div>
      <div className={styles.splitLine}></div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default CardContainer;
