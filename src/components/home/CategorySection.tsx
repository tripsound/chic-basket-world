
import { Link } from "react-router-dom";

const categories = [
  { name: "Women", image: "https://images.unsplash.com/photo-1619086303291-0ef7699e4b31?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww", link: "/products?category=women" },
  { name: "Men", image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", link: "/products?category=men" },
  { name: "Shoes", image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", link: "/products?category=shoes" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1624623278313-a930126a11c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", link: "/products?category=accessories" },
];

const CategorySection = () => {
  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group block relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-serif text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
