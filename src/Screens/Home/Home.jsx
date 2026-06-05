import {
  lazy,
  Suspense,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeroSection from "../../Components/Home/HeroSection/HeroSection";
import HighlightBlock from "../../Components/Home/HighlightBlock/HighlightBlock";

const CardShowcase = lazy(() =>
  import("../../Components/Home/CardShowcase/CardShowcase")
);
const FeaturedListingCard = lazy(() =>
  import("../../Components/Home/FeaturedListingCard/FeaturedListingCard")
);
const OffMarketListingCard = lazy(() =>
  import("../../Components/Home/OffMarketListingCard/OffMarketListingCard")
);
const CardCarousel = lazy(() =>
  import("../../Components/Carousel/Carousel")
);
const EmptyCards = lazy(() =>
  import("../../Components/EmptyCard/EmptyCard")
);
const HowInvestorNetworkWorks = lazy(() =>
  import("../../Components/HowInvestorNetworkWorks/HowInvestorNetworkWorks")
);
const LongTermGrowthSection = lazy(() =>
  import("../../Components/LongTermGrowthSection/LongTermGrowthSection")
);

// ─── Helpers ──────────────────────────────────────────────────

const SectionFallback = () => (
  <div
    style={{
      minHeight: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        border: "3px solid #e5e7eb",
        borderTopColor: "#7C3AED",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  </div>
);

// ✅ Safe truncate — pure function, no side effects
const InlineTruncate = ({ text, maxLength }) => {
  if (!text || text.length <= maxLength) return text || "";
  return `${text.substring(0, maxLength)}…`;
};

// ✅ Stable shuffle — only runs after data loads on client
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ─── Home Component ───────────────────────────────────────────

const Home = () => {
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_API_KEY;

  // ✅ Start as null — only read localStorage on client
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);

  // ✅ Client-only state — never exists during pre-render
  const [isClient, setIsClient] = useState(false);

  const abortControllerRef = useRef(null);
  const [Properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState(null);

  // ✅ Step 1: Mark as client + read localStorage AFTER mount
  useEffect(() => {
    setIsClient(true);
    setToken(localStorage.getItem("token"));
    setStatus(localStorage.getItem("status"));
  }, []);

  // ✅ Step 2: Fetch properties — client only
  useEffect(() => {
    // Skip during react-snap pre-render
    if (window.navigator.userAgent === "ReactSnap") return;

    abortControllerRef.current = new AbortController();

    const GetProperty = async () => {
      try {
        const response = await axios.get(`${ApiKey}/properties`, {
          signal: abortControllerRef.current.signal,
        });
        setProperties(response.data.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Silent fail — pre-render shows empty state, real browser loads data
        }
      }
    };

    GetProperty();

    requestAnimationFrame(() => {
      document.documentElement.classList.add("dark");
    });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [ApiKey]);

  // ─── Filtered Properties ──────────────────────────────────
  const filteredProperties = useMemo(() => {
    if (!searchFilters) return Properties;

    const { propertyType, listingType, city, state, priceRange } =
      searchFilters;

    return Properties.filter((item) => {
      const price =
        item.listing_type === "For Sale"
          ? item.sale_price
          : item.lease_rate;

      const matchesType =
        propertyType && propertyType !== "Select Your Property"
          ? item.property_type?.toLowerCase() ===
            propertyType.toLowerCase()
          : true;

      const matchesListingType =
        listingType && listingType !== "Select"
          ? item.listing_type?.toLowerCase() ===
            listingType.toLowerCase()
          : true;

      const matchesCity =
        city && city.trim() !== ""
          ? item.city?.toLowerCase().includes(city.toLowerCase())
          : true;

      const matchesState =
        state && state !== "Select Your State"
          ? item.state?.toLowerCase().includes(state.toLowerCase())
          : true;

      const matchesRange = (() => {
        if (!priceRange || price == null) return true;
        const ranges = {
          "Under $250K": [0, 250000],
          "$250K – $500K": [250000, 500000],
          "$500K – $1M": [500000, 1000000],
          "$1M – $2.5M": [1000000, 2500000],
          "$2.5M – $5M": [2500000, 5000000],
          "$5M – $10M": [5000000, 10000000],
          "$10M – $25M": [10000000, 25000000],
          "$25M – $50M": [25000000, 50000000],
        };
        if (priceRange === "Over $50M") return price > 50000000;
        const range = ranges[priceRange];
        return range
          ? price >= range[0] && price <= range[1]
          : true;
      })();

      return (
        matchesType &&
        matchesListingType &&
        matchesCity &&
        matchesState &&
        matchesRange
      );
    });
  }, [Properties, searchFilters]);

  // ✅ Shuffle only after Properties load — stable reference
  const offMarketItems = useMemo(() => {
    if (Properties.length === 0) return [];
    const offMarket = filteredProperties.filter(
      (item) => item.off_market_listing
    );
    return shuffleArray(offMarket).slice(0, 3);
  }, [filteredProperties, Properties.length]);

  const featuredItems = useMemo(() => {
    if (Properties.length === 0) return [];
    const featured = filteredProperties.filter(
      (item) => item.featured_listing
    );
    return shuffleArray(featured).slice(0, 6);
  }, [filteredProperties, Properties.length]);

  // ─── Navigation ───────────────────────────────────────────
  const goToViewProperties = useCallback(
    (filterType) => {
      if (filterType === "offmarket") {
        if (token) {
          navigate(
            status === "active" ? "/properties" : "/pricing",
            {
              state:
                status === "active" ? { filterType } : undefined,
            }
          );
        } else {
          navigate("/login");
        }
      } else {
        navigate("/properties", { state: { filterType } });
      }
    },
    [token, status, navigate]
  );

  const NetWorkView = useCallback(() => {
    if (!token) {
      navigate("/login");
    } else if (status !== "active") {
      navigate("/pricing");
    } else {
      navigate("/admin/network");
    }
  }, [token, status, navigate]);

  const handleFilterChange = useCallback((filters) => {
    setSearchFilters(filters);
  }, []);

  // ─── Render ───────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>
          Investor-Only Commercial Real Estate Network | Newlista
        </title>
        <meta
          name="description"
          content="Newlista is a commercial real estate investor network where investors discover off-market opportunities and connect with capital partners to execute deals."
        />
        <link rel="canonical" href="https://www.newlista.com/" />
        <meta
          property="og:title"
          content="Investor-Only Commercial Real Estate Network | Newlista"
        />
        <meta
          property="og:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta property="og:url" content="https://www.newlista.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.newlista.com/bg-image.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Investor-Only Commercial Real Estate Network | Newlista"
        />
        <meta
          name="twitter:description"
          content="Newlista is an online commercial real estate investor network where investors discover off-market opportunities and connect with capital partners across the United States."
        />
        <meta
          name="twitter:image"
          content="https://www.newlista.com/bg-image.jpg"
        />
      </Helmet>

      {/* ✅ Above fold — always renders */}
      <HeroSection onFilterChange={handleFilterChange} />

      <div className="flex flex-col justify-center items-center min-[400px]:px-5 sm:px-0 min-[1780px]:!px-28">

        {/* ─── Card Showcase ──────────────────────────────── */}
        <Suspense fallback={<SectionFallback />}>
          <CardShowcase
            NetWorkView={NetWorkView}
            onclick={() => goToViewProperties("offmarket")}
            token={token}
          />
        </Suspense>

        {/* ─── Off Market ─────────────────────────────────── */}
        <section
          id="OffMarketingListing"
          aria-label="Off-Market Property Listings"
          className="flex flex-col justify-center items-center py-20 px-6 sm:px-8 sm:py-14 md:px-0 gap-10 sm:gap-6 w-[100%] xl:w-[93%] 2xl:w-[78%]"
        >
          <HighlightBlock
            Heading="Off-Market Opportunities Shared Within the Network."
            Desc="Access exclusive off-market deals not available to the public. To view full property details, you must be a subscriber."
            ButtonName="View All Off-Market Properties"
            onClick={() => goToViewProperties("offmarket")}
          />

          <div
            className={`grid sm:grid-cols-2 min-[890px]:!grid-cols-3 gap-5 md:max-w-[83%] lg:max-w-[84%] place-items-center z-50 relative ${
              status === "active"
                ? ""
                : "blur-md pointer-events-none select-none"
            }`}
          >
            <Suspense fallback={<SectionFallback />}>
              {/* ✅ Only show content after client mounts */}
              {!isClient ? (
                <SectionFallback />
              ) : filteredProperties.length === 0 &&
                Properties.length === 0 ? (
                // ✅ Still loading — show nothing (no empty state flash)
                <div className="col-span-full h-[300px]" />
              ) : offMarketItems.length === 0 ? (
                <div className="flex justify-center h-[60vh] items-center w-[100%] col-span-full">
                  <EmptyCards Title="No off-market listings available" />
                </div>
              ) : (
                offMarketItems.map((items) => (
                  <OffMarketListingCard
                    key={items.id}
                    Img={items.images[0]}
                    Heading={
                      <InlineTruncate
                        text={items.property_name}
                        maxLength={42}
                      />
                    }
                    MiniHeading={
                      <InlineTruncate
                        text={items.address}
                        maxLength={19}
                      />
                    }
                    desc={
                      <InlineTruncate
                        text={items.description}
                        maxLength={90}
                      />
                    }
                    Price={
                      items.listing_type === "For Sale"
                        ? items.sale_price
                        : items.lease_rate
                    }
                    forsale={items.sale_price}
                    forlease={items.lease_rate}
                    Status={items.listing_status}
                    type={items.listing_type}
                    propertyData={items}
                    id={items.id}
                    OffMarketProperties="Off Market Property"
                  />
                ))
              )}
            </Suspense>
          </div>
        </section>

        {/* ─── How It Works ────────────────────────────────── */}
        <Suspense fallback={<SectionFallback />}>
          <HowInvestorNetworkWorks />
        </Suspense>

        {/* ─── Long Term Growth ────────────────────────────── */}
        <Suspense fallback={<SectionFallback />}>
          <LongTermGrowthSection />
        </Suspense>

        {/* ─── Network Carousel ────────────────────────────── */}
        <section
          aria-label="Investor Network Carousel"
          className="flex flex-col justify-center items-center pb-20 px-6 gap-10 overflow-hidden sm:pb-16 sm:px-8 md:px-0 sm:pt-10 w-[100%] xl:w-[94%] 2xl:w-[80%]"
        >
          <HighlightBlock
            Heading="Join the Commercial Real Estate Investor Network"
            Desc="Network with fellow investors. Exchange insights, build lasting partnerships, and discover exclusive real estate deals."
            ButtonName="View More"
            onClick={NetWorkView}
          />
          <div className="w-[98%] sm:-ml-3 md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%] flex">
            <Suspense fallback={<SectionFallback />}>
              <CardCarousel />
            </Suspense>
          </div>
        </section>

        {/* ─── Featured Listings ───────────────────────────── */}
        <section
          id="featurelisting"
          aria-label="Featured Property Listings"
          className="flex flex-col justify-center sm:items-center py-3 sm:py-8 lg:py-14 px-6 sm:px-8 gap-10 md:px-0 sm:gap-6 w-[100%] xl:w-[94%] 2xl:w-[80%] 2xl:pb-20"
        >
          <HighlightBlock
            Heading="Opportunities Shared by Investor Members"
            Desc="These opportunities are shared by members of the Newlista investor network to facilitate collaboration and partnership."
            ButtonName="View All Properties"
            ButtonLink="/properties"
            onClick={() => goToViewProperties("feature")}
          />

          <Suspense fallback={<SectionFallback />}>
            {!isClient || featuredItems.length === 0 ? (
              // ✅ Placeholder while loading — no layout shift
              <div className="grid sm:grid-cols-2 min-[870px]:!grid-cols-3 gap-9 md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%]">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-[350px] rounded-xl bg-gray-800 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 min-[870px]:!grid-cols-3 flex-wrap gap-9 sm:gap-10 xl:!gap-7 md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%] min-[870px]:!gap-4">
                {featuredItems.map((items) => (
                  <div key={items.id}>
                    <FeaturedListingCard
                      PropertyType={items.property_type}
                      Area={items.building_size}
                      Img={items.images[0]}
                      propertyData={items}
                      Heading={
                        <InlineTruncate
                          text={items.property_name}
                          maxLength={23}
                        />
                      }
                      desc={
                        <InlineTruncate
                          text={items.description}
                          maxLength={90}
                        />
                      }
                      Status={items.listing_status}
                      type={items.listing_type}
                      Price={
                        items.listing_type === "For Sale"
                          ? items.sale_price
                          : items.lease_rate
                      }
                      forsale={items.sale_price}
                      forlease={items.lease_rate}
                      id={items.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </Suspense>
        </section>
      </div>
    </>
  );
};

export default Home;