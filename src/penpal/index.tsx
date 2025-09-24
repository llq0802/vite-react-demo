// import { useEffect, useState } from 'react';
// import { PenpalParent } from '@weblivion/react-penpal';
// import type { RemoteProxy, Reply } from 'penpal';

// type ChildMethods = {
//   hi: (s: string) => Reply<string>;
// };

// function Penpal() {
//   const [child, setChild] = useState<RemoteProxy<ChildMethods>>(null!);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     console.log('===child==>', child);
//     if (child) {
//       child.hi('Hi from PenpalParent');
//     }
//   }, [child]);

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <h1>child.hello(): {message}</h1>
//       <PenpalParent
//         src='http://localhost:8000/components/l-captcha-button'
//         width='100%'
//         height='100%'
//         setChild={setChild}
//         allowedOrigins={['*']}
//         methods={{
//           hello(message: string) {
//             setMessage(message);
//           },
//         }}
//         style={{
//           border: '0',
//           display: 'block',
//         }}
//       />
//     </div>
//   );
// }

// export default Penpal;

import { usePenpalParent } from '@weblivion/react-penpal';
import type { Reply } from 'penpal';
import { useEffect, useState } from 'react';

type ParentMethods = {
  hello(msg: string): Reply<string>;
};

function Penpal() {
  const [message, setMessage] = useState('');
  const { parentMethods, connection } = usePenpalParent<ParentMethods>(
    {
      methods: {
        hi(message: string) {
          setMessage(message);
        },
      },
    },
    ['*'],
  );

  useEffect(() => {
    if (connection) {
      // parentMethods.hello('Hello from usePenpalParent');
    }
  }, [connection, parentMethods]);

  return (
    <div>
      <h1>parent.hi(): {message}</h1>
    </div>
  );
}
export default Penpal;
