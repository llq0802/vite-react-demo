import Recorder from 'recorder-core/recorder.wav.min';

// export const BASE_WS_URL = 'ws://136.29.31.111:18888/ycWebSocket';
// export const BASE_WS_URL = 'wss://136.30.130.132:30118/ycWebSocket';
// export const BASE_WS_URL = 'wss://136.29.0.0:443/ycWebSocket';
// export const BASE_WS_URL = 'wss://136.29.0.0:7878/ycWebSocket';
// export const BASE_WS_URL = 'wss://www.aiadp.cn:7879/ycWebSocket';
export const BASE_WS_URL = 'wss://www.jxw-aiadp.com:18080/ycWebSocket';
export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export const ReadyStateMap = {
  [ReadyState.Connecting]: '连接中',
  [ReadyState.Open]: '连接成功',
  [ReadyState.Closing]: '连接关闭中',
  [ReadyState.Closed]: '连接已关闭或连接失败',
};

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function generateRandomString(length: number = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function initOpen(clientId, sessionId, digitalHumanId = '0e75a19927cb460299a755d247881ff7') {
  const obj = {
    commandId: '100001',
    clientId,
    sessionId,
    jsonContent: {
      clientId,
      sessionId,
      // digitalHumanId: 'b86863a244e24f18be79502fa685842a',
      digitalHumanId,
      scenarioId: null,
      customerServiceId: null,
      clientVideoUrl: 'rtsp://10.128.22.20:5544/49c88a90ad6e4238a663ef948db16f5a',
      hasVirtualImage: false,
      clientType: 'AI_ASSISTANT',
      clientSystemType: 'WINDOWS',
      videoSize: null,
      clientName: 'DESKTOP-UVP2VO8-YC',
      visibility: 'VISIBLE',
      greeting: 'GREET',
      staFbxMode: 'BVH',
      userId: null,
      serverAddress: '10.128.165.14:8082',
      deviceType: 'PC',
      version: null,
      token: null,
      dcsCmsIp: null,
      dcsCmsPort: 0,
      dcsEssIp: null,
      dcsEssPort: 0,
      dcsUserName: null,
      dcsPasswd: null,
      dcsDeviceId: null,
      deviceId: null,
      osVersion: 'Microsoft Windows NT 6.2.9200.0',
    },
  };
  return JSON.stringify(obj);
}

let rec: any;
export async function startRecordr() {
  try {
    rec = Recorder({
      type: 'wav',
      sampleRate: 8000,
      bitRate: 16,
    });

    rec.open(
      function () {
        rec.start();
      },
      function (msg, isUserNotAllow) {
        console.log((isUserNotAllow ? 'UserNotAllow，' : '') + '无法录音:' + msg);
      }
    );
  } catch (e) {
    console.error('录音失败:', e);
  }
}
export async function stopRecordr(cb) {
  rec.stop(
    async function (blob, duration) {
      console.log('时长:' + duration + 'ms');
      rec.close();
      rec = null;
      const base64String = await blobToBase64(blob);
      console.log('==base64String====>', base64String);
      cb?.(base64String);
    },
    function (msg) {
      console.log('录音失败:' + msg);
      rec.close();
      rec = null;
    }
  );
}
