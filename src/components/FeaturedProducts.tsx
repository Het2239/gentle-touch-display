
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

// Sample product data
const featuredProducts = [
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
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-cocast-cream to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-cocast-brown/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our most loved natural formulations, created with sustainable ingredients and packaged in eco-friendly materials.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="/products" 
              className="inline-block border-b-2 border-cocast-sage text-cocast-sage hover:border-cocast-darkSage hover:text-cocast-darkSage font-medium transition-colors"
            >
              View all products →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
