import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useRef,
} from "react";
import { Helmet } from "react-helmet-async";

// ✅ ONLY import above-the-fold components synchronously
import HeroSection from "../../Components/Home/HeroSection/HeroSection";
import HighlightBlock from "../../Components/Home/HighlightBlock/HighlightBlock";

// ✅ LAZY LOAD everything below the fold
const CardShowcase = lazy(
  () => import("../../Components/Home/CardShowcase/CardShowcase")
);
const FeaturedListingCard = lazy(
  () => import("../../Components/Home/FeaturedListingCard/FeaturedListingCard")
);
const OffMarketListingCard = lazy(
  () =>
    import("../../Components/Home/OffMarketListingCard/OffMarketListingCard")
);
const CardCarousel = lazy(
  () => import("../../Components/Carousel/Carousel")
);
const EmptyCards = lazy(
  () => import("../../Components/EmptyCard/EmptyCard")
);
const TruncatedText = lazy(
  () => import("../../Components/TruncatedText/TruncatedText")
);
const PropertySell = lazy(
  () => import("../../Components/Home/PropertySell/PropertySell")
);
const ProtectedSection = lazy(
  () => import("../../Components/Home/ProtectedSection/ProtectedSection")
);
const TestimonialSection = lazy(
  () =>
    import("../../Components/Home/TestimonialSection/TestimonialSection")
);
const HowInvestorNetworkWorks = lazy(
  () =>
    import("../../Components/HowInvestorNetworkWorks/HowInvestorNetworkWorks")
);
const LongTermGrowthSection = lazy(
  () => import("../../Components/LongTermGrowthSection/LongTermGrowthSection")
);

// ✅ Lightweight placeholder — no layout shift
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

// ✅ Inline TruncatedText for initial render (avoids lazy load overhead for small util)
const InlineTruncate = ({ text, maxLength }) => {
  if (!text || text.length <= maxLength) return text || "";
  return `${text.substring(0, maxLength)}…`;
};

const Home = () => {
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const status = localStorage.getItem("status");
  const abortControllerRef = useRef(null);

  const [Properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState(null);

  useEffect(() => {
    // ✅ Abort controller for cleanup
    abortControllerRef.current = new AbortController();

    async function GetProperty() {
      try {
        const response = await axios.get(`${ApiKey}/properties`, {
          signal: abortControllerRef.current.signal,
        });
        setProperties(response.data.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Handle real errors silently
        }
      }
    }

    GetProperty();

    // ✅ Use requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(() => {
      document.documentElement.classList.add("dark");
    });

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [ApiKey]);

  const filteredProperties = useMemo(() => {
    if (!searchFilters) return Properties;

    const { propertyType, listingType, city, state, priceRange } =
      searchFilters;

    return Properties.filter((item) => {
      const price =
        item.listing_type === "For Sale" ? item.sale_price : item.lease_rate;

      const matchesType =
        propertyType && propertyType !== "Select Your Property"
          ? item.property_type?.toLowerCase() === propertyType.toLowerCase()
          : true;

      const matchesListingType =
        listingType && listingType !== "Select"
          ? item.listing_type?.toLowerCase() === listingType.toLowerCase()
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
        return range ? price >= range[0] && price <= range[1] : true;
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

  const handleFilterChange = useCallback((filters) => {
    setSearchFilters(filters);
  }, []);

  // ✅ Memoize computed lists
  const offMarketItems = useMemo(() => {
    return filteredProperties
      .filter((item) => item.off_market_listing)
      .slice(0, 3);
  }, [filteredProperties]);

  const featuredItems = useMemo(() => {
    return filteredProperties
      .filter((item) => item.featured_listing)
      .slice(0, 6);
  }, [filteredProperties]);

  const goToViewProperties = useCallback(
    (filterType) => {
      if (filterType === "offmarket") {
        if (token) {
          navigate(status === "active" ? "/properties" : "/pricing", {
            state: status === "active" ? { filterType } : undefined,
          });
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

  return (
    <>
    <Helmet>
  <title>Investor-Only Commercial Real Estate Network | Newlista</title>

  <meta
    name="description"
    content="Newlista is a commercial real estate investor network where investors discover off-market opportunities and connect with capital partners to execute deals."
  />
  <link rel="canonical" href="https://www.newlista.com/" />

  {/* Open Graph */}
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

  {/* Twitter */}
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

      {/* ✅ Above the fold — loads synchronously */}
      <HeroSection />

      <div className="flex flex-col justify-center items-center min-[400px]:px-5 sm:px-0 min-[1780px]:!px-28">
        {/* ✅ Below the fold — everything lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <CardShowcase
            NetWorkView={NetWorkView}
            onclick={() => goToViewProperties("offmarket")}
            token={token}
          />
        </Suspense>

        {/* OFF MARKET PROPERTIES */}
        <section
          id="OffMarketingListing"
          className="flex flex-col justify-center items-center py-20 px-6 sm:px-8 sm:py-14 md:px-0 gap-10 sm:gap-6 w-[100%] xl:w-[93%] 2xl:w-[78%]"
        >
          <HighlightBlock
            Heading="Off-Market Opportunities Shared Within the Network."
            Desc="Access exclusive off-market deals not available to the public. To view full property details, you must be a subscriber."
            ButtonName="View All Off-Market Properties"
            onClick={() => goToViewProperties("offmarket")}
          />

          <div className="grid sm:grid-cols-2 min-[890px]:!grid-cols-3 gap-5 md:max-w-[83%] lg:max-w-[84%] place-items-center">
            <Suspense fallback={<SectionFallback />}>
              {filteredProperties.length === 0 ? (
                <div
                  className={`flex justify-center h-[60vh] items-center w-[100%] col-span-full relative ${
                    status === "active" ? "" : "blur-xl"
                  }`}
                >
                  <EmptyCards Title="No matching properties found" />
                </div>
              ) : offMarketItems.length === 0 ? (
                <div
                  className={`flex justify-center h-[100vh] items-center w-[100%] col-span-full relative ${
                    status === "active" ? "" : "blur-xl"
                  }`}
                >
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
                      <InlineTruncate text={items.address} maxLength={19} />
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

        <Suspense fallback={<SectionFallback />}>
          <HowInvestorNetworkWorks />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LongTermGrowthSection />
        </Suspense>

        {/* NETWORKS CAROUSEL */}
        <section className="flex flex-col justify-center items-center pb-20 px-6 gap-10 overflow-hidden sm:pb-16 sm:px-8 md:px-0 sm:pt-10 w-[100%] xl:w-[94%] 2xl:w-[80%]">
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

        {/* FEATURED LISTINGS */}
        <section
          id="featurelisting"
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
            {filteredProperties.length === 0 ? (
              <div className="relative h-[55vh] justify-center w-[100%] items-center flex">
                <EmptyCards Title="No matching properties found" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 min-[870px]:!grid-cols-3 flex-wrap gap-9 sm:gap-10 xl:!gap-7 min-[1666px]:!gap-7 md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%] min-[870px]:!gap-4">
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