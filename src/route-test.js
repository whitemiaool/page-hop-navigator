// 路由解析工具测试文件
import {
  routeParser,
  parseRoutes,
  getRouteInfo,
  validateRouteConfig,
} from "./parser.js";

// 测试解析当前项目的路由
console.log("=== 路由解析工具测试 ===\n");

// 1. 解析当前路由配置
console.log("1. 当前路由配置:");
const currentRoutes = parseRoutes();
console.log(JSON.stringify(currentRoutes, null, 2));

// 2. 获取完整的路由信息
console.log("\n2. 完整路由信息:");
const routeInfo = getRouteInfo();
console.log("当前路由:", JSON.stringify(routeInfo.currentRoutes, null, 2));
console.log("页面文件:", JSON.stringify(routeInfo.pageFiles, null, 2));
console.log("未使用的页面:", JSON.stringify(routeInfo.unusedPages, null, 2));
console.log("路由建议:", JSON.stringify(routeInfo.suggestions, null, 2));

// 3. 验证路由配置
console.log("\n3. 路由配置验证:");
const validation = validateRouteConfig(currentRoutes);
console.log("配置是否有效:", validation.isValid);
if (validation.issues.length > 0) {
  console.log("发现的问题:");
  validation.issues.forEach((issue) => {
    console.log(`- ${issue.type}: ${issue.message}`);
  });
}

// 4. 生成路由数组（用于导航等用途）
console.log("\n4. 路由数组（用于导航）:");
const navigationRoutes = currentRoutes.map((route) => ({
  path: route.path,
  name: route.component,
  type: route.type,
}));
console.log(JSON.stringify(navigationRoutes, null, 2));

// 5. 生成路由映射对象
console.log("\n5. 路由映射对象:");
const routeMap = currentRoutes.reduce((acc, route) => {
  acc[route.path] = {
    component: route.component,
    type: route.type,
  };
  return acc;
}, {});
console.log(JSON.stringify(routeMap, null, 2));

export { currentRoutes, routeInfo, navigationRoutes, routeMap };
