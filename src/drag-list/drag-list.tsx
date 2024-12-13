import { Card, Flex } from 'antd';
import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';

const defaultDragData = {
  pending: {
    title: '待完成',
    contents: [
      { id: 1, content: '1' },
      { id: 2, content: '2' },
      { id: 3, content: '3' },
      { id: 4, content: '4' },
      { id: 5, content: '5' },
      { id: 6, content: '6' },
    ],
  },
  doing: {
    title: '进行中',
    contents: [],
  },
  done: {
    title: '已完成',
    contents: [],
  },
};

const DragItem = ({ itemType, id }) => {
  const [dragging, setDragging] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => {
        const data = JSON.stringify({ type: itemType, data: id });
        e.dataTransfer.setData('key', data);
        setDragging(true);
      }}
      onDragEnd={() => {
        setDragging(false);
      }}
      style={{ border: '1px solid #e8e8e8', padding: 16, textAlign: 'center' }}
    >
      {dragging ? 'dragging' : `box-${id}-${itemType}`}
    </div>
  );
};

const DragList = () => {
  const [dragData, setDragData] = useImmer(defaultDragData);

  return (
    <Flex gap={40}>
      {Object.keys(dragData).map((key, index) => {
        return (
          <Card key={index} styles={{ body: { width: 300, height: 500 } }} title={<b>{dragData[key].title}</b>}>
            <Flex
              className='drag-list'
              style={{ display: 'flex', height: '100%' }}
              vertical
              gap={16}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDragEnter={(e) => {
                e.preventDefault();
              }}
              onDragLeave={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                let data = e.dataTransfer.getData('key');
                console.log('===data===>', data);
                if (!data) return;
                data = JSON.parse(data);
                const currentType = key;
                const { type: orginType, data: orginId } = data;
                const curIndex = dragData[orginType].contents.findIndex((item) => item.id === orginId);
                if (curIndex === -1) return;
                setDragData((draft) => {
                  draft[orginType].contents.splice(curIndex, 1);
                  draft[currentType].contents.push(dragData[orginType].contents[curIndex]);
                });
              }}
            >
              {dragData[key].contents.map((item, i) => (
                <DragItem key={i} itemType={key} id={item.id} />
              ))}
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default DragList;
