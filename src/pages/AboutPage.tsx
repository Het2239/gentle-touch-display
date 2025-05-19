
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      {/* Hero Section */}
      <section className="bg-cocast-cream/60 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Our Story</h1>
            <p className="text-lg text-cocast-brown/80">
              Discover the journey, mission, and values that make Cocast a leader in natural personal care.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              {...fadeIn}
            >
              <img 
                src="https://images.unsplash.com/photo-1572006614644-78795a9d6e50?q=80&w=1470&auto=format&fit=crop"
                alt="Cocast team working with natural ingredients" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-6">Our Mission</h2>
              <div className="space-y-4 text-cocast-brown/80">
                <p>
                  At Cocast, our mission is to create exceptional personal care products that harness the power of nature while preserving our planet for future generations.
                </p>
                <p>
                  We believe that what goes on your body is just as important as what goes in it. That's why we're committed to using only the finest natural ingredients, sourced ethically and sustainably from around the world.
                </p>
                <p>
                  Our formulations are created with intention, combining ancient botanical wisdom with modern scientific research to deliver effective products that nurture both you and the environment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-cocast-beige/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-playfair font-bold mb-4">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-cocast-brown/80">
              These principles guide everything we do, from product formulation to business practices.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-cocast-lightSage rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cocast-darkSage">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Natural Integrity</h3>
              <p className="text-cocast-brown/80">
                We are committed to using only natural, high-quality ingredients that benefit both your skin and the environment. No harmful chemicals, synthetic fragrances, or fillers.
              </p>
            </motion.div>
            
            {/* Value 2 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-cocast-lightSage rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cocast-darkSage">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Environmental Stewardship</h3>
              <p className="text-cocast-brown/80">
                We're dedicated to sustainable practices at every step, from responsible sourcing to eco-friendly packaging and carbon-neutral shipping options.
              </p>
            </motion.div>
            
            {/* Value 3 */}
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-cocast-lightSage rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cocast-darkSage">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Ethical Compassion</h3>
              <p className="text-cocast-brown/80">
                We never test on animals and ensure our supply chain meets the highest ethical standards. We also give back by supporting conservation and community initiatives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1374&auto=format&fit=crop"
                alt="Cocast founder" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-6">Our Beginnings</h2>
              <div className="space-y-4 text-cocast-brown/80">
                <p>
                  Cocast was founded in 2018 by Emma Chen, a botanist and holistic wellness practitioner who was frustrated by the lack of truly natural personal care products on the market.
                </p>
                <p>
                  Emma began crafting her own formulations in her kitchen, using knowledge passed down from her grandmother who was an herbalist, combined with her scientific background in plant biology.
                </p>
                <p>
                  What started as a small batch production for friends and family quickly grew as word spread about the effectiveness of these simple, natural formulas. Today, Cocast remains committed to its founding principles while bringing nature's touch to customers worldwide.
                </p>
              </div>
              
              <blockquote className="border-l-4 border-cocast-sage pl-4 mt-6 italic">
                <p className="text-cocast-brown">
                  "I believe that nature provides everything we need for healthy skin and hair. My mission is to harness these gifts while protecting the environment that gives them to us."
                </p>
                <footer className="mt-2 text-sm">— Emma Chen, Founder</footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-cocast-sage text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-playfair font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Join Our Journey
            </motion.h2>
            
            <motion.p 
              className="text-lg mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience the Cocast difference with our collection of natural, sustainable personal care products crafted with care for you and our planet.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="/products"
                className="inline-block bg-white text-cocast-darkSage hover:bg-cocast-cream hover:text-cocast-sage font-medium py-3 px-8 rounded-md transition-colors"
              >
                Explore Our Products
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
