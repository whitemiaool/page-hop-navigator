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

          {/* 带背景图的卡片 */}
          <Card className="relative max-w-2xl mx-auto overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">探索无限可能</h2>
                  <p className="text-lg mb-6 text-white/90">
                    山峰在阳光照耀下展现出壮丽的景色，正如我们的应用为您带来无限的可能性。
                  </p>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                    开始探索
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
                    alt="海浪景色" 
                    className="w-32 h-32 rounded-lg object-cover border-2 border-white/30 shadow-lg"
                  />
                </div>
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
