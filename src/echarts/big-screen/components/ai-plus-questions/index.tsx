import { useState } from 'react';
import IconQuestion from '../../assets/icons/icon-questions.svg';
import CardContainer from '../common/card-container';
import TypeList from './components/type-list';
import styles from './index.less';
enum TAB_TYPE {
  TYPE = 'type',
  LIST = 'list',
}
const AIPlusQuestions = () => {
  const [showType, setShowType] = useState<TAB_TYPE>(TAB_TYPE.TYPE);

  const tabTypes: Array<{ key: TAB_TYPE; title: string }> = [
    { key: TAB_TYPE.TYPE, title: '问题分类' },
    { key: TAB_TYPE.LIST, title: '问题清单' },
  ];
  return (
    <div className={styles.aiPlusQuestions}>
      <CardContainer title="AI+问题发现" headerIcon={<img src={IconQuestion} alt="" />}>
        <div className={styles.contentBody}>
          {/* <div className={styles.typeList}>
            {tabTypes.map((item) => {
              return (
                <div
                  className={`${styles.typeItem} ${item.key === showType && styles.active}`}
                  key={item.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowType(item.key);
                  }}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          {showType === TAB_TYPE.TYPE && <TypeList />}
          {showType === TAB_TYPE.LIST && <ListData />} */}
          <TypeList />
        </div>
      </CardContainer>
    </div>
  );
};

export default AIPlusQuestions;
