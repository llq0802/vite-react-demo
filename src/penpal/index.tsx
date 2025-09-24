import { useEffect, useState } from 'react';
import { PenpalParent } from '@weblivion/react-penpal';
import type { RemoteProxy, Reply } from 'penpal';

type ChildMethods = {
  hi: (s: string) => Reply<string>;
};

function Penpal() {
  const [child, setChild] = useState<RemoteProxy<ChildMethods>>(null!);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('===child==>', child);
    if (child) {
      child.hi('Hi from PenpalParent');
    }
  }, [child]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h1>child.hello(): {message}</h1>
      <PenpalParent
        src='http://localhost:8000/components/l-captcha-button'
        width='100%'
        height='100%'
        setChild={setChild}
        allowedOrigins={['*']}
        methods={{
          hello(message: string) {
            setMessage(message);
          },
        }}
        style={{
          border: '0',
          display: 'block',
        }}
      />
    </div>
  );
}

export default Penpal;
