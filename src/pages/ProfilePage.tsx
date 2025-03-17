
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from "@/data/orders";

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  // Get user's orders
  const userOrders = orders.filter(order => order.userId === user?.id);

  return (
    <div className="container-custom py-12 max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl md:text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-medium text-lg">Profile Information</h2>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    disabled
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="pt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Full Name</h3>
                    <p>{user?.displayName || "Not provided"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Email Address</h3>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Phone Number</h3>
                    <p>{user?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Address</h3>
                    <p>{user?.address || "Not provided"}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 pt-8 border-t">
              <Button variant="destructive" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-medium text-lg mb-6">Order History</h2>
            
            {userOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                <Button asChild>
                  <a href="/products">Browse Products</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="border rounded-md p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          Status: <span className="text-accent">{order.status}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <p>{item.name} ({item.quantity}x)</p>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
