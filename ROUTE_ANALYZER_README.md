# React 路由分析工具

这是一个用于识别和统计 React 项目中路由数量的工具。它可以在运行时分析 React Router 的路由配置，并提供详细的路由统计信息。

## 功能特性

### 🔍 DOM 分析

- 自动扫描页面中的路由相关元素
- 识别 React Router 的 Routes 组件
- 提取导航链接和路由路径

### 📊 实时监控

- 跟踪路由变化并记录历史
- 监听浏览器前进后退操作
- 使用 MutationObserver 监听 DOM 变化

### 📈 统计分析

- 显示当前页面的路由信息
- 统计总路由数量
- 记录路由变化历史

### 🎯 当前状态

- 显示当前路径、Hash、查询参数
- 提供完整的时间戳信息
- 实时更新路由状态

## 文件结构

```
src/
├── parser.js                    # 核心路由解析器
├── components/
│   └── RouteAnalyzer.tsx       # React组件界面
└── pages/
    └── RouteAnalysisDemo.tsx   # 演示页面
```

## 核心类

### RouteParser

路由解析器，负责分析路由配置和 DOM 元素。

```javascript
import { RouteParser } from "./parser";

const parser = new RouteParser();

// 分析DOM中的路由
const domResult = parser.extractRoutesFromDOM();

// 分析当前路由状态
const currentRoute = parser.analyzeCurrentRoute();
```

### RouteMonitor

路由监控器，负责实时监控路由变化。

```javascript
import { RouteMonitor } from "./parser";

const monitor = new RouteMonitor();

// 开始监控
monitor.startMonitoring();

// 停止监控
monitor.stopMonitoring();

// 获取统计信息
const stats = monitor.getRouteStats();
```

## 使用方法

### 1. 基本使用

```javascript
// 导入工具
import { RouteParser, RouteMonitor } from "./parser";

// 创建解析器实例
const parser = new RouteParser();

// 分析当前DOM
const domAnalysis = parser.extractRoutesFromDOM();
console.log("发现的路由数量:", domAnalysis.totalRoutes);
console.log("路由路径:", domAnalysis.routePaths);

// 分析当前路由状态
const currentRoute = parser.analyzeCurrentRoute();
console.log("当前路径:", currentRoute.currentPath);
```

### 2. 实时监控

```javascript
// 创建监控器
const monitor = new RouteMonitor();

// 开始监控
monitor.startMonitoring();

// 监听路由变化事件
window.addEventListener("routeChange", (event) => {
  console.log("路由变化:", event.detail);
});

// 获取路由历史
const history = monitor.getRouteHistory();
console.log("路由变化历史:", history);
```

### 3. React 组件使用

```jsx
import RouteAnalyzer from "./components/RouteAnalyzer";

function App() {
  return (
    <div>
      <RouteAnalyzer />
    </div>
  );
}
```

## API 参考

### RouteParser

#### `extractRoutesFromDOM()`

从 DOM 中提取路由信息。

**返回值:**

```javascript
{
  totalRoutes: number,      // 总路由数
  routePaths: string[],     // 路由路径数组
  method: string,          // 分析方法
  error?: string          // 错误信息（如果有）
}
```

#### `analyzeCurrentRoute()`

分析当前页面的路由状态。

**返回值:**

```javascript
{
  currentPath: string,     // 当前路径
  currentHash: string,     // 当前Hash
  currentSearch: string,   // 当前查询参数
  fullUrl: string,        // 完整URL
  timestamp: string       // 时间戳
}
```

### RouteMonitor

#### `startMonitoring()`

开始监控路由变化。

#### `stopMonitoring()`

停止监控路由变化。

#### `getRouteStats()`

获取路由统计信息。

**返回值:**

```javascript
{
  domAnalysis: object,     // DOM分析结果
  currentRoute: object,    // 当前路由状态
  routeHistory: array,     // 路由历史
  totalRouteChanges: number // 总变化次数
}
```

#### `getRouteHistory()`

获取路由变化历史。

## 演示页面

访问 `/demo` 路径可以查看路由分析工具的演示页面，其中包含：

- 功能特性介绍
- 当前项目路由信息
- 启动路由分析器的按钮

访问 `/analyzer` 路径可以直接使用路由分析工具。

## 注意事项

1. **DOM 分析限制**: 由于 React Router 的内部实现，某些路由信息可能无法完全通过 DOM 分析获取。建议结合代码审查来获得更准确的路由统计。

2. **浏览器兼容性**: 工具使用了现代浏览器 API，如 MutationObserver，在较旧的浏览器中可能不支持。

3. **性能考虑**: 实时监控会消耗一定的性能，建议在不需要时停止监控。

4. **路由类型**: 工具主要针对 React Router v6 设计，其他路由库可能需要适配。

## 扩展功能

### 自定义路由分析

```javascript
// 自定义路由配置分析
const customRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  {
    path: "/users",
    children: [{ path: "/users/:id", element: <UserDetail /> }],
  },
];

const result = parser.parseRoutes(customRoutes);
console.log("解析结果:", result);
```

### 路由变化回调

```javascript
// 自定义路由变化处理
monitor.onRouteChange = (routeInfo) => {
  // 自定义处理逻辑
  console.log("自定义路由变化处理:", routeInfo);
};
```

## 故障排除

### 常见问题

1. **无法检测到路由**: 确保页面使用了 React Router，并且路由组件已经渲染。

2. **监控不工作**: 检查浏览器是否支持 MutationObserver，或者是否有 JavaScript 错误。

3. **路由信息不完整**: 某些动态路由或嵌套路由可能无法完全检测，这是正常现象。

### 调试模式

```javascript
// 启用调试模式
const parser = new RouteParser();
parser.debug = true;

// 查看详细日志
const result = parser.extractRoutesFromDOM();
```

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个工具！

## 许可证

MIT License
