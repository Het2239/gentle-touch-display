
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Text Content */}
          <motion.div 
            className="md:w-1/2 md:pr-8 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-sm font-medium text-cocast-darkSage mb-4 tracking-wider">NATURE'S TOUCH IN EVERY DROP</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight">
              The Essence of Nature in Your Daily Routine
            </h1>
            <p className="text-lg text-cocast-brown/80 mb-8 max-w-lg">
              Discover our collection of all-natural personal care products, crafted with sustainable ingredients that care for your skin and our planet.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="inline-block bg-cocast-sage hover:bg-cocast-darkSage text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Explore Products
              </Link>
              <Link 
                to="/about" 
                className="inline-block bg-transparent hover:bg-cocast-beige border border-cocast-sage text-cocast-sage hover:text-cocast-brown font-medium py-3 px-6 rounded-md transition-colors"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?q=80&w=2070&auto=format&fit=crop"
                alt="Cocast natural products showcase" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cocast-lightSage rounded-full -z-10"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-cocast-beige rounded-full -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
