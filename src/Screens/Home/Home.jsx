import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// COMPONENTS
import CardCarousel from "../../Components/Carousel/Carousel";
import EmptyCards from "../../Components/EmptyCard/EmptyCard";
import HeroSection from "../../Components/Home/HeroSection/HeroSection";
import TruncatedText from "../../Components/TruncatedText/TruncatedText";
import PropertySell from "../../Components/Home/PropertySell/PropertySell";
import CardShowcase from "../../Components/Home/CardShowcase/CardShowcase";
import HighlightBlock from "../../Components/Home/HighlightBlock/HighlightBlock";
import ProtectedSection from "../../Components/Home/ProtectedSection/ProtectedSection";
import TestimonialSection from "../../Components/Home/TestimonialSection/TestimonialSection";
import FeaturedListingCard from "../../Components/Home/FeaturedListingCard/FeaturedListingCard";
import OffMarketListingCard from "../../Components/Home/OffMarketListingCard/OffMarketListingCard";
import HowInvestorNetworkWorks from "../../Components/HowInvestorNetworkWorks/HowInvestorNetworkWorks";
import LongTermGrowthSection from "../../Components/LongTermGrowthSection/LongTermGrowthSection";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  // KEYS
  const navigate = useNavigate();
  const ApiKey = import.meta.env.VITE_API_KEY;
  const token = localStorage.getItem("token");
  const status = localStorage.getItem("status");

  // STATES
  const [Properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState(null);

  console.log(`${window.location.origin}/properties/`);


  useEffect(() => {
    async function GetProperty() {
      try {
        const GetPropertyData = await axios.get(`${ApiKey}/properties`);
        const Response = GetPropertyData.data.data;
        setProperties(Response);
      } catch (error) {
      }
    }
    GetProperty();

    const docWidth = document.documentElement.offsetWidth;
    document.querySelectorAll("*").forEach((el) => {
      if (el.offsetWidth > docWidth) {
        el.style.outline = "2px solid red";
      }
    });

    document.documentElement.classList.add("dark");
  }, []);

  const applyFilters = (properties) => {
    if (!searchFilters) return properties;

    const { propertyType, listingType, city, state, priceRange } =
      searchFilters;

    return properties.filter((item) => {
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

        switch (priceRange) {
          case "Under $250K":
            return price < 250000;
          case "$250K – $500K":
            return price >= 250000 && price <= 500000;
          case "$500K – $1M":
            return price >= 500000 && price <= 1000000;
          case "$1M – $2.5M":
            return price >= 1000000 && price <= 2500000;
          case "$2.5M – $5M":
            return price >= 2500000 && price <= 5000000;
          case "$5M – $10M":
            return price >= 5000000 && price <= 10000000;
          case "$10M – $25M":
            return price >= 10000000 && price <= 25000000;
          case "$25M – $50M":
            return price >= 25000000 && price <= 50000000;
          case "Over $50M":
            return price > 50000000;
          default:
            return true;
        }
      })();

      return (
        matchesType &&
        matchesListingType &&
        matchesCity &&
        matchesState &&
        matchesRange
      );
    });
  };

  const filteredProperties = applyFilters(Properties);

  const handleFilterChange = (filters) => {
    setSearchFilters(filters);
  };

  const OffMarketProperties = () => {
    if (filteredProperties.length === 0) {
      return <div className={`flex justify-center h-[60vh] items-center  w-[100%]   relative ${status === "active" ? "" : "blur-xl "}`}><EmptyCards Title={"No matching properties found"} /></div>;
    }

    const offMarket = filteredProperties
      .filter((items) => items.off_market_listing)
      .slice(0, 3);

    if (offMarket.length === 0) {
      return <div className={`flex justify-center h-[100vh] items-center  w-[100%]   relative ${status === "active" ? "" : "blur-xl "}`}><EmptyCards Title={"No off-market listings available"} /></div>;
    }

    return offMarket.map((items) => (

      <OffMarketListingCard
        key={items.id}
        Img={items.images[0]}
        Heading={<TruncatedText text={items.property_name} maxLength={42} />}
        MiniHeading={<TruncatedText text={items.address} maxLength={19} />}
        desc={<TruncatedText text={items.description} maxLength={90} />}
        Price={
          items.listing_type === "For Sale"
            ? items.sale_price
            : items.lease_rate
        }
        forsale={items.sale_price && items.sale_price}
        forlease={items.lease_rate && items.lease_rate}
        Status={items.listing_status}
        type={items.listing_type}
        id={items.id}
        OffMarketProperties="Off Market Property"
      />

    ));
  };

  const goToViewProperties = (filterType) => {
    if (filterType === "offmarket") {
      if (token) {
        if (status === "active") {
          navigate("/properties", { state: { filterType } });
        } else {
          navigate("/pricing");
        }
      } else {
        navigate("/login");
      }
    } else {
      navigate("/properties", {
        state: { filterType },
      });
    }
  };

  const NetWorkView = () => {
    if (!token) {
      navigate("/login");
    } else if (status !== "active") {
      navigate("/pricing");
    } else {
      navigate("/admin/network");
    }
  };

  return (
    <>

     <Helmet>
        <title>Investor-Only Commercial Real Estate Network | Newlista</title>
        <meta
          name="description"
          content="Newlista is a commercial real estate investor network where investors discover off-market opportunities and connect with capital partners to execute deals."
        />
        <link rel="canonical" href="https://www.newlista.com/" />
      </Helmet>
      <HeroSection></HeroSection>

      <div className="flex flex-col justify-center items-center min-[400px]:px-5 sm:px-0 min-[1780px]:!px-28 ">

        <CardShowcase
          NetWorkView={() => { NetWorkView() }}
          onclick={() => goToViewProperties("offmarket")}
          token={token}
        ></CardShowcase>

        {/* FEATUES PROPERTIES */}

        {/* FEATURES END */}

        {/* OFF MARKET PROPERTIES START  */}
        <section
          id="OffMarketingListing"
          className="flex flex-col justify-center items-center py-20 px-6 sm:px-8 sm:py-14 md:px-0  gap-10 sm:gap-6 w-[100%] xl:w-[93%] 2xl:w-[78%]"
        >
          {/* CONTENT SECTION  */}
          <HighlightBlock
            Heading={"Off-Market Opportunities Shared Within the Network."}
            Desc={
              "Access exclusive off-market deals not available to the public. To view full property details, you must be a subscriber."
            }
            ButtonName={"View All Off-Market Properties"}
            onClick={() => goToViewProperties("offmarket")}
          />
          {/* PROPERTY CARD SECTION  */}

          <div className="grid sm:grid-cols-2 min-[890px]:!grid-cols-3 gap-5 md:max-w-[83%] lg:max-w-[84%] place-items-center">
            {status === "active" ? (
              OffMarketProperties()
            ) : (

              OffMarketProperties()
            )}
          </div>
          {/* </div> */}
        </section>
        {/* OFF MARKET PROPERTIES  3 END */}

        {/* <TestimonialSection></TestimonialSection>
        <PropertySell></PropertySell> */}
        <HowInvestorNetworkWorks/>
<LongTermGrowthSection/>
        {/* NETWORKS CAROUSEL SECTION */}
        <section className="flex flex-col justify-center items-center pb-20 px-6 gap-10 overflow-hidden sm:pb-16 sm:px-8 md:px-0 sm:pt-10 w-[100%] xl:w-[94%] 2xl:w-[80%]">
          <HighlightBlock
            Heading={"Join the Commercial Real Estate Investor Network"}
            Desc={
              "Network with fellow investors. Exchange insights, build lasting partnerships, and discover exclusive real estate deals."
            }
            ButtonName={"View More"}
            onClick={() => {
              NetWorkView();
            }}
          />
          {/* CARD SECTION  */}
          <div className="w-[98%] sm:-ml-3 md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%] flex gap-">
            <CardCarousel />
          </div>
        </section>

        <section
          id="featurelisting"
          className="flex flex-col justify-center sm:items-center py-3 sm:py-8 lg:py-14 px-6 sm:px-8  gap-10 md:px-0 sm:gap-6 w-[100%] xl:w-[94%] 2xl:w-[80%] 2xl:pb-20"
        >
          {/* CONTENT SECTION  */}
          <HighlightBlock
            Heading={"Opportunities Shared by Investor Members"}
            Desc={
              "These opportunities are shared by members of the Newlista investor network to facilitate collaboration and partnership."
            }
            ButtonName={"View All Properties"}
            ButtonLink={"/properties"}
            onClick={() => goToViewProperties("feature")}
          />

          {filteredProperties.length === 0 ? (
            <div className="relative h-[55vh] justify-center w-[100%] items-center flex">
              <EmptyCards Title={"No matching properties found"} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 min-[870px]:!grid-cols-3 flex-wrap gap-9 sm:gap-10 xl:!gap-7 min-[1666px]:!gap-7 md:w-[84%] min-[870px]:!w-[91%] lg:!w-[84%] min-[870px]:!gap-4">
              {filteredProperties
                .filter((item) => item.featured_listing)
                .slice(0, 6)
                .map((items) => (
                  <div
                    key={items.id}
                    className=""
                  >
                    <FeaturedListingCard
                      PropertyType={items.property_type}
                      Area={items.building_size}
                      Img={items.images[0]}
                      Heading={
                        <TruncatedText
                          text={items.property_name}
                          maxLength={23}
                        />
                      }
                      desc={
                        <TruncatedText
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
                      forsale={items.sale_price && items.sale_price}
                      forlease={items.lease_rate && items.lease_rate}
                      id={items.id}
                    />
                  </div>
                ))}
            </div>
          )}
          {/* </div> */}
        </section>

      </div>
    </>
  );
};

export default Home;