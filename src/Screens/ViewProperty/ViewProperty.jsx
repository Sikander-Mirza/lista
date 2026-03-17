
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
// COMPONENTS
import Spinner from "../../Components/Spinner/Spinner";
import SearchBar from "../../Components/SearchBar/SearchBar";
import EmptyCards from "../../Components/EmptyCard/EmptyCard";
import TruncatedText from "../../Components/TruncatedText/TruncatedText";
import PropertiesCards2 from "../../Components/Cards/PropertiesCards/PropertiesCards2";
import { Helmet } from 'react-helmet-async';
// IMAGES
import AddPropertyBanner from "../../assets/Banners/AddPropertyBanner.jpg";


// BACKGORUND
const BannerBackground = {
  backgroundImage: `url(${AddPropertyBanner})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "black",
  backgroundColor: "#0009",
};

const ViewProperty = () => {

  const location = useLocation();
  const ApiKey = import.meta.env.VITE_API_KEY;
  const isLoggedIn = localStorage.getItem("status");
  const filters = useSelector((state) => state.filters);

  // STATES 
  const [DefaultTab, setDefaulTab] = useState()
  const [Loading, setLoading] = useState(false);
  const [Properties, setProperties] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchFilters, setSearchFilters] = useState(null);
  const [FilterValue, setFilterValue] = useState("AllProperties");
  const [PackageUpgrade, setPackageUpgrade] = useState(false)

  useEffect(() => {
    if (filters) {
      setSearchFilters(filters);
    }
  }, [filters]);

  useEffect(() => {
    async function GetProperty() {
      try {
        setLoading(true);
        const GetPropertyData = await axios.get(`${ApiKey}/properties`);
        const Response = GetPropertyData.data.data;
        setProperties(Response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    GetProperty();
  }, []);

  useEffect(() => {
    if (!location?.state?.filterType) return;

    const filterType = location.state.filterType;

    if (filterType === "offmarket") {
      setFilterValue("Off Market Properties");
      setSearchFilters((prev) => ({
        ...prev,
        listingType: "Off Market Listing",
      }));

      setSelectedIndex(0);
    } else if (filterType === "feature") {
      setFilterValue("Features Property");
      setSelectedIndex(0);
    } else {
      setFilterValue("AllProperties");
      setSelectedIndex(0);
    }
  }, [location?.state?.filterType]);


  const filteredProperties = useMemo(() => {
    if (!Properties || Properties.length === 0) return [];

    let result = [...Properties];

    if (FilterValue === "Standard Property") {
      result = result.filter(
        (p) => p.off_market_listing === false && p.featured_listing === false
      );
    }

    // Dropdown filtering
    if (FilterValue === "Features Property") {
      result = result.filter((p) => {
        if (p.featured_listing) {
          if (p.off_market_listing && isLoggedIn !== "active") {
            return false;
          }
          return true;
        }
        return false;
      });
    }

    if (FilterValue === "Off Market Properties") {
      result =
        isLoggedIn === "active"
          ? result.filter((p) => p.off_market_listing)
          : [];
    }

    if (!selectedTab || selectedTab.toLowerCase() === "all properties") {
      result =
        isLoggedIn === "active"
          ? result
          : result.filter((p) => !p.off_market_listing);
    } else {
      result =
        isLoggedIn === "active"
          ? result
          : result.filter((p) => !p.off_market_listing);
    }


    if (FilterValue === "AllProperties") {
      if (!selectedTab || selectedTab.toLowerCase() === "all properties") {
        result =
          isLoggedIn === "active"
            ? result
            : result.filter((p) => !p.off_market_listing);
      } else {
        result = result.filter(
          (p) =>
            p.property_type?.toLowerCase().trim() ===
            selectedTab.toLowerCase().trim()
        );
      }
    }

    // 🔍 Apply SearchBar filters if provided
    if (searchFilters) {
      const { listingType, propertyType, state, city, priceRange, propertyName } =
        searchFilters;

      if (location?.state?.filterType === "offmarket") {
        setPackageUpgrade(true)
        if (isLoggedIn === "active") {
          // Show only off-market listings
          result = result.filter(p => Boolean(p.off_market_listing) === true);
        } else {
          result = [];
        }
      }


      if (listingType === "Off Market Listing") {
        setPackageUpgrade(true)
        if (isLoggedIn === "active") {
          // Show only off-market listings
          result = result.filter(p => Boolean(p.off_market_listing) === true);
        } else {
          result = [];
        }
      } else {
        const selectedType = listingType?.toLowerCase();
        const noTypeSelected = !selectedType || selectedType === "select";
        const featured = result.filter(p =>
          Boolean(p.featured_listing) === true &&
          Boolean(p.off_market_listing) !== true &&
          (noTypeSelected || p.listing_type?.toLowerCase() === selectedType)
        );

        const regular = result.filter(p =>
          Boolean(p.featured_listing) !== true &&
          Boolean(p.off_market_listing) !== true &&
          (noTypeSelected || p.listing_type?.toLowerCase() === selectedType)
        );
        result = [...featured, ...regular];
      }





      if (propertyName && propertyName !== "Select Your Property" && propertyName !== "All Properties") {
        setDefaulTab(propertyName);

        result = result.filter(
          (p) =>
            p.property_type?.toLowerCase().trim() ===
            propertyName.toLowerCase().trim()
        );
      } else {

        setDefaulTab("All Properties");
      }

      if (state && state.toLowerCase() !== "any") {
        result = result.filter(
          (p) => p.state?.toLowerCase() === state.toLowerCase()
        );
      }

      if (city && city.toLowerCase() !== "any") {
        result = result.filter(
          (p) => p.city?.toLowerCase() === city.toLowerCase()
        );
      }


      if (priceRange && priceRange !== "any") {
        result = result.filter((p) => {
          const prices =
            p.listing_type === "For Sale" ? p.sale_price : p.lease_rate;

          let price = Number(prices.replace(/,/g, ""));

          if (price === null || price === undefined) return false;

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
        });
      }
    }

    return result;
  }, [Properties, isLoggedIn, FilterValue, selectedTab, searchFilters]);




   const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

 const itemListSchema =
    Properties && Properties.length
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id":
                "https://www.newlista.com/properties/#webpage",
              url: "https://www.newlista.com/properties",
              name: "Commercial Property Listings | Newlista",
              description:
                "Browse available commercial real estate listings including medical offices, mixed-use buildings and specialty commercial properties.",
              isPartOf: {
                "@id": "https://www.newlista.com/#website",
              },
            },
            {
              "@type": "WebSite",
              "@id": "https://www.newlista.com/#website",
              url: "https://www.newlista.com",
              name: "Newlista",
            },
            {
              "@type": "ItemList",
              "@id":
                "https://www.newlista.com/properties/#itemlist",
              name: "Newlista Property Listings",
              url: "https://www.newlista.com/properties",
              numberOfItems: Properties.length,
              itemListOrder:
                "https://schema.org/ItemListOrderAscending",
              itemListElement: Properties.map((p, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://www.newlista.com/properties/${p.id}`,
                name: p.property_name,
              })),
            },
          ],
        }
      : null;

 return (
  <>

 <Helmet>
        <title>Investor Off‑Market Commercial Property Listings | Newlista</title>
        <meta
          name="description"
          content="Explore off‑market commercial property listings and investment opportunities on Newlista’s investor‑only network, and connect with sellers and fellow investors."
        />
        {itemListSchema && (
          <script type="application/ld+json">
            {JSON.stringify(itemListSchema)}
          </script>
        )}
      </Helmet>

    {/* BANNER START  */}
    <section
      style={BannerBackground}
      className="flex items-center justify-center"
    >
      <div className="pt-16 pb-20 sm:ml-0 md:py-16 lg:py-28 lg:px-12 max-[350px]:w-[90%] w-[75%] sm:w-[50%] md:w-[90%] min-[800px]:w-[80%] lg:w-[100%] xl:w-[100%] 2xl:w-[80%]">
        <SearchBar ByDefault={selectedTab} active="Yes" />
      </div>
    </section>
    {/* BANNER END */}

    {/* HEADING */}
    {/* HEADING + PROPERTY CARDS WRAPPER */}
<section className="py-10 sm:py-12 lg:py-16">
  {/* shared width & centering */}
  <div className="w-full px-6 min-[350px]:px-8 sm:px-10 md:px-16 lg:px-20 2xl:px-28">
    <div className="max-w-6xl mx-auto">
      {/* HEADING */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h1 className="font-Poppins font-[700] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-tight">
          Off‑Market Commercial Property Listings for Investors
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600">
          Access vetted off‑market deals and opportunities you won’t find on public platforms.
        </p>
      </div>

      {/* PROPERTY CARDS */}
      <div className="flex justify-center">
        {!Loading ? (
          <div
            id="offmarket"
            className="w-full grid sm:grid-cols-2 min-[860px]:!grid-cols-3 xl:!grid-cols-4 flex-wrap justify-center gap-8 sm:gap-6 md:gap-10 min-[860px]:!gap-5 xl:!gap-5 2xl:!gap-7"
          >
            {filteredProperties.length === 0 ? (
              <div className="relative min-h-[40vh] flex justify-center items-center col-span-full">
                <EmptyCards
                  type={PackageUpgrade}
                  Title={
                    isLoggedIn
                      ? 'No properties match the selected filter.'
                      : 'Unlock hidden opportunities by upgrading to a premium membership'
                  }
                />
              </div>
            ) : (
              filteredProperties.map((items) => (
                <PropertiesCards2
                  key={items.id}
                  PropertyType={items.property_type}
                  Area={items.building_size}
                  type={items.listing_type}
                  Img={items.images[0]}
                  Heading={items.property_name}
                  desc={
                    <TruncatedText
                      text={items.description}
                      maxLength={90}
                    />
                  }
                  Status={items.listing_type}
                  Price={
                    <TruncatedText
                      text={
                        items.listing_type === 'For Sale'
                          ? items.sale_price
                          : formatNumber(items.lease_rate)
                      }
                      maxLength={10}
                    />
                  }
                  forsale={items.sale_price && items.sale_price}
                  forlease={
                    items.lease_rate && formatNumber(items.lease_rate)
                  }
                  id={items.id}
                  images={items.images[0]}
                  CheckProperty={
                    items.off_market_listing ? 'Off Market Property' : ''
                  }
                  featured_listing={
                    items.featured_listing && 'Featured Listing'
                  }
                />
              ))
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center !h-[75vh]">
            <Spinner style="w-14 h-20 text-PurpleColor z-50" />
          </div>
        )}
      </div>
    </div>
  </div>
</section>
  </>
);
};

export default ViewProperty;
