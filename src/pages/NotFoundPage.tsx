
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-playfair font-bold text-cocast-sage mb-6">404</h1>
          <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
          <p className="mb-8 text-cocast-brown/80">
            Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-cocast-sage hover:bg-cocast-darkSage text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
