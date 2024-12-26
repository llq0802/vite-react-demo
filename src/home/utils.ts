export function findLastTextNode(container: HTMLElement): Text | null {
  // 校验输入参数
  if (!container || !(container instanceof HTMLElement)) {
    console.warn('Invalid container provided');
    return null;
  }

  let lastTextNode: Text | null = null;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let node: Node | null = walker.nextNode();

  // 确保每次迭代后更新 node
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      lastTextNode = node as Text;
    }
    node = walker.nextNode(); // 更新 node
  }

  // 可选：日志记录
  if (lastTextNode === null) {
    console.log('No text nodes found in the container');
  }

  return lastTextNode;
}
export function mockRequest(username: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve();
      } else {
        reject(new Error('Failed to modify username'));
      }
    }, 500);
  });
}
