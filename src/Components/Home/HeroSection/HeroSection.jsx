import { memo, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar/SearchBar';

// ✅ Import WebP versions (convert your images to WebP)
import HeroBgWebp from "../../../assets/Banners/bg-image.webp";
import MobileBgWebp from "../../../assets/Banners/HeroSectionMobile.webp";

// Fallback for older browsers
import HeroBgJpg from "../../../assets/Banners/bg-image.jpg";

const HeroSection = memo(() => {
  const token = localStorage.getItem('token');
  
  // ✅ Use CSS media query approach instead of JS resize listener
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ Check once on mount, no resize listener needed
    // CSS handles responsive background via picture element
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    // ✅ Debounced resize handler (only if absolutely needed)
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        requestAnimationFrame(checkMobile);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="flex flex-col justify-center items-center">
      {/* ✅ Hero section with optimized image */}
      <section
        className="relative max-[400px]:px-6 px-10 -mt-[40%] sm:pt-10 sm:-mt-[18%] max-[891px]:pt-20 min-[891px]:pt-18 md:-mt-[15%] lg:px-8 lg:pt-18 xl:-mt-[10%] xl:pt-14 2xl:pt-40 w-full overflow-hidden"
        style={{ contain: 'layout style paint' }}
      >
        {/* ✅ LCP Image — Using <img> with fetchpriority for better LCP */}
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={MobileBgWebp}
            type="image/webp"
          />
          <source
            media="(min-width: 769px)"
            srcSet={HeroBgWebp}
            type="image/webp"
          />
          <img
            src={HeroBgJpg}
            alt=""
            role="presentation"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center -z-10"
            style={{
              filter: 'brightness(0.7)',
            }}
          />
        </picture>

        {/* ✅ Overlay for text readability */}
        <div 
          className="absolute inset-0 bg-black/30 -z-10" 
          aria-hidden="true"
        />

        {/* Hero spacer */}
        <div 
          className="h-[370px] sm:h-[330px] md:h-[440px] lg:h-[430px] xl:h-[480px]"
          aria-hidden="true"
        />

        {/* Hero content */}
        <div className="flex flex-col justify-center items-center pb-28 sm:pb-36 md:pb-20 lg:pb-20">
          {/* ✅ LCP Text — Add specific class for critical rendering */}
          <h1 
            className="text-[28px] leading-[40px] min-[370px]:!text-[37.5px] min-[370px]:!leading-[47px] sm:!text-[37px] sm:!leading-[46px] md:!text-[42px] md:!leading-[53px] lg:!text-[53px] lg:!leading-[65px] xl:!text-[68px] font-[600] font-Poppins tracking-tight text-white text-center 2xl:w-[66%] 2xl:!leading-[1.2em]"
            style={{ 
              contain: 'layout style',
              textRendering: 'optimizeSpeed',
            }}
          >
            Investor-Only Commercial Real Estate Network
          </h1>

          <p className="text-[16px] sm:text-[16.5px] lg:text-[20px] font-[500] mt-4 text-white text-center sm:w-[80%] lg:w-[60%] leading-relaxed">
            Newlista is an investor-only commercial real estate network where investors connect, share off-market opportunities, and build acquisition partnerships.
          </p>

          <div className="mt-8">
            <Link to={token ? "/pricing" : "/register"}>
              <button 
                type="button"
                className="hover-btn-purple hover-btn text-[17.5px] text-Purple px-8 py-3 font-Inter cursor-pointer rounded-full"
              >
                <span>Join the Network</span>
              </button>
            </Link>
          </div>

          <p className="text-[14px] sm:text-[16px] text-center font-[500] mt-5 text-white/90 sm:w-[80%]">
            A private network built for active commercial real estate investors
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-[350px]:w-[90%] w-[75%] sm:w-[50%] md:w-[90%] min-[800px]:w-[80%] lg:w-[100%] xl:w-[97%] 2xl:w-[75%] min-[1780px]:!w-[65%] -mt-17">
        <SearchBar />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;