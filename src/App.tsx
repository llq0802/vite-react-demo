import { Button, Card } from 'antd';
import WebSocket from './WebSocket';
import { useState } from 'react';

const body = { company_id: '1493467758007336995', chain_id: '1607920098604355585' };

function App() {
  const [loading, setLoading] = useState(false);

  async function downloadExcelFile() {
    try {
      setLoading(true);
      // 使用 Fetch API 发起 GET 请求获取文件数据
      const response = await fetch('/api/aiadp/word/generate_word', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // 检查响应状态，确保请求成功
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 将响应体转换为 Blob 对象，注意应根据实际 Content-Type 设置类型
      const blob = await response.blob();
      // 创建一个临时的 URL 表示这个 Blob 对象
      const urlObject = window.URL.createObjectURL(blob);
      // 创建隐藏的可下载链接
      const link = document.createElement('a');
      link.href = urlObject;
      link.download = 'downloaded.docx'; // 自定义下载文件的名称
      // 触发点击或者其它方式来启动下载
      document.body.appendChild(link);
      link.click();
      // 清理，释放 URL 对象占用的内存
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('下载文件时出错:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card style={{ width: '60vw' }} title={<h1>WebSocket及语音Demo</h1>}>
      <Button loading={loading} onClick={downloadExcelFile}>
        测试下载.docx
      </Button>
      <WebSocket />
    </Card>
  );
}

export default App;
