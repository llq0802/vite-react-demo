# 前端在智能体项目中的实践分享

## 项目架构与设计

基于 Pnpm + Monorepo 与前端微服务架构设计，主要由主应用、多个子应用和共享的模块组成

### 1. **多应用结构**

`apps`：

- docs: SDK 文档
- h5: H5 端应用
- main: Web 端主应用
- `micro-*` 系列：如 `micro-agent`, `micro-bi`, `micro-` 等，代表不同的微前端子应用
- web: Web 端门户应用

每个应用都是一个独立的功能模块

### 2. **共享包（Packages）**

`packages`：

- `config`: 配置相关
- `hooks`: React Hooks
- `icons`: 图标资源
- `platform-jsapi`: 平台 JS API
- `sdk-ui`: SDK UI 组件
- `sse`: Server-Sent Events 相关
- `ui`: 公共 UI 组件
- `utils`: 工具函数

这些共享包可以在各个子应用中被引用，实现代码复用并保证一致性。

> 需要在 mfsu 中排除这些包, 否则不能实时更新.

### 3. **构建与配置脚本**

- 使用了 `pnpm` 作为包管理器减少`幽灵依赖`
- 使用了 `Turborepo`，来加速构建流程。
- `scripts` 包含一系列构建和部署脚本，例如打包、发布、同步标签等。
- 优化包体积与加载速度

### 4. **技术栈**

- **TypeScript**
- **React**
- **WuJie**
- **Vite**
- **UmiJS** (RsBuild, Nextjs, Vite)
- **Tailwind CSS** (antd-style)
- **CSS Module**

### 5. **微前端架构**

- 使用了`wujie`微前端 (为什么没选择`qiankun`?)
- 主应用实现系统基础功能
- 子应用实现业务功能
- 踩坑点
  - 热更新缓慢, 切热更新渲染致 iframe 遮挡页面
  - 内存占用大, 即便销毁子应用，因为闭包的原因某些内存不会自动释放
  - 子应用中使用大部分的富文本编辑器有 bug
  - 子应用销毁时, 不会触发 useEffect 的 cleanup
- 总结
  - 尽量不要微前端
  - 能用 `iframe` 尽量用 `iframe`
  - 可以尝试选择`Micro-APP`, wujie 作者推荐, 或者`模块联邦`技术

---

## 项目的开发

### CSS 特性与技巧的运用

- clamp 最小中间最大值, 自适应与响应式(媒体查询,容器查询)
- contain 这个属性可以帮助浏览器进行渲染优化，通过隔离 DOM 的某些部分来提升性能。
- content-visibility 主要用于优化网页的渲染性能。它控制元素的内容是否可见，并且可以跳过元素的渲染过程，直到用户需要查看它为止。
- flex 与 width height 的运用
  - 自动撑满宽高
  - 自适应宽度单行文省略
- grid 布局的使用

很多 CSS 与 HTML 的特性可以代替 JS

### SSE 技术

Server-Sent Events：是一种通过 HTTP 协议实现的服务器推送技术，也被称为 SSE

EventSource：是 HTML5 中定义的用于接收服务器端推送事件的 API。 ( new EventSource(url) , 不符合业务需求没使用)

SSE 本质是字节流的传输，fetch 中处理对应的字节流信息，同样可以实现 EventSource 的功能， fetch 的响应结果中，拿到的是一个 ReadableStream 类型，通过 ReadableStream.getReader().read()读取字节流，再将字节流转换成 string

```js
const createFetchSSE = (url) => {
  const decoder = new TextDecoder();
  const controller = new AbortController();
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ query: 'hello' }),
    signal: controller.signal,
  }).then((res) => {
    // 创建一个 ReadableStreamDefaultReader 去读取字节流数据
    const reader = res.body.getReader();
    const processHandle = ({ value }) => {
      // value 为 Uint8Array 二进制数组
      const decodeValue = decoder.decode(value, { stream: true });
      // 业务代码
      // ...

      // 读取下一个流数据
      return reader.read().then(processHandle);
    };

    reader.read().then(processHandle);
  });
};
const sse = createFetchSSE('http://localhost:3000/sse');
```

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive', // 请求完成后依旧保持连接不关闭，不同http版本默认值不同
      'Cache-Control': 'no-cache', // 不缓存
    });
    // 业务逻辑
    res.write(`event: foo\n`); // 使用foo事件监听
    res.write(`data: foo listener\n\n`);

    res.write(`data: message listener\n\n`); // 未声明名称，默认使用message事件监听

    res.write(`event: bar\n`); // 使用bar事件监听
    res.write(`data: bar listener\n\n`);
  }
});

server.listen(3000, 'localhost', () => {
  console.log('Server is running at 3000');
});
```

- @microsoft/fetch-event-source 的使用
  - 必须满足 sse 的基本规范
  - 连接遇到 http 错误时，如跨域等，必须要 throw 才能停止，不然会一直重连 (源码的原因)

### Agent 对话流程的实现

1. 初始化流程 ：

   - 从 DeepSeek 入口开始，通过多层 Provider 提供全局状态和上下文
   - 最终渲染 DeepChat 主组件

2. 组件类型判断 ：

   - 根据 rightComponentType 渲染不同内容组件
   - 支持闲聊、智能体、写作、收藏、AIPPT 等多种模式

3. 聊天主流程 ：

   - 初始化页面显示欢迎信息
   - 提供多种输入方式：文本、文件上传、语音
   - 消息展示支持多种类型：文本、文档、表格、报告、图表等

4. 历史记录管理 ：

   - 保存聊天历史
   - 支持会话重命名、置顶等管理功能

5. 消息处理机制 ：

   - 使用策略模式处理不同类型的消息
   - 支持意图识别、API 调用、RAG 检索、BI 分析等多种能力

### 基于 Dify 工作流的开发

怎么做的？

1. 先去看 Dify 的官方文档，了解 Dify 的工作流机制与节点介绍。
2. 查看 reactflow 官方文档，了解 reactflow 的基本使用。
3. 查看工作流整体的状态管理, 阅读主线逻辑流程，不考虑细节。
4. 直接复制官方代码，然后按照自己的需求进行修改。
5. 遇到比较难理解的代码借助 AI

## 实践中的资源分享与推荐

- AI 相关

  - Dify
  - FastGPT
  - RagFlow
  - NextChat

- 其他

  - ReactTracked
  - immer
  - @microsoft/fetch-event-source
  - ReactFlow（@xyflow/react）
  - Lexical
  - TanStack 系列
  - CherryMarkdown

## 项目总结

1. 代码复用性仍还不够, 很多复制粘贴代码
2. 组件与 hook 职责划分不够
3. 组件与组件职责划分不够
4. 前端太多的数据转换, 与后端沟通不不足
