
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="py-16 bg-cocast-cream/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Column */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586767003402-8ade266deb64?q=80&w=1587&auto=format&fit=crop"
                alt="Cocast sustainable practices" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-white rounded-full -z-10"></div>
              <div className="absolute -top-5 -left-5 w-24 h-24 bg-cocast-beige rounded-full -z-10"></div>
            </div>
          </motion.div>
          
          {/* Text Column */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-medium text-cocast-darkSage mb-4 tracking-wider">OUR PHILOSOPHY</span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Sustainable Beauty, Naturally</h2>
            <div className="space-y-4 text-cocast-brown/80">
              <p>
                At Cocast, we believe that personal care should be in harmony with nature. Our products are crafted with sustainably sourced ingredients, free from harsh chemicals, and packaged with minimal environmental impact.
              </p>
              <p>
                Every formula is developed with intention, combining ancient botanical wisdom with modern scientific research to create products that are effective, gentle, and kind to our planet.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Feature 1 */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-cocast-lightSage rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cocast-darkSage">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">All Natural</h3>
                <p className="text-sm text-cocast-brown/70">Ingredients sourced directly from nature</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-cocast-lightSage rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cocast-darkSage">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Cruelty Free</h3>
                <p className="text-sm text-cocast-brown/70">Never tested on animals</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-cocast-lightSage rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cocast-darkSage">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Eco-Friendly</h3>
                <p className="text-sm text-cocast-brown/70">Sustainable packaging solutions</p>
              </div>
            </div>
            
            <div className="mt-8">
              <a 
                href="/about" 
                className="inline-block bg-white hover:bg-cocast-beige border border-cocast-sage text-cocast-sage hover:text-cocast-darkSage font-medium py-2 px-6 rounded-md transition-colors"
              >
                Learn More About Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
