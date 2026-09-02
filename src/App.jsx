import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { Star, Instagram, MapPin, Phone, Mail, ChevronRight, Facebook, MessageCircle, Menu, X } from 'lucide-react';

// Lightweight client-side router (pathname based). Netlify catch-all serves index.html.
const navigate = (path) => {
  if (typeof window === 'undefined') return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
};

// Hook: lazy-load third-party scripts only when needed
const useLazyScript = (src, condition = true) => {
  useEffect(() => {
    if (!condition) return;
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return;
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, [src, condition]);
};

// Hook: IntersectionObserver for lazy-mounting below-fold sections
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px', ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

// Wrapper: renders children only when section approaches viewport
const LazySection = ({ children, id, minHeight = '200px' }) => {
  const [ref, inView] = useInView({ rootMargin: '400px' });
  return (
    <div ref={ref} id={id} style={{ minHeight: inView ? 'auto' : minHeight }}>
      {inView ? children : null}
    </div>
  );
};

function App() {
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

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
      <Navbar onNavigate={navigate} />
      {isBookingRoute ? (
        <BookingPage />
      ) : (
        <>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <HeroImageSection />
          <LazySection id="results" minHeight="600px">
            <BeforeAfterSection />
          </LazySection>
          <LazySection id="reviews" minHeight="500px">
            <ReviewsSection />
          </LazySection>
          <LazySection minHeight="400px">
            <BeautyBlogSection />
          </LazySection>
          <LazySection id="contact" minHeight="600px">
            <LocationSection />
          </LazySection>
          <BookingCTASection />
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

const Navbar = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const goHome = (sectionId) => {
    setMobileOpen(false);
    if (window.location.pathname !== '/') {
      onNavigate('/');
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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md" style={{ backgroundColor: 'rgba(243, 239, 235, 0.95)' }}>
        <div className="mx-auto px-5 lg:px-12">
          <div className="flex items-center justify-between" style={{ height: '72px' }}>

            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <img
                src="/logo.webp"
                alt="Atelier Bei"
                width={120}
                height={150}
                className="h-16 md:h-20 w-auto object-contain"
                style={{ transform: 'scale(1.6)', transformOrigin: 'left center' }}
              />
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-10 flex-1 justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goHome(item.id)}
                  className="text-sm md:text-base font-normal hover:opacity-70 transition-all duration-300 whitespace-nowrap tracking-wide py-2"
                  style={{ color: '#3F4937' }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <a
              href="sms:+17146514892"
              className="hidden md:block px-8 py-2.5 rounded-full text-sm font-light tracking-wide
                         hover:opacity-80 transition-all duration-500 shadow-sm hover:shadow-md no-underline flex-shrink-0"
              style={{ backgroundColor: '#b5945c', color: 'white' }}
            >
              Book Appointment
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center flex-shrink-0 p-2"
              style={{ color: '#3F4937', minHeight: '44px', minWidth: '44px' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden fixed top-0 left-0 right-0 z-40 pt-[72px] pb-8 px-5 shadow-lg"
          style={{
            backgroundColor: 'rgba(243, 239, 235, 0.98)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeInUp 0.3s ease-out forwards'
          }}
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => goHome(item.id)}
                className="text-left py-4 text-lg font-light tracking-wide transition-all duration-300 hover:opacity-70"
                style={{ color: '#3F4937', minHeight: '48px' }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="sms:+17146514892"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-block text-center px-8 py-4 rounded-full text-base font-light tracking-wide no-underline
                         hover:opacity-80 transition-all duration-500 shadow-sm"
              style={{ backgroundColor: '#b5945c', color: 'white' }}
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </>
  );
};

const HeroSection = () => {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Start loading video shortly after first paint to avoid blocking LCP
    const timer = setTimeout(() => setVideoReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '88vh' }}
    >
      {/* LCP element: optimized poster image, discovered immediately in HTML */}
      <img
        src="/hero-poster-mobile.webp"
        srcSet="/hero-poster-mobile.webp 480w, /hero-poster-desktop.webp 1920w"
        sizes="100vw"
        alt="Atelier Bei — Luxury Microblading Studio"
        width={480}
        height={270}
        fetchpriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoReady ? 0 : 1, transition: 'opacity 0.8s ease-out' }}
      />

      {/* Video loads after first paint, fades in over poster */}
      {videoReady && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0, transition: 'opacity 0.8s ease-out' }}
          onCanPlay={(e) => { e.target.style.opacity = 1; }}
        >
          <source src="/ATHERO-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/ATHERO.mp4" type="video/mp4" />
        </video>
      )}

      {/* Subtle dark overlay/gradient to keep navbar readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.25) 100%)'
        }}
      />
    </section>
  );
};

const HeroImageSection = () => {
  return (
    <section className="w-full bg-ivory py-12 md:py-20">
      <div className="w-full fade-in-up">
        <img
          src="/nisreen/cover.webp"
          alt="Atelier Bei"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover block"
        />
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="/nisreen/personalnisreen.webp"
              alt="Nisreen"
              width={800}
              height={1200}
              loading="lazy"
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

const ServicesSection = () => {
  const features = [
    'Consultation & Design',
    'Color Matching',
    'Aftercare Support',
    'Natural-Looking Results'
  ];

  return (
    <section id="services" className="py-16 bg-ivory relative overflow-hidden">
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
                  src="/beforeafter/services1.webp" 
                  alt="Microblading Process" 
                  width={1536}
                  height={1024}
                  loading="lazy"
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
                    href="sms:+17146514892"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full font-light tracking-wide text-base text-white
                               shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 no-underline"
                    style={{ backgroundColor: '#46513D' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send SMS
                  </a>
                  <a
                    href="tel:+17146514892"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full font-light tracking-wide text-base text-white
                               shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 no-underline"
                    style={{ backgroundColor: '#46513D' }}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
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
    '/beforeafter/beforeafter1.webp',
    '/beforeafter/beforeafter2.webp',
    '/beforeafter/beforeafter3.webp',
    '/beforeafter/beforeafter4.webp',
    '/beforeafter/beforeafter5.webp',
    '/beforeafter/beforeafter6.webp',
    '/beforeafter/beforeafter7.webp',
    '/beforeafter/beforeafter9.webp',
    '/beforeafter/beforeafter10.webp',
    '/beforeafter/beforeafter11.webp',
    '/beforeafter/beforeafter12.webp',
    '/beforeafter/beforeafter13.webp',
    '/beforeafter/beforeafter14.webp',
    '/beforeafter/beforeafter15.webp'
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
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
                width={800}
                height={800}
                loading="lazy"
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
  // Audit summary:
  // Existing reviews found: 8
  // New unique reviews added: 10
  // Duplicates prevented: 0 (all master entries either matched existing or were new)
  // Final unique reviews: 18
  // Notes: Sima & Shatha Naneesh are legitimate existing reviews not in the supplied
  // master screenshots — kept per instructions. Iman Issa & Dima Hamdan updated to the
  // fuller text from the master list. Briana Lopez & velda alessa are rating-only
  // (no text visible in screenshots — no text invented).
  const REVIEWS_PER_ROW = 4;
  const [currentRowIndex, setCurrentRowIndex] = React.useState(0);

  const reviews = [
    {
      name: 'Iman Issa',
      rating: 5,
      review: 'Stylist: One of the best beauty experiences I\u2019ve had. Nesreen is extremely skilled and has a great eye for detail and symmetry. My brows look natural, soft, and beautifully shaped. The whole process was comfortable and professional. I would definitely recommend Atelie Bie to anyone considering microblading.',
      image: '/reviews/imanrev.webp',
      timeAgo: 'Edited 5 months ago'
    },
    {
      name: 'Dima Hamdan',
      rating: 5,
      review: 'I had an amazing experience getting my microblading done here! The artist was extremely professional, patient, and very talented. She took the time to explain the whole process and made sure the shape and color were perfect for my face.',
      image: '/reviews/dima.webp',
      timeAgo: 'Edited 4 months ago'
    },
    {
      name: 'Basma El Sarwy',
      rating: 5,
      review: 'Amazing experience and beautiful results!',
      image: '/reviews/basema.webp',
      timeAgo: '5 months ago'
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
      image: '/reviews/Shatha.webp',
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Nora Perez',
      rating: 5,
      review: 'Really happy with my eyebrow microblading results. The shape came out natural and balanced, and the whole process was smooth and professional. Nesreen paid attention to detail and made sure I was comfortable the entire time. Definitely recommend if you\u2019re looking for soft, natural looking brows.',
      image: '/reviews/Nora Perez.webp',
      timeAgo: '3 months ago'
    },
    {
      name: 'Hala Alkhatib',
      rating: 5,
      review: 'I did microblading with Nasreen, and she was amazing. She did such a good job, was super professional, and so sweet. I would definitely recommend her to anyone looking to get microblading for their eyebrows.',
      image: '/reviews/halna.webp',
      timeAgo: '4 months ago'
    },
    {
      name: 'Hala Alkhatib',
      rating: 5,
      review: 'I had the best experience getting my eyebrows done by Nesrin at Atelier Bei. She is incredibly talented and really knows how to shape brows perfectly to suit your face. She takes her time, pays attention to every detail, and makes sure you\u2019re comfortable the whole time. My brows have never looked this clean, natural, and perfectly shaped. You can tell she truly cares about her work and her clients. I\u2019m honestly so happy with the results and will definitely keep going back. Highly recommend Nesrin at Atelier Bei if you want flawless eyebrows!',
      image: '/reviews/Hala Alkhatib.webp',
      timeAgo: '3 months ago'
    },
    {
      name: 'Carrara Stratton',
      rating: 5,
      review: 'I walked in with very thin eyebrows and left with full and natural looking eyebrows. I\u2019m very happy with Nesreens work.The atmosphere in her office is clean and relaxing, she makes the whole experience comfortable.\u2B50\u2B50\u2B50\u2B50\u2B50',
      image: null,
      timeAgo: '4 months ago'
    },
    {
      name: 'Tanya Semerjian',
      rating: 5,
      review: 'I did Microblading,Nesreen Is very talented and so sweet. You feel very comfortable and she did a great job.',
      image: null,
      timeAgo: '3 months ago'
    },
    {
      name: 'rsazza76',
      rating: 5,
      review: 'Stellar results! Love my eyebrows now more than ever. Definitely recommend Nesreen is the best.',
      image: null,
      timeAgo: '4 months ago'
    },
    {
      name: 'michala monroe',
      rating: 5,
      review: 'Really looking forward to seeing these all healed up! We had a great experience today for the first microblading',
      image: null,
      timeAgo: '3 months ago'
    },
    {
      name: 'Laurie Lawver',
      rating: 5,
      review: 'So excited and so happy with my beautiful brows! 100% recommend!',
      image: null,
      timeAgo: '3 months ago'
    },
    {
      name: 'Afsaneh Javahery',
      rating: 5,
      review: 'I love youuuuuuuu , wonderful job \u2764\uFE0F\u2764\uFE0F\u2764\uFE0F\u2764\uFE0F\u2764\uFE0F\u2764\uFE0F',
      image: null,
      timeAgo: '4 months ago'
    },
    {
      name: 'Yesenia Delgado',
      rating: 5,
      review: 'Recommend 100%, beautiful place and job.',
      image: null,
      timeAgo: '2 weeks ago'
    },
    {
      name: 'Heidi Lorasbi',
      rating: 5,
      review: 'Nesreen was wonderful, super caring and great at her job! My eyebrows looked amazing and the process was easy and painless!',
      image: null,
      timeAgo: '2 months ago'
    },
    {
      name: 'Briana Lopez',
      rating: 5,
      review: null,
      image: null,
      timeAgo: 'a day ago'
    },
    {
      name: 'velda alessa',
      rating: 5,
      review: null,
      image: null,
      timeAgo: 'a month ago'
    }
  ];

  const totalRows = Math.ceil(reviews.length / REVIEWS_PER_ROW);
  const currentRow = reviews.slice(
    currentRowIndex * REVIEWS_PER_ROW,
    currentRowIndex * REVIEWS_PER_ROW + REVIEWS_PER_ROW
  );

  React.useEffect(() => {
    if (totalRows <= 1) return;
    const timer = setInterval(() => {
      setCurrentRowIndex((prev) => (prev + 1) % totalRows);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalRows]);

  return (
    <section className="py-32 bg-beige/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Google Reviews</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {currentRow.map((review, index) => (
            <ReviewCard key={`${currentRowIndex}-${index}`} review={review} />
          ))}
        </div>

        {totalRows > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalRows }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRowIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentRowIndex === index ? 'bg-gold w-8' : 'bg-gold/30 w-2'
                }`}
                aria-label={`Reviews page ${index + 1}`}
                style={{ minHeight: '44px', minWidth: '44px', padding: '0' }}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <a 
            href="https://share.google/a9DheYZU8AHvRvSG0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-[#3A3A3A] transition-colors duration-300 font-light py-2"
          >
            See More Reviews
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const LONG_THRESHOLD = 160;
  const hasText = review.review && review.review.length > 0;
  const isLong = hasText && review.review.length > LONG_THRESHOLD;

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
          {review.image ? (
            <img src={review.image} alt={review.name} width={48} height={48} loading="lazy" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-gold font-serif text-xl">{review.name.charAt(0)}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[#3A3A3A] font-light text-base truncate">{review.name}</p>
          <p className="text-[#3A3A3A]/40 text-xs font-light">{review.timeAgo}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>

      {hasText && (
        <>
          <p
            className={`text-[#3A3A3A]/70 font-light leading-relaxed text-sm whitespace-pre-line ${
              !expanded && isLong ? 'review-clamp' : ''
            }`}
          >
            "{review.review}"
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-3 self-start text-gold hover:text-[#3A3A3A] text-xs font-light tracking-wide transition-colors duration-300 py-2"
              style={{ minHeight: '44px' }}
            >
              {expanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

const BeautyBlogSection = () => {
  const elfsightWidgetId = '071dce93-0b23-422c-8801-1d6102ec28b8';
  const [ref, inView] = useInView({ rootMargin: '300px' });

  // Load Elfsight platform.js only when section approaches viewport
  useLazyScript('https://elfsightcdn.com/platform.js', inView);

  return (
    <section className="py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Latest from Instagram</h2>
          <div className="w-20 h-px bg-gold mx-auto"></div>
          <p className="text-lg text-[#3A3A3A]/70 font-light max-w-2xl mx-auto">
            Auto-updates with our newest posts
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-12" style={{ minHeight: '400px' }}>
          {inView && <div className={`elfsight-app-${elfsightWidgetId}`}></div>}
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
              title="Atelier Bei Location Map"
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
                title="Atelier Bei Instagram Reel"
                src="https://www.instagram.com/reel/DVqh7x1FRVt/embed"
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="encrypted-media"
                loading="lazy"
              ></iframe>
            </div>
            <div className="p-6 text-center">
              <a 
                href="https://www.instagram.com/reel/DVqh7x1FRVt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-[#3A3A3A] transition-colors duration-300 font-light inline-flex items-center gap-2 py-2"
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

const BookingCTASection = () => {
  return (
    <section id="booking" className="py-24 bg-blush/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-serif font-light text-[#3A3A3A]">Book an Appointment</h2>
            <div className="w-20 h-px bg-gold mx-auto"></div>
            <p className="text-lg text-[#3A3A3A]/70 font-light leading-relaxed">
              Send us a text message and we'll help you choose the service, date, and time that works best for you.
            </p>
          </div>

          <a
            href="sms:+17146514892"
            className="inline-block px-14 py-5 bg-gold text-white rounded-full font-light tracking-wide text-base
                       hover:bg-opacity-90 transition-all duration-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 no-underline"
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  );
};

const BookingPage = () => {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://api.255adv.com/js/form_embed.js"]');
    if (existing) return;
    const script = document.createElement('script');
    script.src = 'https://api.255adv.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
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
                className="flex items-center gap-2 justify-center md:justify-start hover:text-gold transition-colors duration-300 py-1"
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
                className="flex items-center gap-2 hover:opacity-70 transition-opacity py-1"
              >
                <Instagram className="w-5 h-5 text-gold" />
                <span className="text-[#3A3A3A]/70 font-light text-sm">@atelierbei</span>
              </a>
              <a 
                href="https://www.facebook.com/atelierbei"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity py-1"
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
