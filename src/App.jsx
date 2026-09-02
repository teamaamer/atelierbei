import React, { useEffect, useState } from 'react';
import { Star, Instagram, MapPin, Phone, Mail, ChevronLeft, ChevronRight, Facebook, MessageCircle } from 'lucide-react';

// Lightweight client-side router (pathname based). Netlify catch-all serves index.html.
const navigate = (path) => {
  if (typeof window === 'undefined') return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
};

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePop = () => {
      setRoute(window.location.pathname);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const isBookingRoute = route === '/book' || route === '/book-appointment';

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar scrollY={scrollY} onNavigate={navigate} />
      {isBookingRoute ? (
        <BookingPage />
      ) : (
        <>
          <HeroSection scrollY={scrollY} />
          <AboutSection />
          <ServicesSection onNavigate={navigate} />
          <BeforeAfterSection />
          <ReviewsSection />
          <BeautyBlogSection />
          <LocationSection />
          <BookingCTASection onNavigate={navigate} />
        </>
      )}
      <Footer />

      {/* Floating SMS Button */}
      <a
        href="sms:+17146514892"
        className="fixed bottom-8 right-8 z-50 bg-gold text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Send us a text message"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}

const Navbar = ({ scrollY, onNavigate }) => {
  const isScrolled = scrollY > 50;

  const goHome = (sectionId) => {
    if (window.location.pathname !== '/') {
      onNavigate('/');
      // wait for home to render, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Results', id: 'results' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md" style={{ backgroundColor: 'rgba(243, 239, 235, 0.95)' }}>
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-center md:justify-between h-16">

          <div className="flex items-center space-x-4 md:space-x-12 flex-1 justify-center overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goHome(item.id)}
                className="text-sm md:text-base font-normal hover:opacity-70 transition-all duration-300 whitespace-nowrap tracking-wide"
                style={{ color: '#3F4937' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a
            href="sms:NEW_PHONE_NUMBER"
            className="hidden md:block px-8 py-2.5 rounded-full text-sm font-light tracking-wide
                       hover:opacity-80 transition-all duration-500 shadow-sm hover:shadow-md no-underline"
            style={{ backgroundColor: '#b5945c', color: 'white' }}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ scrollY }) => {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '88vh' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/ATHERO.MOV" type="video/quicktime" />
      </video>

      {/* Subtle dark overlay/gradient to keep logo & navbar readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.25) 100%)'
        }}
      />

      {/* Atelier Bei logo - top-right, aligned under navbar */}
      <div className="absolute top-0 right-0 z-10 pr-5 md:pr-12 pt-24 md:pt-28 pointer-events-none">
        <img
          src="/logo.png"
          alt="Atelier Bei"
          className="w-16 md:w-28 h-auto object-contain"
          style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.45))' }}
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="/nisreen/personalnisreen.jpg"
              alt="Nisreen"
              className="w-full max-w-sm rounded-lg shadow-md object-cover"
            />
          </div>

          <div className="order-1 md:order-2 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">About Atelier bei</h2>
              <div className="w-20 h-px bg-gold mx-auto md:mx-0"></div>
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
      </div>
    </section>
  );
};

const ServicesSection = ({ onNavigate }) => {
  const features = [
    'Consultation & Design',
    'Color Matching',
    'Aftercare Support',
    'Natural-Looking Results'
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
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Services</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-[#3A3A3A]/70 font-light leading-relaxed max-w-2xl mx-auto">
            We specialise in the art of 3D Microblading
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 lg:p-10 rounded-lg shadow-md">
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <h3 className="text-4xl font-serif font-light text-[#3A3A3A]">3D Microblading</h3>
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
                  Includes free consultation and aftercare treatment
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

              <div className="text-center pt-6 border-t border-gold/15">
                <p className="text-base text-[#3A3A3A]/60 font-light mb-3 max-w-md mx-auto">
                  Touch-up session after 4-6 weeks is recommended
                </p>
                <div className="text-sm text-[#3A3A3A]/50 font-light mb-1">Investment</div>
                <div className="text-5xl font-serif font-light text-[#3A3A3A]/40 line-through mb-2">$500</div>
                <div className="text-3xl font-serif font-light text-gold mb-5">Save Up to $200 or More</div>

                <p className="text-xl md:text-2xl font-semibold text-red-600 mb-8 max-w-lg mx-auto">
                  Contact me to claim the offer — limited time only!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="tel:+17146514892"
                    className="shimmer-btn w-full sm:w-auto px-10 py-5 bg-gold text-white rounded-full font-normal tracking-wide text-base
                               hover:-translate-y-0.5 transition-all duration-500">
                    Contact Me Now for the Special Offer — Limited Time
                  </a>
                  <button
                    onClick={() => onNavigate('/book')}
                    className="w-full sm:w-auto px-10 py-5 bg-[#3A3A3A] text-white rounded-full font-light tracking-wide text-base
                               shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500">
                    Book Your Appointment
                  </button>
                  <a
                    href="sms:+17146514892"
                    className="w-full sm:w-auto px-10 py-5 bg-white text-gold border border-gold/40 rounded-full font-light tracking-wide text-base
                               shadow-md hover:shadow-lg hover:bg-gold/5 hover:-translate-y-0.5 transition-all duration-500">
                    Send Us a Message
                  </a>
                </div>
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
    '/beforeafter/beforeafter1.jpg',
    '/beforeafter/beforeafter2.jpg',
    '/beforeafter/beforeafter3.jpg',
    '/beforeafter/beforeafter4.jpg',
    '/beforeafter/beforeafter5.jpg',
    '/beforeafter/beforeafter6.jpg',
    '/beforeafter/beforeafter7.jpg',
    '/beforeafter/beforeafter9.jpg',
    '/beforeafter/beforeafter10.jpg',
    '/beforeafter/beforeafter11.jpg',
    '/beforeafter/beforeafter12.jpg',
    '/beforeafter/beforeafter13.jpg',
    '/beforeafter/beforeafter14.jpg',
    '/beforeafter/beforeafter15.jpg'
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
                className="w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-300"
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
    },
    {
      name: 'Nora Perez',
      rating: 5,
      review: 'Really happy with my eyebrow microblading results. The shape came out natural and balanced, and the whole process was smooth and professional. Nesreen paid attention to detail and made sure I was comfortable the entire time. Definitely recommend if you\u2019re looking for soft, natural looking brows.',
      image: '/reviews/Nora Perez.png',
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Hala Alkhatib',
      rating: 5,
      review: 'I did microblading with Nasreen, and she was amazing. She did such a good job, was super professional, and so sweet. I would definitely recommend her to anyone looking to get microblading for their eyebrows.',
      image: '/reviews/halna.png',
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Hala Alkhatib',
      rating: 5,
      review: 'I had the best experience getting my eyebrows done by Nesrin at Atelier Bei. She is incredibly talented and really knows how to shape brows perfectly to suit your face. She takes her time, pays attention to every detail, and makes sure you\u2019re comfortable the whole time. My brows have never looked this clean, natural, and perfectly shaped. You can tell she truly cares about her work and her clients. I\u2019m honestly so happy with the results and will definitely keep going back. Highly recommend Nesrin at Atelier Bei if you want flawless eyebrows!',
      image: '/reviews/Hala Alkhatib.png',
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
  // Elfsight Instagram widget ID
  const elfsightWidgetId = '071dce93-0b23-422c-8801-1d6102ec28b8';

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Latest from Instagram</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-[#3A3A3A]/70 font-light max-w-2xl mx-auto">
            Auto-updates with our newest posts
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className={`elfsight-app-${elfsightWidgetId}`}></div>
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
    <section id="contact" className="py-32 bg-ivory">
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

const BookingCTASection = ({ onNavigate }) => {
  return (
    <section id="booking" className="py-24 bg-blush/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Book an Appointment</h2>
            <div className="w-20 h-px bg-gold mx-auto"></div>
            <p className="text-lg text-[#3A3A3A]/70 font-light leading-relaxed">
              Choose the service, date, and time that works best for you. Reserve your spot instantly
              with our online booking calendar.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/book')}
            className="px-14 py-5 bg-gold text-white rounded-full font-light tracking-wide text-base
                       hover:bg-opacity-90 transition-all duration-500 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          >
            Book Your Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

const BookingPage = () => {
  // Load the 255 form_embed.js script once when the booking page mounts.
  useEffect(() => {
    const existing = document.querySelector('script[src="https://api.255adv.com/js/form_embed.js"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://api.255adv.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // leave the script in place; it is harmless if navigated back to
    };
  }, []);

  return (
    <section id="book" className="pt-24 pb-24 bg-ivory min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#3A3A3A]">Book Your Appointment</h2>
            <div className="w-20 h-px bg-gold mx-auto"></div>
            <p className="text-lg text-[#3A3A3A]/70 font-light">
              Choose the service, date, and time that works best for you.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="w-full" style={{ minHeight: '700px' }}>
              <iframe
                src="https://api.255adv.com/widget/booking/lCu5PqaaOPcSQFhDgD4P"
                allow="payment"
                title="Book Your Appointment"
                style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '700px', display: 'block' }}
                scrolling="no"
                id="lCu5PqaaOPcSQFhDgD4P_1787406338282"
              ></iframe>
            </div>
          </div>
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
              <a 
                href="tel:+17146514892"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'phone_call', {
                      event_category: 'contact',
                      event_label: 'Footer Phone Click',
                      value: 1
                    });
                  }
                }}
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>(714) 651-4892</span>
              </a>
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
