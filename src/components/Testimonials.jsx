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
                        <svg key={i} className="w-6 h-6 text-brand-yellow" fill="currentColor" viewBox="0 0 20 20">
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

        {/* Google Reviews Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-brand-light to-white rounded-3xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">
              See More Reviews on Google
            </h3>
            <p className="text-gray-600 mb-6">
              Read what our clients are saying on Google and leave your own review
            </p>
            <a
              href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 py-4 px-8 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none">
                <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
                <path d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
                <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
                <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
              </svg>
              <span>Read Reviews on Google</span>
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Note: Update the Google Business Profile link above
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
