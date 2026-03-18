// Screens/ViewProperty/PropertyDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Components
import Navbar from "../../Components/Navbar/Navbar";
import MiniFooter from "../../Components/Footer/MiniFooter";
import Footer from "../../Components/Footer/Footer";
import PropertiesCards2 from "../../Components/Cards/PropertiesCards/PropertiesCards2";
import Spinner from "../../Components/Spinner/Spinner";
import TruncatedText from "../../Components/TruncatedText/TruncatedText";
import KeyFeatures from "./KeyFeatures&Amenities/KeyFeatures";
import InquiryForm from "../../Components/InquiryForm/InquiryForm";
import MakeOffer from "../../Components/MakeAnOffer/MakeOffer";
import SocialPage from "./SocialIcons/SocialIcons";
import PropertyChat from "../../Components/PropertyChat/PropertyChat";
import ReportUserModal from "../../Components/ReportModal/ReportModal";
import PropertyGallery from "../../Components/Carousel/PropertyGallery/PropertyGallery";
import SEO from "../../Components/Meta/Meta.jsx";

// Images
import SocialIcons7 from "../../assets/Icons/SocialIcons7.png";
import PropertyIcon from "../../assets/Icons/PropertyIcon.png";
import PropertyIcon2 from "../../assets/Icons/PropertyIcon2.png";
import DummyLogo from "../../assets/fallback/UnknowUser2.png";

// Icons
import { FlagOff, MapPin } from "lucide-react";

// Utils
import {
  slugify,
  generatePropertyUrl,
  generateCanonicalUrl,
  extractIdFromSlug,
  parsePropertyParams,
} from "../../utils/slugify";

const visibleFieldsByType = {
  Default: [
    "Currency",
    "MonthlyRental",
    "BuildingLevels",
    "Tenancy",
    "ParkingSpace",
    "CAM",
    "NumberOfUnits",
    "BuildingClass",
    "PercentageLeased",
    "HVAC",
    "Parking",
  ],
  Land: [
    "Currency",
    "Monthly-Rental",
    "Fenced",
    "LandScape",
    "LandScapeNumber",
    "LandScapeAcres",
    "LandScapeNumber2",
    "HVAC",
    "Parking",
  ],
};

const PropertyDetails = () => {
  // URL params: /:listingType/:city/:propertyType/:propertyName
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const ApiKey = import.meta.env.VITE_API_KEY;
  const SiteUrl = import.meta.env.VITE_SITE_URL || "https://www.newlista.com";
  const ImageKey = import.meta.env.VITE_IMAGE_KEY;
  const status = localStorage.getItem("status");

  const [UserId, setUserId] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [Properties, setProperties] = useState([]);
  const [SingleProperty, setSingleProperty] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState("");

  // Extract property ID from the last URL segment (propertyName)
  // e.g., "scuba-shop-202" → "202"
  const propertyId = useMemo(() => {
    return extractIdFromSlug(params.propertyName);
  }, [params.propertyName]);

  // Parse URL params for breadcrumbs / display
  const parsedParams = useMemo(() => {
    return parsePropertyParams(params);
  }, [params]);

  // Generate canonical URL using the new structure
  const canonicalUrl = useMemo(() => {
    if (!SingleProperty) return "";
    return generateCanonicalUrl(SingleProperty);
  }, [SingleProperty]);

  // Generate SEO description
  const seoDescription = useMemo(() => {
    if (!SingleProperty) return "";

    const price =
      SingleProperty.listing_type === "For Sale"
        ? `$${SingleProperty.sale_price}`
        : `$${SingleProperty.lease_rate}/month`;

    return `${SingleProperty.property_name} - ${SingleProperty.property_type} ${SingleProperty.listing_type} at ${SingleProperty.address}, ${SingleProperty.city}, ${SingleProperty.state}. ${price}. ${SingleProperty.description?.substring(0, 150) || ""}`;
  }, [SingleProperty]);

  // Generate OG Image
  const ogImage = useMemo(() => {
    if (!SingleProperty?.images?.[0]) return "";
    return `${ImageKey}${SingleProperty.images[0]}`;
  }, [SingleProperty, ImageKey]);

  // Fetch property data
  useEffect(() => {
    async function GetSingleProperty() {
      if (!propertyId) {
        setErrorMessage("Invalid property URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `${ApiKey}/view-property/${propertyId}`
        );
        const propertyData = response.data.data;
        setSingleProperty(propertyData);

        // Build the correct URL path for this property
        const correctPath = generatePropertyUrl(propertyData);
        const currentPath = `/${params.listingType}/${params.city}/${params.propertyType}/${params.propertyName}`;

        // Redirect to canonical URL if current URL doesn't match
        if (currentPath !== correctPath) {
          navigate(correctPath, { replace: true });
        }

        const propertiesResponse = await axios.get(`${ApiKey}/properties`);
        setProperties(propertiesResponse.data.data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    GetSingleProperty();
  }, [propertyId, ApiKey, navigate, params.listingType, params.city, params.propertyType, params.propertyName]);

  // Get user ID and track view
  useEffect(() => {
    if (!propertyId) return;

    const FindId = async () => {
      try {
        const res = await axios.get(`${ApiKey}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res) {
          setUserId(res.data.id);
        }
      } catch (error) {
        // User not logged in, ignore
      }
    };

    const ViewCounter = async () => {
      try {
        await axios.post(`${ApiKey}/listing/view/${propertyId}`, {});
      } catch (error) {
        // Ignore view counter errors
      }
    };

    if (token) {
      FindId();
    }
    ViewCounter();
  }, [propertyId, token, ApiKey]);

  const formatNumber = (num) => {
    if (num == null || isNaN(num)) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Show loading spinner
  if (Loading) {
    return (
      <div className="flex justify-center items-center py-60">
        <Spinner style={"w-14 h-20 text-PurpleColor"} />
      </div>
    );
  }

  // Show error
  if (ErrorMessage) {
    return (
      <div className="flex justify-center items-center py-60">
        <p className="text-red-500">Error: {ErrorMessage}</p>
      </div>
    );
  }

  return (
    <>
      {/* SEO Component */}
      {SingleProperty && (
        <SEO
          title={`${SingleProperty.property_name} | ${SingleProperty.property_type} ${SingleProperty.listing_type} in ${SingleProperty.city}, ${SingleProperty.state}`}
          description={seoDescription}
          canonicalUrl={canonicalUrl}
          ogImage={ogImage}
          ogType="realestate.property"
          propertyData={SingleProperty}
        />
      )}

      <section className="flex flex-col justify-center items-center">
        {SingleProperty && (
          <>
            {/* BREADCRUMBS */}
            <section className="pt-16 w-[100%] lg:px-20 2xl:w-[87%]">
              <nav className="max-[400px]:px-5 px-8 sm:px-10 lg:px-0">
                <ol className="flex items-center gap-1.5 text-[13px] font-Urbanist text-[#666] flex-wrap">
                  <li>
                    <Link to="/" className="hover:text-[#222] transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link
                      to={`/${params.listingType}`}
                      className="hover:text-[#222] transition-colors capitalize"
                    >
                      {parsedParams.listingLabel}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link
                      to={`/${params.listingType}/${params.city}`}
                      className="hover:text-[#222] transition-colors"
                    >
                      {parsedParams.city}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link
                      to={`/${params.listingType}/${params.city}/${params.propertyType}`}
                      className="hover:text-[#222] transition-colors"
                    >
                      {parsedParams.propertyType}
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-[#222] font-semibold">
                    {parsedParams.propertyName}
                  </li>
                </ol>
              </nav>
            </section>

            {/* PROPERTY DETAIL */}
            <section className="pt-4 pb-10 w-[100%] lg:px-20 2xl:w-[87%]">
              {/* ADDRESS AND SOCIAL ICONS */}
              <div className="flex flex-col lg:flex-row justify-between max-[400px]:px-5 px-8 sm:px-10 lg:px-0">
                <div className="w-[70%] flex flex-col flex-wrap md:flex-row gap-3 xl:justify-start md:items-center">
                  <h1 className="font-Urbanist max-[400px]:text-[22px] text-[25px] sm:text-[28px] lg:text-[26px] font-[700]">
                    {SingleProperty.property_name}
                  </h1>
                  <div className="flex flex-wrap gap-3">
                    <p className="border-solid border-[1px] border-[#222222] flex items-center font-Urbanist gap-1 font-[550] px-2 text-[12.5px] sm:text-[13.5px] lg:text-[13px] py-1 w-max rounded-[5px]">
                      <MapPin size={15} />
                      {SingleProperty.address} {SingleProperty.state}{" "}
                      {SingleProperty.city}
                    </p>

                    <div className="top-8 end-8">
                      {SingleProperty.listing_status === "Available" ? (
                        <button className="bg-[#28A745] text-white font-Inter px-4 py-1.5 text-[14px] rounded-[8px]">
                          Available
                        </button>
                      ) : SingleProperty.listing_status === "Sold" ? (
                        <button className="bg-[#DC3545] text-white font-Inter px-4 py-1.5 text-[14px] rounded-[8px]">
                          Sold
                        </button>
                      ) : (
                        <button className="bg-[#FFC107] text-white font-Inter px-4 py-1.5 text-[14px] rounded-[8px]">
                          {SingleProperty.listing_status}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-[30%]">
                  <SocialPage setLoading={setLoading} id={propertyId} />
                </div>
              </div>
            </section>

            {/* DETAIL SECTION */}
            <section className="max-[400px]:px-5 px-8 sm:px-10 lg:px-20 flex flex-col min-[850px]:!flex-row gap-3 w-[100%] 2xl:w-[87%]">
              {/* LEFT SIDE */}
              <div className="flex gap-8 flex-col sm:gap-12 min-[850px]:!w-[50%]">
                <PropertyGallery images={SingleProperty.images} />

                <div className="w-full px-0 lg:px-1 md:w-[94%]">
                  <div className="max-w-4xl mx-auto border border-[#BBBBBB] rounded-lg py-6 max-[400px]:px-3 px-6 lg:px-6 md:px-4 sm:p-6 bg-white">
                    <h2 className="text-[21px] md:text-[28px] leading-[34px] lg:text-3xl font-bold font-Urbanist text-[#222222] mb-4 lg:mb-6">
                      Key Features & Amenities
                    </h2>
                    <KeyFeatures SingleProperty={SingleProperty} />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="min-[850px]:!w-[50%] flex flex-col gap-8 pt-6 relative">
                {/* Price Section */}
                <div>
                  <h5 className="font-Urbanist text-[#222222] font-semibold text-[20px]">
                    Price
                  </h5>

                  {SingleProperty.listing_type === "For Sale" && (
                    <h1 className="font-Poppins text-[#222222] font-[650] text-[30px] sm:text-[36px] flex gap-6 items-center relative">
                      ${SingleProperty.sale_price}
                    </h1>
                  )}

                  {SingleProperty.listing_type === "For Lease" && (
                    <h1 className="font-Poppins text-[#222222] font-[650] text-[30px] sm:text-[36px] flex gap-6 items-center relative">
                      ${formatNumber(SingleProperty.lease_rate)}
                    </h1>
                  )}

                  {SingleProperty.listing_type ===
                    "Both (For Sale & For Lease)" && (
                    <div className="mb-6">
                      <h1 className="font-Poppins text-[#222222] font-[650] text-[30px] sm:text-[36px] flex gap-10 items-center relative">
                        <div className="flex flex-col leading-[40px]">
                          <span className="text-[23px]">Sale:</span>
                          <span>${SingleProperty.sale_price}</span>
                        </div>
                        <div className="flex flex-col leading-[40px] border-l-[1px] pl-10 border-gray-300">
                          <span className="text-[23px]">Lease:</span>
                          <div>
                            ${formatNumber(SingleProperty.lease_rate)}
                            <span className="text-[20px]">
                              / {SingleProperty.lease_rate_unit}
                            </span>
                          </div>
                        </div>
                      </h1>
                    </div>
                  )}

                  {UserId !== SingleProperty.user.id && (
                    <div className="flex gap-4">
                      <InquiryForm
                        ListingType={SingleProperty.listing_type}
                        id={propertyId}
                        propertyAddress={`${SingleProperty.address} ${SingleProperty.city} ${SingleProperty.state}`}
                      />
                      <PropertyChat
                        propertyName={SingleProperty.property_name}
                        id={propertyId}
                      />
                    </div>
                  )}
                </div>

                {/* Report Button */}
                {token && (
                  <button
                    onClick={() => setShowReportModal(true)}
                    title="Report User"
                    className="absolute right-0"
                  >
                    <FlagOff className="bg-red-500 text-white px-2 rounded-full size-8 cursor-pointer" />
                  </button>
                )}

                {/* User Info */}
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-3">
                      <img
                        className="rounded-full w-[65px] h-[65px] object-cover"
                        src={
                          SingleProperty.user.headshot
                            ? `${ImageKey}${SingleProperty.user.headshot}`
                            : DummyLogo
                        }
                        alt={SingleProperty.user.first_name}
                      />
                      <span>
                        <h1 className="font-Urbanist text-[18.5px] sm:text-[21px] font-[700]">
                          {SingleProperty.user.first_name}{" "}
                          {SingleProperty.user.last_name}
                        </h1>
                        {(SingleProperty.user.city ||
                          SingleProperty.user.state) && (
                          <p className="font-Urbanist text-[15px] sm:text-[16px] flex items-center gap-1">
                            <img
                              className="w-[15px] h-[14px]"
                              src={SocialIcons7}
                              alt=""
                            />
                            {SingleProperty.user.city}{" "}
                            {SingleProperty.user.state}
                          </p>
                        )}
                      </span>
                    </span>
                  </div>

                  {status === "active" && (
                    <span>
                      {SingleProperty.show_phone && (
                        <p className="font-Urbanist text-[16px] sm:text-[17px] font-semibold">
                          Phone: {SingleProperty.user.phone}
                        </p>
                      )}
                      {SingleProperty.show_email && (
                        <p className="font-Urbanist text-[16px] sm:text-[17px] font-semibold">
                          Email: {SingleProperty.user.email}
                        </p>
                      )}
                    </span>
                  )}

                  {UserId !== SingleProperty.user.id && (
                    <MakeOffer id={propertyId} />
                  )}
                </div>

                {/* Description */}
                <div className="border-[1px] border-solid border-[#BBBBBB] rounded-[8px] px-5 py-6 flex flex-col justify-center gap-2">
                  <div className="border-b-[1px] border-solid border-[#BBBBBB] pb-7">
                    <h1 className="text-[#222222] font-Urbanist text-[22px] sm:text-[25px] font-[700] mb-3">
                      Description
                    </h1>
                    <p className="font-Urbanist font-[500] break-all text-[13.5px] sm:text-[15px] text-[#222222]">
                      {SingleProperty.description}
                    </p>
                  </div>

                  {/* Property Details Grid */}
                  <div className="grid xl:flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[850px]:!grid-cols-1 lg:!grid-cols-2 2xl:!grid-cols-3 gap-6 sm:gap-0 lg:gap-4 pt-4">
                    {SingleProperty.custom_fields?.YearBuilt && (
                      <div className="flex flex-col gap-1 border-b sm:border-b-0 lg:mr-5 lg:border-r border-[#BBBBBB] pb-4 lg:pb-0 xl:w-[25%]">
                        <span className="flex gap-2 items-center">
                          <img
                            className="w-[20px] h-5"
                            src={PropertyIcon}
                            alt=""
                          />
                          <p className="font-Urbanist font-[500] text-[15px] text-[#222222]">
                            Year Built
                          </p>
                        </span>
                        <p className="font-Urbanist font-[700] text-[23px] sm:text-[25px] text-[#222222]">
                          {SingleProperty.custom_fields.YearBuilt}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col gap-1 border-b sm:border-b-0 pb-4 lg:border-r border-[#BBBBBB] lg:pb-0 xl:w-[40%] justify-start">
                      <span className="flex gap-2 items-center">
                        <img
                          className="w-[20px] h-5"
                          src={PropertyIcon2}
                          alt=""
                        />
                        <p className="font-Urbanist font-[500] text-[15px] text-[#222222]">
                          Property Type
                        </p>
                      </span>
                      <p className="font-Urbanist font-[700] text-[20px] sm:text-[21px] text-[#222222]">
                        {SingleProperty.property_type}
                      </p>
                    </div>

                    {SingleProperty.building_size && (
                      <div className="flex flex-col gap-1 pl-4 xl:w-[30%]">
                        <span className="flex gap-2 items-center">
                          <img
                            className="w-[20px] h-5"
                            src={PropertyIcon}
                            alt=""
                          />
                          <p className="font-Urbanist font-[500] text-[15px] text-[#222222]">
                            Area
                          </p>
                        </span>
                        <p className="font-Urbanist font-[700] text-[20px] sm:text-[21px] text-[#222222]">
                          {SingleProperty.building_size}
                          {SingleProperty.custom_fields?.BuildingSize &&
                            ` ${SingleProperty.custom_fields.BuildingSize}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Overview */}
                <div className="border-[1px] border-solid border-[#BBBBBB] rounded-[8px] px-5 py-6 flex flex-col justify-center gap-2">
                  <h1 className="text-[#222222] font-Urbanist text-[22px] sm:text-[25px] font-[700] sm:mb-3">
                    Property Overview
                  </h1>

                  {(SingleProperty.listing_type === "For Sale" ||
                    SingleProperty.listing_type ===
                      "Both (For Sale & For Lease)") && (
                    <>
                      <p className="font-Urbanist font-[600] text-[14px] sm:text-[16px] text-[#222222]">
                        💰 Net Operating Income (NOI):
                        <span className="font-bold">
                          {" "}
                          ${SingleProperty.noi || "None"}
                        </span>
                      </p>
                      <p className="font-Urbanist font-[600] text-[14px] sm:text-[16px] text-[#222222]">
                        📈 Cap Rate:
                        <span className="font-bold">
                          {" "}
                          {Math.round(SingleProperty.cap_rate) || "0"}%
                        </span>
                      </p>
                    </>
                  )}

                  {(SingleProperty.listing_type === "For Lease" ||
                    SingleProperty.listing_type ===
                      "Both (For Sale & For Lease)") && (
                    <>
                      <p className="font-Urbanist font-[600] text-[14px] sm:text-[16px] text-[#222222]">
                        ✔ Lease Type:
                        <span className="font-bold">
                          {" "}
                          {SingleProperty.lease_type || "N/A"}
                        </span>
                      </p>
                      <p className="font-Urbanist font-[600] text-[14px] sm:text-[16px] text-[#222222]">
                        〽 Lease Rate & Unit:
                        <span className="font-bold">
                          {" "}
                          {SingleProperty.lease_rate}{" "}
                          {SingleProperty.lease_rate_unit}
                        </span>
                      </p>
                    </>
                  )}

                  <p className="font-Urbanist font-[600] text-[14px] sm:text-[16px] text-[#222222]">
                    💳 Owner Financing:
                    <span className="font-bold">
                      {" "}
                      {SingleProperty.owner_financing ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                {/* Map */}
                <div className="flex justify-center items-center">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${SingleProperty.address}, ${SingleProperty.city}, ${SingleProperty.state}, ${SingleProperty.zip}`
                    )}&output=embed`}
                    className="w-full h-[220px] sm:h-[300px] md:h-[250px] lg:h-[300px] rounded-[8px]"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                  />
                </div>
              </div>
            </section>

            {/* Other Properties Section */}
            <section className="max-[370px]:px-5 px-8 py-14 sm:px-10 lg:px-20 sm:py-28 w-[100%] 2xl:w-[88%]">
              <div>
                <h1 className="text-center sm:text-start max-[370px]:text-[28px] text-[32px] leading-[35px] font-[700] font-Urbanist text-[#1E1E1E] sm:text-[33px] lg:text-[38px] sm:leading-[48px]">
                  Other Properties you might like
                </h1>
              </div>
              <div className="w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-5 sm:mt-5 lg:mt-10 place-items-center sm:place-items-start">
                {Properties?.slice(0, 4).map((item) =>
                  Number(item.id) !== Number(propertyId) ? (
                    <div
                      key={item.id}
                      className="max-[400px]:w-[270px] w-[300px] sm:w-[275px] md:w-[300px] xl:w-[275px]"
                    >
                      <PropertiesCards2
                        PropertyType={item.property_type}
                        Area={item.building_size}
                        Heading={item.property_name}
                        desc={
                          <TruncatedText
                            text={item.description}
                            maxLength={90}
                          />
                        }
                        Status={item.listing_type}
                        Price={
                          <TruncatedText
                            text={
                              item.listing_type === "For Sale"
                                ? item.sale_price
                                : item.lease_rate
                            }
                            maxLength={9}
                          />
                        }
                        forsale={item.sale_price}
                        forlease={item.lease_rate}
                        id={item.id}
                        images={item.images[0]}
                        // Pass the new URL structure to the card
                        propertyUrl={generatePropertyUrl(item)}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </section>
          </>
        )}

        {/* Report Modal */}
        {showReportModal && SingleProperty && (
          <ReportUserModal
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            userId={SingleProperty.user.id}
            from={`From ${SingleProperty.property_name} Property:`}
          />
        )}
      </section>
    </>
  );
};

export default PropertyDetails;