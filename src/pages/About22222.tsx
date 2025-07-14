import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link to="/">
            <Button variant="outline">← 返回首页</Button>
          </Link>
        </nav>
        
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">关于我们</h1>
            <p className="text-xl text-muted-foreground">了解更多关于我们的信息</p>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-4">我们的使命</h2>
            <p className="text-muted-foreground mb-6 bg-red-bg p-4 rounded-lg">
              我们致力于创造优秀的用户体验，通过创新的技术和设计，为用户提供最好的服务。
              我们相信技术的力量可以改变世界，让生活变得更加美好。
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">我们的团队</h2>
            <p className="text-muted-foreground mb-6">
              我们拥有一支充满激情和创造力的团队，每个成员都在为实现共同的目标而努力。
              我们重视团队合作，追求卓越，不断学习和成长。
            </p>

            <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
            <p className="text-muted-foreground">
              如果您有任何问题或建议，欢迎随时与我们联系。我们期待听到您的声音。
            </p>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button size="lg">回到首页</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;