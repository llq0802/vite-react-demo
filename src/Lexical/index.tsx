import React from 'react';
import Editor from './editor';
import { Button, Flex, Space } from 'antd';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

const Lexical = () => {
  // const [editor] = useLexicalComposerContext();
  return (
    <Flex vertical gap={24}>
      <Editor>
        <Space>
          <Button
            type='primary'
            onClick={() => {
              // editor.d/
            }}
          >
            Primary
          </Button>
          <Button type='primary'>Primary</Button>
          <Button type='primary'>Primary</Button>
        </Space>
      </Editor>
    </Flex>
  );
};

export default Lexical;
