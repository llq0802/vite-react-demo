import styles from './index.less';
const AirQuality = () => {
  const realtimeAirQuality = [
    { title: 'AQI', count: 73 },
    { title: 'PM2.5', count: 9 },
    { title: 'O₃', count: 73 },
  ];
  const nextSevenDayData = [
    { weekday: '星期一', day: '7-11', start: 20, end: 45, type: 'O₃' },
    { weekday: '星期二', day: '7-12', start: 60, end: 80, type: 'O₃' },
    { weekday: '星期三', day: '7-13', start: 120, end: 145, type: 'O₃' },
    { weekday: '星期四', day: '7-14', start: 160, end: 180, type: 'O₃' },
    { weekday: '星期五', day: '7-15', start: 220, end: 245, type: 'O₃' },
    { weekday: '星期六', day: '7-16', start: 151, end: 191, type: 'O₃' },
    { weekday: '星期日', day: '7-17', start: 301, end: 320, type: 'O₃' },
  ];

  const rangeColorMap = [
    { text: '优', start: 0, end: 50, bgColor: '#68e222', color: '#276c00' },
    { text: '良', start: 51, end: 100, bgColor: '#e5fa1c', color: '#757900' },
    { text: '轻度', start: 101, end: 150, bgColor: '#ff6a02', color: '#933c00' },
    { text: '中度', start: 151, end: 200, bgColor: '#fd000c', color: '#900007' },
    { text: '重度', start: 201, end: 300, bgColor: '#672577', color: '#efacfe' },
    { text: '严重', start: 301, end: 10000, bgColor: '#852828', color: '#f89595' },
  ];

  const showQuality = (end: number) => {
    let result = { text: '', bgColor: '', color: '' };
    rangeColorMap.reverse().forEach((item) => {
      if (item.end >= end && item.start < end) {
        result = item;
      }
    });
    return result;
  };

  return (
    <div className={styles.airQuality}>
      <div className={styles.title}>实时空气质量</div>
      <div className={styles.realtimeAirQuality}>
        {realtimeAirQuality.map((item) => {
          return (
            <div key={item.title} className={styles.realtimeAirItem}>
              {item.title} <span className={styles.mount}>{item.count}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.title}>未来7天空气质量预测</div>
      <div className={styles.predict}>
        <div className={styles.predictTypes}>
          <div className={styles.predictTypeItem}>
            AQI
            <br />
            范围
          </div>
          <div className={styles.predictTypeItem}>
            AQI
            <br />
            等级
          </div>
          <div className={styles.predictTypeItem}>
            首要
            <br />
            污染物
          </div>
        </div>
        {nextSevenDayData.map((item) => {
          return (
            <div className={styles.predictItem} key={item.weekday}>
              <div className={styles.weekday}>{item.weekday}</div>
              <div className={styles.weekday}>{item.day}</div>
              <div className={styles.weekday}>
                {item.start}-{item.end}
              </div>
              <div
                className={styles.quality}
                style={{
                  backgroundColor: showQuality(item.end)?.bgColor,
                  color: showQuality(item.end)?.color,
                }}
              >
                {showQuality(item.end)?.text}
              </div>
              <div className={styles.predictType}>{item.type}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AirQuality;
