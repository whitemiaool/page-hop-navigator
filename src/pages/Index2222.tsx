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

          {/* 卡片列表 */}
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">精选服务</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-xl font-semibold ml-3">快速部署</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  一键部署应用，快速上线您的项目，节省开发时间。
                </p>
                <Button variant="outline" className="w-full">了解详情</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-secondary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold ml-3">云端存储</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  安全可靠的云端存储服务，保障您的数据安全。
                </p>
                <Button variant="outline" className="w-full">了解详情</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-accent rounded-sm"></div>
                  </div>
                  <h3 className="text-xl font-semibold ml-3">数据分析</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  强大的数据分析工具，帮助您洞察业务趋势。
                </p>
                <Button variant="outline" className="w-full">了解详情</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-muted-foreground rounded-lg"></div>
                  </div>
                  <h3 className="text-xl font-semibold ml-3">API 集成</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  丰富的API接口，轻松集成第三方服务。
                </p>
                <Button variant="outline" className="w-full">了解详情</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-semibold ml-3">团队协作</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  高效的团队协作工具，提升工作效率。
                </p>
                <Button variant="outline" className="w-full">了解详情</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-secondary rounded"></div>
                  </div>
                  <h3 className="text-xl font-semibold ml-3">24/7 支持</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  全天候技术支持，确保您的服务稳定运行。
                </p>
                <Button variant="outline" className="w-full">了解详情</Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
