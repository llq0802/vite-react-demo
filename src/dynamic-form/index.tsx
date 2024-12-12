import { Card } from 'antd';
import DynamicDorm from './dynamic-form';
import rules from './schema-json';

export default () => {
  return (
    <Card style={{ width: '30%' }}>
      <DynamicDorm rules={rules} />
    </Card>
  );
};
