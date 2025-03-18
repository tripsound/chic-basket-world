
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingBag, Users } from "lucide-react";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    newProducts: 0,
    saleProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total products count
        const { count: totalCount, error: totalError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        // Fetch featured products count
        const { count: featuredCount, error: featuredError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('featured', true);

        // Fetch new products count
        const { count: newCount, error: newError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('new', true);

        // Fetch sale products count
        const { count: saleCount, error: saleError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('sale', true);

        if (totalError || featuredError || newError || saleError) {
          throw new Error("Error fetching statistics");
        }

        setStats({
          totalProducts: totalCount || 0,
          featuredProducts: featuredCount || 0,
          newProducts: newCount || 0,
          saleProducts: saleCount || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newProducts}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sale Products</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.saleProducts}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
