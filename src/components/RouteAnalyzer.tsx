import { useState, useEffect } from 'react';
import { RouteParser, RouteMonitor } from '../parser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

interface DOMAnalysis {
  totalRoutes: number;
  routePaths: string[];
  method: string;
  error?: string;
}

interface CurrentRoute {
  currentPath: string;
  currentHash: string;
  currentSearch: string;
  fullUrl: string;
  timestamp: string;
}

const RouteAnalyzer = () => {
  const [domAnalysis, setDomAnalysis] = useState<DOMAnalysis | null>(null);
  const [currentRoute, setCurrentRoute] = useState<CurrentRoute | null>(null);
  const [routeHistory, setRouteHistory] = useState<CurrentRoute[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitor, setMonitor] = useState<RouteMonitor | null>(null);

  useEffect(() => {
    // 初始化解析器
    const parser = new RouteParser();

    // 分析当前DOM中的路由
    const domResult = parser.extractRoutesFromDOM();
    setDomAnalysis(domResult);

    // 分析当前路由状态
    const currentRouteInfo = parser.analyzeCurrentRoute();
    setCurrentRoute(currentRouteInfo);

    // 创建监控器
    const routeMonitor = new RouteMonitor();
    setMonitor(routeMonitor);

    // 监听路由变化事件
    const handleRouteChange = (event: CustomEvent) => {
      setCurrentRoute(event.detail);
      setRouteHistory(prev => [...prev, event.detail]);
    };

    window.addEventListener('routeChange', handleRouteChange as EventListener);

    return () => {
      window.removeEventListener('routeChange', handleRouteChange as EventListener);
      if (routeMonitor) {
        routeMonitor.stopMonitoring();
      }
    };
  }, []);

  const startMonitoring = () => {
    if (monitor) {
      monitor.startMonitoring();
      setIsMonitoring(true);
    }
  };

  const stopMonitoring = () => {
    if (monitor) {
      monitor.stopMonitoring();
      setIsMonitoring(false);
    }
  };

  const analyzeRoutes = () => {
    if (monitor) {
      const stats = monitor.getRouteStats();
      setRouteHistory(stats.routeHistory);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">React 路由分析器</h1>
        <div className="flex gap-2">
          <Button
            onClick={startMonitoring}
            disabled={isMonitoring}
            variant="default"
          >
            开始监控
          </Button>
          <Button
            onClick={stopMonitoring}
            disabled={!isMonitoring}
            variant="destructive"
          >
            停止监控
          </Button>
          <Button onClick={analyzeRoutes} variant="outline">
            重新分析
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* DOM分析结果 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              DOM分析结果
              <span className={`px-2 py-1 text-xs rounded-full ${domAnalysis?.error ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                {domAnalysis?.method || '未知'}
              </span>
            </CardTitle>
            <CardDescription>
              从DOM中提取的路由信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            {domAnalysis ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>总路由数:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                    {domAnalysis.totalRoutes}
                  </span>
                </div>
                {domAnalysis.routePaths.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">发现的路由路径:</p>
                    <ScrollArea className="h-32">
                      <div className="space-y-1">
                        {domAnalysis.routePaths.map((path, index) => (
                          <div key={index} className="text-sm bg-muted p-2 rounded">
                            {path}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
                {domAnalysis.error && (
                  <p className="text-sm text-red-600">{domAnalysis.error}</p>
                )}
              </div>
            ) : (
              <p className="text-muted">正在分析...</p>
            )}
          </CardContent>
        </Card>

        {/* 当前路由状态 */}
        <Card>
          <CardHeader>
            <CardTitle>当前路由状态</CardTitle>
            <CardDescription>
              当前页面的路由信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentRoute ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>路径:</span>
                  <code className="text-sm bg-muted px-2 py-1 rounded">
                    {currentRoute.currentPath}
                  </code>
                </div>
                {currentRoute.currentHash && (
                  <div className="flex justify-between">
                    <span>Hash:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {currentRoute.currentHash}
                    </code>
                  </div>
                )}
                {currentRoute.currentSearch && (
                  <div className="flex justify-between">
                    <span>查询参数:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {currentRoute.currentSearch}
                    </code>
                  </div>
                )}
                <div className="text-xs text-muted mt-2">
                  {new Date(currentRoute.timestamp).toLocaleString()}
                </div>
              </div>
            ) : (
              <p className="text-muted">无法获取当前路由信息</p>
            )}
          </CardContent>
        </Card>

        {/* 监控状态 */}
        <Card>
          <CardHeader>
            <CardTitle>监控状态</CardTitle>
            <CardDescription>
              路由变化监控信息
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>监控状态:</span>
                <span className={`px-2 py-1 text-xs rounded-full ${isMonitoring ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                  {isMonitoring ? "运行中" : "已停止"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>路由变化次数:</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                  {routeHistory.length}
                </span>
              </div>
              <Separator />
              <p className="text-sm text-muted">
                {isMonitoring
                  ? "正在监控路由变化，所有变化都会记录在历史中"
                  : "点击开始监控来跟踪路由变化"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 路由历史 */}
      {routeHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>路由变化历史</CardTitle>
            <CardDescription>
              记录的所有路由变化
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {routeHistory.map((route, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                    <div className="flex-1">
                      <div className="font-medium">{route.currentPath}</div>
                      <div className="text-sm text-muted">
                        {new Date(route.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>这个工具可以帮助你分析React项目中的路由情况：</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>DOM分析</strong>: 自动扫描页面中的路由相关元素</li>
              <li><strong>实时监控</strong>: 跟踪路由变化并记录历史</li>
              <li><strong>当前状态</strong>: 显示当前页面的路由信息</li>
              <li><strong>路由历史</strong>: 查看所有路由变化的记录</li>
            </ul>
            <p className="text-muted mt-4">
              注意：由于React Router的内部实现，某些路由信息可能无法完全获取。
              建议结合代码审查来获得更准确的路由统计。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteAnalyzer; 