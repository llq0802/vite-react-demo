import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MyReactQuill() {
  const [value, setValue] = useState('<h2>I am Example</h2>');
  return <ReactQuill theme='snow' value={value} onChange={setValue} />;
}
