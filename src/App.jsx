import React, { useEffect, useState } from 'react';
import { Star, Instagram, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Facebook, MessageCircle } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar scrollY={scrollY} />
      <HeroSection scrollY={scrollY} />
      <AboutSection />
      <ServicesSection />
      <BeforeAfterSection />
      <ReviewsSection />
      <BeautyBlogSection />
      <LocationSection />
      <CTASection />
      <BookingFormSection />
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/19496566750"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

const Navbar = ({ scrollY }) => {
  const isScrolled = scrollY > 50;
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md" style={{ backgroundColor: 'rgba(243, 239, 235, 0.95)' }}>
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-center md:justify-between h-16">

          <div className="flex items-center space-x-4 md:space-x-12 flex-1 justify-center overflow-x-auto">
            <button onClick={() => scrollToSection('home')} className="text-xs md:text-sm font-light hover:opacity-70 transition-all duration-300 whitespace-nowrap" style={{ color: '#b5945c' }}>
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="text-xs md:text-sm font-light hover:opacity-70 transition-all duration-300 whitespace-nowrap" style={{ color: '#b5945c' }}>
              About
            </button>
            <button onClick={() => scrollToSection('services')} className="text-xs md:text-sm font-light hover:opacity-70 transition-all duration-300 whitespace-nowrap" style={{ color: '#b5945c' }}>
              Services
            </button>
            <button onClick={() => scrollToSection('results')} className="text-xs md:text-sm font-light hover:opacity-70 transition-all duration-300 whitespace-nowrap" style={{ color: '#b5945c' }}>
              Results
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-xs md:text-sm font-light hover:opacity-70 transition-all duration-300 whitespace-nowrap" style={{ color: '#b5945c' }}>
              Reviews
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-xs md:text-sm font-light hover:opacity-70 transition-all duration-300 whitespace-nowrap" style={{ color: '#b5945c' }}>
              Contact
            </button>
          </div>

          <button className="hidden md:block px-8 py-2.5 rounded-full text-sm font-light tracking-wide 
                           hover:opacity-80 transition-all duration-500 shadow-sm hover:shadow-md" 
                  style={{ backgroundColor: '#b5945c', color: 'white' }}>
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ scrollY }) => {
  return (
    <section id="home" className="relative overflow-hidden bg-ivory pt-16 md:pt-0">
      <div className="absolute top-1/4 -right-32 md:-right-32 -right-20 z-0 opacity-[0.15] md:opacity-[0.15] opacity-[0.08]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[300px] md:w-[500px] h-auto"
        >
          <source src="/flowervid.mp4" type="video/mp4" />
        </video>
      </div>
      
      <div className="absolute top-1/3 -left-32 md:-left-32 -left-20 z-0 opacity-[0.12] md:opacity-[0.12] opacity-[0.06]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[250px] md:w-[400px] h-auto transform scale-x-[-1]"
        >
          <source src="/flowervid.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full relative z-10 fade-in-up">
        <img 
          src="/herooo.png" 
          alt="Hero" 
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 -right-32 z-0 opacity-[0.08]" style={{ mixBlendMode: 'multiply' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[400px] h-auto transform rotate-180"
        >
          <source src="/aboutusflower.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">About Atelier bei</h2>
            <div className="w-20 h-px bg-gold mx-auto"></div>
          </div>

          <p className="text-lg text-[#3A3A3A]/70 font-light leading-relaxed">
            My journey began with a love for helping others feel confident in their own skin, and today, 
            I specialize in creating perfectly tailored brows through the art of microblading.
          </p>

          <p className="text-base text-[#3A3A3A]/60 font-light leading-relaxed">
            To me, beauty is about balance, detail, and timeless elegance. Every set of brows I design is 
            approached with precision, artistry, and an understanding of how to enhance each client's natural 
            features. My mission is to deliver results that are not only flawless and refined, but also 
            effortlessly natural—brows that elevate your entire look and simplify your daily routine.
          </p>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const features = [
    'Consultation & Design',
    'Touch-up Sessions',
    'Aftercare Support',
    'Color Matching'
  ];

  return (
    <section id="services" className="py-16 bg-ivory relative overflow-hidden">
      <div className="absolute bottom-0 left-0 z-0 opacity-[0.18]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[400px] h-auto"
        >
          <source src="/flowervid.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Service</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-[#3A3A3A]/70 font-light leading-relaxed max-w-2xl mx-auto">
            We specialize in the art of microblading – creating perfectly sculpted, natural-looking 
            eyebrows that enhance your unique beauty.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 lg:p-10 rounded-lg shadow-md">
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <h3 className="text-4xl font-serif font-light text-[#3A3A3A]">Microblading Eyebrows</h3>
                <div className="w-16 h-px bg-gold/50 mx-auto"></div>
              </div>

              <p className="text-lg text-[#3A3A3A]/70 font-light leading-relaxed text-center mb-4">
                Our signature microblading technique creates hair-like strokes that blend seamlessly with 
                your natural brow hair, giving you perfectly shaped, fuller-looking eyebrows that last 12-18 months.
              </p>

              <div className="my-4">
                <img 
                  src="/beforeafter/services1.png" 
                  alt="Microblading Process" 
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-sm object-cover"
                  style={{ maxHeight: '400px' }}
                />
              </div>

              <div className="bg-beige/30 p-8 rounded-lg mt-4">
                <p className="text-center text-[#3A3A3A]/60 font-light mb-6">
                  Includes consultation, treatment, and 6-week touch-up session
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="text-[#3A3A3A]/70 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-4">
                <div className="inline-block relative">
                  <div className="absolute -top-8 -right-8 bg-gold text-white px-4 py-2 rounded-full text-sm font-light shadow-md transform rotate-12">
                    60% OFF
                  </div>
                  <div className="text-sm text-[#3A3A3A]/50 font-light mb-2">Investment</div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-3xl font-serif font-light text-[#3A3A3A]/40 line-through">$500</div>
                    <div className="text-5xl font-serif font-light text-gold">$200</div>
                  </div>
                  <div className="text-sm text-gold font-light mt-2">Limited Time Offer</div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button className="px-14 py-5 bg-gold text-white rounded-full font-light tracking-wide text-base
                                 hover:bg-opacity-90 transition-all duration-500 shadow-md hover:shadow-xl">
                  Book Your Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterSection = () => {
  const results = [
    '/beforeafter/before after 1.jpg',
    '/beforeafter/beforeafter2.jpg',
    '/beforeafter/before after3.jpg',
    '/beforeafter/baforeafter4.jpg',
    '/beforeafter/baforeafter5.jpg',
    '/beforeafter/before after6.jpg',
    '/beforeafter/beofre after7.jpg',
    '/beforeafter/beforeafter8.jpg'
  ];

  return (
    <section id="results" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 z-0 opacity-[0.08]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[400px] h-auto"
        >
          <source src="/aboutusflower.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Transformations</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-[#3A3A3A]/60 font-light">Real results, natural beauty</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {results.map((image, index) => (
            <div 
              key={index}
              className="group aspect-square bg-beige rounded-lg overflow-hidden hover:shadow-lg 
                       transition-all duration-300"
            >
              <img 
                src={image} 
                alt={`Before and After ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const reviews = [
    {
      name: 'Iman Issa',
      rating: 5,
      review: 'Services: Stylist: One of the best beauty experiences I\'ve had. Nisreen is extremely...',
      image: '/reviews/imanrev.png',
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Dima Hamdan',
      rating: 5,
      review: 'Microblading done here! The artist was extremely professional, took time to explain the whole process and made sure the shape and...',
      image: '/reviews/dima.png',
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Basma El Sarwy',
      rating: 5,
      review: 'Amazing experience and beautiful results!',
      image: '/reviews/basema.png',
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Sima',
      rating: 5,
      review: 'Professional service with stunning results!',
      image: null,
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Shatha Naneesh',
      rating: 5,
      review: 'Excellent work and very professional!',
      image: '/reviews/Shatha.png',
      timeAgo: '2 weeks ago'
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-32 bg-beige/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Google Reviews</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  className="min-w-full px-4"
                >
                  <div className="bg-white p-10 rounded-lg shadow-md mx-auto max-w-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 justify-center">
                        <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center">
                          {review.image ? (
                            <img src={review.image} alt={review.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <span className="text-gold font-serif text-2xl">{review.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-[#3A3A3A] font-light text-lg">{review.name}</p>
                          <p className="text-[#3A3A3A]/40 text-sm font-light">{review.timeAgo}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 justify-center">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-[#3A3A3A]/70 font-light leading-relaxed text-center text-lg">
                        "{review.review}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gold" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gold" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-gold w-8' : 'bg-gold/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://share.google/a9DheYZU8AHvRvSG0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-[#3A3A3A] transition-colors duration-300 font-light"
          >
            See More Reviews
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const BeautyBlogSection = () => {
  const reels = [
    {
      url: 'https://www.instagram.com/reel/DWrbXWGgIM6/',
      embedUrl: 'https://www.instagram.com/reel/DWrbXWGgIM6/embed'
    },
    {
      url: 'https://www.instagram.com/reel/DWhBuVRAEDA/',
      embedUrl: 'https://www.instagram.com/reel/DWhBuVRAEDA/embed'
    },
    {
      url: 'https://www.instagram.com/reel/DWO6I9plNzP/',
      embedUrl: 'https://www.instagram.com/reel/DWO6I9plNzP/embed'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Beauty Tips & Updates</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-[#3A3A3A]/70 font-light max-w-2xl mx-auto">
            Watch our latest videos for expert advice, behind-the-scenes content, and microblading tips
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reels.map((reel, index) => (
            <div 
              key={index}
              className="bg-beige/20 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[9/16] relative">
                <iframe
                  src={reel.embedUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div className="p-4 text-center">
                <a 
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-[#3A3A3A] transition-colors duration-300 font-light text-sm inline-flex items-center gap-2"
                >
                  View on Instagram
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.instagram.com/atelierbei/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-white rounded-full font-light tracking-wide text-base
                     hover:bg-opacity-90 transition-all duration-500 shadow-md hover:shadow-xl"
          >
            <Instagram className="w-5 h-5" />
            Follow for More
          </a>
        </div>
      </div>
    </section>
  );
};

const LocationSection = () => {
  return (
    <section className="py-32 bg-ivory">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Visit Us</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-[#3A3A3A]/70 font-light">
            21058 CA-1 M-100 Studio, Studio #303, Huntington Beach, CA 92648
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-center">
          <div className="rounded-lg overflow-hidden shadow-md h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.8675891234567!2d-117.9965571!3d33.6545474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd212071815fbb%3A0xc820ad3e061baf51!2sAtelier%20Bei%20Permanent%20Makeup!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="bg-beige/20 rounded-lg overflow-hidden shadow-md">
            <div className="aspect-[9/16] max-h-[600px]">
              <iframe
                src="https://www.instagram.com/reel/DVqh7x1FRVt/embed"
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
            <div className="p-6 text-center">
              <a 
                href="https://www.instagram.com/reel/DVqh7x1FRVt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-[#3A3A3A] transition-colors duration-300 font-light inline-flex items-center gap-2"
              >
                View on Instagram
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.google.com/maps/place/Atelier+Bei+Permanent+Makeup/@33.6545474,-117.9965571,17z/data=!3m1!4b1!4m6!3m5!1s0x80dd212071815fbb:0xc820ad3e061baf51!8m2!3d33.6545474!4d-117.9965571!16s%2Fg%2F11n4w1245y?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-white rounded-full font-light tracking-wide text-base
                     hover:bg-opacity-90 transition-all duration-500 shadow-md hover:shadow-xl"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section id="contact" className="py-40 bg-blush/20 relative overflow-hidden">
      <div className="absolute bottom-0 -left-32 z-0 opacity-[0.08]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-[400px] h-auto"
        >
          <source src="/flowervid.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">
            Ready to Enhance Your Natural Beauty?
          </h2>
          <p className="text-lg text-[#3A3A3A]/70 font-light">
            Book your consultation today and discover the art of permanent makeup perfection.
          </p>
          <button className="px-14 py-5 bg-gold text-white rounded-full font-light tracking-wide text-base
                           hover:bg-opacity-90 transition-all duration-300 hover:shadow-xl">
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

const BookingFormSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Book an Appointment</h2>
            <div className="w-20 h-px bg-gold mx-auto"></div>
            <p className="text-lg text-[#3A3A3A]/70 font-light">
              Fill out the form below and we'll get back to you shortly to confirm your appointment
            </p>
          </div>

          <form 
            action="https://formsubmit.co/atelierbeibeauty@gmail.com" 
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="_subject" value="New Appointment Booking from Atelier Bei Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-light text-[#3A3A3A] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-[#3A3A3A]/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-light text-[#3A3A3A] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-[#3A3A3A]/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-light text-[#3A3A3A] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-[#3A3A3A]/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-light text-[#3A3A3A] mb-2">
                  Service *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-[#3A3A3A]/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="Microblading Eyebrows">Microblading Eyebrows</option>
                  <option value="Touch-up Session">Touch-up Session</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-light text-[#3A3A3A] mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                name="preferred_date"
                required
                className="w-full px-4 py-3 border border-[#3A3A3A]/20 rounded-lg focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-light text-[#3A3A3A] mb-2">
                Additional Notes
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-3 border border-[#3A3A3A]/20 rounded-lg focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="Any special requests or questions..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-14 py-5 bg-gold text-white rounded-full font-light tracking-wide text-base
                         hover:bg-opacity-90 transition-all duration-500 shadow-md hover:shadow-xl"
              >
                Submit Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-white border-t border-beige/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-xl font-serif font-light text-[#3A3A3A]">Contact</h3>
            <div className="space-y-2 text-[#3A3A3A]/70 font-light text-sm">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-gold" />
                <span>+1 (949) 656-6750</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-gold" />
                <span>atelierbeibeauty@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h3 className="text-xl font-serif font-light text-[#3A3A3A]">Location</h3>
            <div className="flex items-center gap-2 justify-center text-[#3A3A3A]/70 font-light text-sm">
              <MapPin className="w-4 h-4 text-gold" />
              <span>21058 CA-1 M-100 Studio<br />Studio #303, Huntington Beach, CA 92648</span>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-right">
            <h3 className="text-xl font-serif font-light text-[#3A3A3A]">Follow</h3>
            <div className="flex flex-col gap-3 items-center md:items-end">
              <a 
                href="https://www.instagram.com/atelierbei"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <Instagram className="w-5 h-5 text-gold" />
                <span className="text-[#3A3A3A]/70 font-light text-sm">@atelierbei</span>
              </a>
              <a 
                href="https://www.facebook.com/atelierbei"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <Facebook className="w-5 h-5 text-gold" />
                <span className="text-[#3A3A3A]/70 font-light text-sm">Atelier Bei</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-beige/50 text-center">
          <p className="text-[#3A3A3A]/50 font-light text-sm">
            © 2026 Nisreen Microblading Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default App;
