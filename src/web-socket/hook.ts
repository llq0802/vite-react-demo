import { useRef } from 'react';
import { BASE_WS_URL, generateRandomString } from './utils';
import { useWebSocket } from 'ahooks';
import type { Options } from 'ahooks/lib/useWebSocket';

export function useSessionid() {
  const idRef = useRef({
    clientId: generateRandomString(),
    sessionId: generateRandomString(),
  });
  return idRef.current;
}

export function useSocket({
  url = BASE_WS_URL,
  ...opts
}: Options & { url?: string; clientId?: string; sessionId?: string } = {}) {
  const { clientId, sessionId } = useSessionid();
  const wsUrlRef = useRef(`${url}?clientId=${clientId}&sessionId=${sessionId}`);
  const ret = useWebSocket(wsUrlRef.current, { manual: true, ...opts });
  return {
    clientId,
    sessionId,
    ...ret,
  };
}
