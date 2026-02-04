import AIPlusAssessmeent from './components/ai-plus-assessment';
import AIPlusQuestions from './components/ai-plus-questions';
import BlueSky from './components/blue-sky';
import ClearWater from './components/clear-water';
import ComprehensiveCollaboration from './components/comprehensive-collaboration';
import ComprehensiveEvaluation from './components/comprehensive-evaluation';
import Header from './components/header';
import MapData from './components/map-data';
import PureLand from './components/pure-land';
import TopData from './components/top-data';
import styles from './index.less';
const Home = () => {
  return (
    <div className={styles.dashboard}>
      <Header />
      <div className={styles.layoutContent}>
        <div className={styles.layoutBorder}>
          <ClearWater />
          <BlueSky />
          <PureLand />
        </div>
        <div className={styles.layoutCenter}>
          {/* <div className={styles.layoutCenterTop}>
            <WaterQuality />
            <AirQuality />
            <HazardousWaste />
          </div> */}
          <TopData />
          <MapData />
          {/* <TotalStatistics /> */}

          <ComprehensiveCollaboration />
        </div>
        <div className={styles.layoutBorder}>
          <AIPlusAssessmeent />
          <AIPlusQuestions />
          <ComprehensiveEvaluation />
        </div>
      </div>
    </div>
  );
};

export default Home;
