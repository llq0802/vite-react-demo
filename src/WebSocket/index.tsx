import { useState } from 'react';
import { Button, Card, Input, Space, message } from 'antd';
import { useSocket } from './hook';
import { BASE_WS_URL, ReadyState, ReadyStateMap, initOpen, startRecordr, stopRecordr } from './utils';
import { audioSrc } from './url';
import { useUnmount } from 'ahooks';

let timer: number;

export default () => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [value, setValue] = useState('');
  const [url, seturl] = useState(BASE_WS_URL);
  const [digitalHumanId, setdigitalHumanId] = useState('0e75a19927cb460299a755d247881ff7');

  const { clientId, sessionId, readyState, sendMessage, disconnect, connect } = useSocket({
    url,
    onOpen(event, instance) {
      const msg = initOpen(clientId, sessionId, digitalHumanId);
      instance.send(msg);
      console.log('===客户端初始化请求===');
      timer = setInterval(() => {
        console.log('===客户端发送心跳===');
        const msg = {
          commandId: '400000',
          clientId,
          sessionId,
          jsonContent: { message: '' },
        };
        sendMessage(JSON.stringify(msg));
      });
    },
    onMessage({ data }) {
      console.log('===从服务端接受到的消息===：', data);
      const dataObj = JSON.parse(data)?.data;
      if (!dataObj?.message) return;
      if (!dataObj?.stream && dataObj?.tag === 0) {
        const audio = document.querySelector('#audio') as HTMLAudioElement;
        audio.src = audioSrc + dataObj.message;
        audio?.play?.();
      }
    },
    onError(event, instance) {
      console.log('===WebSocket连接发生错误===：', event);
    },
  });

  useUnmount(() => {
    clearInterval(timer);
  });
  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3>连接状态: {ReadyStateMap[readyState]}</h3>
        <div>
          socket地址 <Input value={url} onChange={(e) => seturl(e.target.value)} />
        </div>
        <div>
          机器人ID <Input value={digitalHumanId} onChange={(e) => setdigitalHumanId(e.target.value)} />
        </div>
        <Space>
          <Button onClick={() => disconnect && disconnect()} disabled={readyState !== ReadyState.Open}>
            ❌ disconnect
          </Button>
          <Button
            onClick={() => {
              if (!url) {
                message.error('输入正确socket地址');
                return;
              }
              connect && connect();
            }}
            disabled={readyState === ReadyState.Open}
            type='primary'
          >
            {readyState === ReadyState.Connecting ? 'connecting' : '📞 connect'}
          </Button>
        </Space>

        <Input.TextArea placeholder='请输入发送的消息' value={value} onChange={(e) => setValue(e.target.value)} />

        <Space>
          <Button
            type='primary'
            onClick={() => {
              const msg = {
                commandId: '200001',
                clientId,
                sessionId,
                jsonContent: { message: value },
              };
              sendMessage(JSON.stringify(msg));
              setValue('');
            }}
            disabled={readyState !== ReadyState.Open}
          >
            ✉️ send 文字
          </Button>

          <Button
            type='primary'
            disabled={readyState !== ReadyState.Open}
            onMouseDown={startRecordr}
            onMouseUp={() => {
              stopRecordr((base64ring) => {
                const obj = {
                  commandId: '200100',
                  clientId,
                  sessionId,
                  jsonContent: { message: base64ring.split(',')[1] },
                };
                sendMessage(JSON.stringify(obj));
              });
            }}
          >
            按住录音
          </Button>
        </Space>

        <audio controls id='audio'></audio>
        <div>
          <h5>消息列表</h5>
          <pre style={{ background: '#f5f5f5' }}>
            TO DO...
            <br />
            {JSON.stringify(messageHistory, null, 4)}
          </pre>
        </div>
      </div>
    </Card>
  );
};
