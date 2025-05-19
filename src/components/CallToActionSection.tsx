
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-cocast-sage text-white relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Experience the Cocast Difference
          </motion.h2>
          
          <motion.p 
            className="text-lg mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our collection of natural personal care products, crafted with sustainable ingredients and mindful practices. Let nature care for you.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/products"
              className="inline-block bg-white text-cocast-darkSage hover:bg-cocast-cream hover:text-cocast-sage font-medium py-3 px-8 rounded-md transition-colors"
            >
              Explore Our Products
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
