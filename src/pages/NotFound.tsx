
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { animate } from "@/lib/animations";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-md text-center py-16">
        <div className={animate('scale-in')}>
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold">404</span>
          </div>
        </div>
        
        <h1 className={`text-2xl font-bold mb-3 ${animate('slide-up', 1)}`}>
          Page not found
        </h1>
        
        <p className={`text-muted-foreground mb-8 ${animate('slide-up', 2)}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className={animate('slide-up', 3)}>
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
