import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $getRoot, $getSelection } from 'lexical';
import './index.less';
import { Flex } from 'antd';
import theme from './theme';

function onError(error) {
  console.error(error);
}

function Editor({ children }) {
  const initialConfig: InitialConfigType = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  function onChange(editorState) {
    editorState.read(() => {
      // console.log('===editorState===>', editorState);
      const data = editorState.toJSON();
      // Read the contents of the EditorState here.
      // const root = $getRoot();
      // const selection = $getSelection();
      // console.log(root, selection);
    });
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Flex vertical gap={24}>
        <div className='editor-wrapper'>
          <RichTextPlugin
            contentEditable={<ContentEditable className='editor-content' />}
            placeholder={<div className='editor-placeholder'>Enter some text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />

          <OnChangePlugin onChange={onChange} />
        </div>

        {children}
      </Flex>
    </LexicalComposer>
  );
}
export default Editor;
