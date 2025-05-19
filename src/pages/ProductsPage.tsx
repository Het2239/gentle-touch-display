
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

// Sample product data
const products = [
  {
    id: "revitalizing-serum",
    name: "Revitalizing Serum",
    description: "A potent blend of botanical extracts that hydrate and restore skin elasticity.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=1374&auto=format&fit=crop",
    category: "Skincare"
  },
  {
    id: "nourishing-shampoo",
    name: "Nourishing Shampoo",
    description: "Gentle cleansing with aloe vera and avocado oil for soft, healthy hair.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1374&auto=format&fit=crop",
    category: "Hair Care"
  },
  {
    id: "calming-body-oil",
    name: "Calming Body Oil",
    description: "Luxurious oil infused with lavender and chamomile to soothe and moisturize.",
    image: "https://images.unsplash.com/photo-1608248511213-a66753155c1b?q=80&w=1374&auto=format&fit=crop",
    category: "Body"
  },
  {
    id: "hydrating-face-cream",
    name: "Hydrating Face Cream",
    description: "Rich in natural oils and butters to provide deep hydration for all skin types.",
    image: "https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d5?q=80&w=1374&auto=format&fit=crop",
    category: "Skincare"
  },
  {
    id: "refreshing-facial-toner",
    name: "Refreshing Facial Toner",
    description: "Alcohol-free formula with rosewater and witch hazel to balance and refresh skin.",
    image: "https://images.unsplash.com/photo-1614806687007-2215a9db3b1b?q=80&w=1528&auto=format&fit=crop",
    category: "Skincare"
  },
  {
    id: "moisturizing-body-wash",
    name: "Moisturizing Body Wash",
    description: "Gentle cleansing with coconut-derived surfactants and essential oils.",
    image: "https://images.unsplash.com/photo-1611080541379-5adb1c5a4481?q=80&w=1335&auto=format&fit=crop",
    category: "Body"
  },
  {
    id: "restorative-hair-mask",
    name: "Restorative Hair Mask",
    description: "Deep conditioning treatment with argan oil and shea butter for damaged hair.",
    image: "https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?q=80&w=1374&auto=format&fit=crop",
    category: "Hair Care"
  },
  {
    id: "gentle-exfoliating-scrub",
    name: "Gentle Exfoliating Scrub",
    description: "Natural bamboo particles and fruit enzymes to gently remove dead skin cells.",
    image: "https://images.unsplash.com/photo-1606308636848-90667f0704d1?q=80&w=1300&auto=format&fit=crop",
    category: "Skincare"
  }
];

const categories = ["All", "Skincare", "Hair Care", "Body"];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Our Products</h1>
          <p className="max-w-2xl mx-auto text-cocast-brown/80">
            Explore our collection of natural personal care products, crafted with sustainable ingredients and thoughtful formulations.
          </p>
          
          {/* Category Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-cocast-sage text-white' 
                    : 'bg-cocast-cream text-cocast-brown hover:bg-cocast-beige'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-cocast-brown/70">No products found in this category.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;
