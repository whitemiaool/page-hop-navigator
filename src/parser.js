/**
 * React Router 路由解析器
 * 用于识别和统计React项目中的路由数量
 */

class RouteParser {
  constructor() {
    this.routes = [];
    this.routeCount = 0;
    this.nestedRoutes = 0;
  }

  /**
   * 解析路由配置
   * @param {Object} routesConfig - React Router的Routes配置
   * @returns {Object} 解析结果
   */
  parseRoutes(routesConfig) {
    this.routes = [];
    this.routeCount = 0;
    this.nestedRoutes = 0;

    if (!routesConfig || !Array.isArray(routesConfig)) {
      return this.getResult();
    }

    this._parseRouteArray(routesConfig);
    return this.getResult();
  }

  /**
   * 递归解析路由数组
   * @param {Array} routes - 路由数组
   * @param {string} parentPath - 父路径
   */
  _parseRouteArray(routes, parentPath = "") {
    routes.forEach((route) => {
      this._parseSingleRoute(route, parentPath);
    });
  }

  /**
   * 解析单个路由
   * @param {Object} route - 路由对象
   * @param {string} parentPath - 父路径
   */
  _parseSingleRoute(route, parentPath = "") {
    if (!route) return;

    const routeInfo = {
      path: route.path || "",
      fullPath: parentPath + (route.path || ""),
      element: route.element,
      index: route.index || false,
      children: route.children || [],
      caseSensitive: route.caseSensitive || false,
    };

    // 统计路由数量
    this.routeCount++;
    this.routes.push(routeInfo);

    // 处理嵌套路由
    if (
      route.children &&
      Array.isArray(route.children) &&
      route.children.length > 0
    ) {
      this.nestedRoutes++;
      const childParentPath =
        routeInfo.fullPath === "/" ? "" : routeInfo.fullPath;
      this._parseRouteArray(route.children, childParentPath);
    }
  }

  /**
   * 获取解析结果
   * @returns {Object} 解析结果
   */
  getResult() {
    return {
      totalRoutes: this.routeCount,
      nestedRoutes: this.nestedRoutes,
      flatRoutes: this.routeCount - this.nestedRoutes,
      routes: this.routes,
      summary: {
        total: this.routeCount,
        nested: this.nestedRoutes,
        flat: this.routeCount - this.nestedRoutes,
      },
    };
  }

  /**
   * 从DOM中提取路由信息（运行时分析）
   * @returns {Object} 路由信息
   */
  extractRoutesFromDOM() {
    try {
      // 查找React Router的Routes组件
      const routesElements = document.querySelectorAll("[data-rr-ui]");
      const routerElements = document.querySelectorAll("[data-router]");

      let routeCount = 0;
      let routePaths = [];

      // 尝试从DOM属性中提取路由信息
      routesElements.forEach((element) => {
        const path =
          element.getAttribute("data-path") ||
          element.getAttribute("path") ||
          element.getAttribute("href");
        if (path) {
          routeCount++;
          routePaths.push(path);
        }
      });

      // 查找所有可能的导航链接
      const navLinks = document.querySelectorAll('a[href], [role="link"]');
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("/") && !routePaths.includes(href)) {
          routeCount++;
          routePaths.push(href);
        }
      });

      return {
        totalRoutes: routeCount,
        routePaths: [...new Set(routePaths)],
        method: "DOM Analysis",
      };
    } catch (error) {
      console.error("从DOM提取路由信息失败:", error);
      return {
        totalRoutes: 0,
        routePaths: [],
        method: "DOM Analysis Failed",
        error: error.message,
      };
    }
  }

  /**
   * 分析当前页面的路由状态
   * @returns {Object} 当前路由状态
   */
  analyzeCurrentRoute() {
    try {
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      const currentSearch = window.location.search;

      return {
        currentPath,
        currentHash,
        currentSearch,
        fullUrl: window.location.href,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("分析当前路由状态失败:", error);
      return {
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

/**
 * React Router 路由监控器
 * 用于实时监控路由变化
 */
class RouteMonitor {
  constructor() {
    this.parser = new RouteParser();
    this.routeHistory = [];
    this.isMonitoring = false;
  }

  /**
   * 开始监控路由变化
   */
  startMonitoring() {
    if (this.isMonitoring) return;

    this.isMonitoring = true;

    // 监听popstate事件（浏览器前进后退）
    window.addEventListener("popstate", this._handleRouteChange.bind(this));

    // 监听hashchange事件
    window.addEventListener("hashchange", this._handleRouteChange.bind(this));

    // 使用MutationObserver监听DOM变化
    this._observeDOMChanges();

    console.log("路由监控已启动");
  }

  /**
   * 停止监控
   */
  stopMonitoring() {
    this.isMonitoring = false;
    if (this.observer) {
      this.observer.disconnect();
    }
    console.log("路由监控已停止");
  }

  /**
   * 处理路由变化
   */
  _handleRouteChange() {
    const routeInfo = this.parser.analyzeCurrentRoute();
    this.routeHistory.push(routeInfo);

    console.log("路由变化:", routeInfo);

    // 触发自定义事件
    window.dispatchEvent(
      new CustomEvent("routeChange", {
        detail: routeInfo,
      })
    );
  }

  /**
   * 监听DOM变化
   */
  _observeDOMChanges() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // 检查是否有新的路由相关元素
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const routeElements =
                node.querySelectorAll &&
                node.querySelectorAll("[data-rr-ui], [data-router], a[href]");
              if (routeElements && routeElements.length > 0) {
                this._handleRouteChange();
              }
            }
          });
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /**
   * 获取路由历史
   */
  getRouteHistory() {
    return this.routeHistory;
  }

  /**
   * 获取路由统计
   */
  getRouteStats() {
    const domAnalysis = this.parser.extractRoutesFromDOM();
    const currentRoute = this.parser.analyzeCurrentRoute();

    return {
      domAnalysis,
      currentRoute,
      routeHistory: this.routeHistory,
      totalRouteChanges: this.routeHistory.length,
    };
  }
}

// 导出工具类
export { RouteParser, RouteMonitor };

// 创建全局实例（可选）
if (typeof window !== "undefined") {
  window.RouteParser = RouteParser;
  window.RouteMonitor = RouteMonitor;

  // 自动创建监控器实例
  window.routeMonitor = new RouteMonitor();
}
