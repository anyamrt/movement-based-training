import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Professional",
      text: "James's approach to training is completely different from anything I've tried before. The variety keeps me engaged, and I've gained strength and mobility I didn't think was possible.",
      rating: 5
    },
    {
      name: "Michael T.",
      role: "Software Developer",
      text: "After years of desk work, my body was a mess. James helped me understand how to move properly again. The 'leveling up' approach really resonates with me!",
      rating: 5
    },
    {
      name: "Emma L.",
      role: "Yoga Instructor",
      text: "As someone who teaches movement, I appreciate James's depth of knowledge. He's introduced me to tools and techniques that have enhanced my own practice immensely.",
      rating: 5
    },
    {
      name: "David R.",
      role: "Business Owner",
      text: "Training with James isn't just about getting stronger—it's about moving better in everyday life. I feel more capable and confident in everything I do.",
      rating: 5
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Client Success Stories
          </h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what clients are saying about their transformation
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <div className="bg-gradient-to-br from-brand-light to-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                    {/* Rating Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-brand-orange" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Author */}
                    <div className="text-center">
                      <p className="font-semibold text-lg text-brand-dark">{testimonial.name}</p>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-white hover:bg-brand-primary text-brand-dark hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-white hover:bg-brand-primary text-brand-dark hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex ? 'bg-brand-primary w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
