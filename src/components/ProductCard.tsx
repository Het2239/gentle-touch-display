
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, description, image, category }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/products/${id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-cocast-cream/90 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-cocast-brown rounded">
            {category}
          </span>
        </div>
        
        <div className="p-4">
          <h3 className="font-playfair text-lg font-medium">{name}</h3>
          <p className="mt-1 text-sm text-cocast-brown/70 line-clamp-2">{description}</p>
          
          <motion.div 
            className="mt-3 flex items-center text-cocast-darkSage text-sm font-medium"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <span>View details</span>
            <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
