# 前端在 AiAgent 项目中的实践分享

### 项目架构与设计

基于 Monorepo 与前端微服务架构设计，主要由多个子应用和共享的模块组成

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

### 3. **构建与配置脚本**

- 使用了 `pnpm` 作为包管理器减少`幽灵依赖`
- 使用了 `Turborepo`，来加速构建流程。
- `scripts` 包含了一系列构建和部署脚本，例如打包、发布、同步标签等。
- 优化包体积与加载速度

### 4. **技术栈**

- **TypeScript**
- **React**
- **WuJie**
- **Vite**
- **UmiJS**
- **Tailwind CSS**
- **CSS Module**

### 5. **微前端架构**

- 使用了`wujie`微前端 (为什么没选择`qiankun`?)
- 主应用实现系统基础功能
- 子应用实现业务功能
- 踩坑点
  - 内存占用大, 即便销毁子应用，某些内存不会自动释放
  - 子应用中使用大部分的富文本编辑器有 bug
  - 子应用销毁时, 不会触发 useEffect 的 cleanup
- 总结
  - 尽量不要微前端
  - 能用 `iframe` 尽量用 `iframe`
  - 可以尝试选择`Micro-APP`, wujie 作者推荐, 或者`模块联邦`技术

---

### 项目开发

流程说明：

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

### 资源的分享与推荐

ai 相关

- dify
- fastGPT
- ragflow
- chatgpt-next-web

其他

- SnapDOM
