import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RouteAnalysisDemo = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">React 路由分析工具</h1>
            <p className="text-xl text-muted-foreground">识别和统计React项目中的路由数量</p>
          </div>

          <Card className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">功能特性</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">实时DOM分析 - 自动扫描页面中的路由元素</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">路由监控 - 跟踪路由变化并记录历史</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">当前状态 - 显示当前页面的路由信息</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">统计分析 - 提供详细的路由统计报告</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Link to="/analyzer">
              <Button size="lg" className="text-lg px-8 py-3">
                启动路由分析器 →
              </Button>
            </Link>

            <div className="text-sm text-muted-foreground">
              点击按钮进入路由分析工具
            </div>
          </div>

          <Card className="p-6">
            <CardHeader>
              <CardTitle>当前项目路由信息</CardTitle>
              <CardDescription>
                基于代码分析的路由配置
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">总路由数</div>
                </div>
                <div className="text-center p-4 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-sm text-muted-foreground">页面路由</div>
                </div>
                <div className="text-center p-4 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">1</div>
                  <div className="text-sm text-muted-foreground">通配符路由</div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h4 className="font-medium">已配置的路由:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-mono">/</span>
                    <span className="text-sm text-muted-foreground">首页</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-mono">/about</span>
                    <span className="text-sm text-muted-foreground">关于页面</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-mono">/analyzer</span>
                    <span className="text-sm text-muted-foreground">路由分析器</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-background rounded">
                    <span className="font-mono">*</span>
                    <span className="text-sm text-muted-foreground">404页面</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">
                ← 返回首页
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline">
                关于页面 →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteAnalysisDemo; 