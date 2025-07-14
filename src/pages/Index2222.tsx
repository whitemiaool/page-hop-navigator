import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-4">欢迎来到首页</h1>
            <p className="text-xl text-muted-foreground">这是一个支持页面跳转的示例应用</p>
          </div>

          <Card className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">功能特色</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">使用 React Router 实现页面导航</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">History 路由模式，支持浏览器前进后退</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">响应式设计，适配各种设备</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">现代化的 UI 组件库</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <div className="flex gap-4 justify-center">
              <Link to="/about">
                <Button size="lg" className="text-lg px-8 py-3">
                  了解更多 →
                </Button>
              </Link>
              <Link to="/demo">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  路由分析工具
                </Button>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              点击按钮跳转到不同页面
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
