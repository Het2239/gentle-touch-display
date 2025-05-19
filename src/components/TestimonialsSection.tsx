
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Cocast's products have transformed my skincare routine. The Revitalizing Serum has made my skin noticeably more radiant and hydrated.",
    author: "Sarah L.",
    role: "Loyal Customer"
  },
  {
    id: 2,
    quote: "I appreciate the commitment to sustainability. The products are effective and I feel good knowing I'm supporting an environmentally conscious brand.",
    author: "Michael T.",
    role: "Eco-enthusiast"
  },
  {
    id: 3,
    quote: "As someone with sensitive skin, I've struggled to find products that don't cause irritation. Cocast's gentle formulations are the perfect solution.",
    author: "Elena R.",
    role: "Beauty Blogger"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    
    if (!isPaused) {
      timerRef.current = window.setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
  };
  
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [activeIndex, isPaused]);
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Our Customers Say
          </motion.h2>
        </div>
        
        <div 
          className="max-w-3xl mx-auto relative px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-10 text-5xl text-cocast-sage/30 font-serif">"</div>
            <div className="absolute -bottom-16 -right-6 text-5xl text-cocast-sage/30 font-serif">"</div>
            
            {/* Testimonials */}
            <div className="relative overflow-hidden h-52">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  className="absolute w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: idx === activeIndex ? 1 : 0,
                    y: idx === activeIndex ? 0 : 20,
                    zIndex: idx === activeIndex ? 1 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="text-center">
                    <p className="text-xl text-cocast-brown font-light italic mb-6">
                      {testimonial.quote}
                    </p>
                    <footer>
                      <p className="font-medium text-cocast-darkSage">{testimonial.author}</p>
                      <p className="text-sm text-cocast-brown/70">{testimonial.role}</p>
                    </footer>
                  </blockquote>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-cocast-sage w-8' : 'bg-cocast-sage/30'
                }`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
