// Routing.jsx
import { useEffect, useState, lazy, Suspense, memo } from "react";
import {
  BrowserRouter,
  matchPath,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.jsx";
import ProtectiveRoute from "../ProtectiveRoute/ProtectiveRoute.jsx";

// ==========================================
// LAZY IMPORTS — Simple, no preload complexity
// ==========================================

// Layout Components
const Navbar = lazy(() => import("../../Components/Navbar/Navbar.jsx"));
const Footer = lazy(() => import("../../Components/Footer/Footer.jsx"));
const MiniFooter = lazy(() => import("../../Components/Footer/MiniFooter.jsx"));
const Cookie = lazy(() => import("../../Components/Cookie/Cookie.jsx"));

// Pages — Simple lazy imports
const Home = lazy(() => import("../../Screens/Home/Home"));
const ViewProperty = lazy(() => import("../../Screens/ViewProperty/ViewProperty"));
const PropertyDetails = lazy(() => import("../../Screens/ViewProperty/PropertyDetails"));
const AboutUs = lazy(() => import("../../Screens/AboutUs/AboutUs"));
const Pricing = lazy(() => import("../../Screens/Pricing/Pricing"));
const ContactUs = lazy(() => import("../../Screens/ContactUs/ContactUs.jsx"));

// Auth Pages
const Login = lazy(() => import("../../Screens/Login/login"));
const Register = lazy(() => import("../../Screens/Register/register"));
const RegisterCopy = lazy(() => import("../../Screens/Register/register copy.jsx"));
const OptVerification = lazy(() => import("../../Screens/Authentication/OptVerification.jsx"));
const ForgetPassOtp = lazy(() => import("../../Screens/Authentication/ForgetPassOpt.jsx"));
const ForgetPassword = lazy(() => import("../../Screens/Authentication/ForgetPassword.jsx"));
const SetNewPassword = lazy(() => import("../../Screens/Authentication/SetNewPassword.jsx"));
const ChangePassword = lazy(() => import("../../Screens/Authentication/ChangePassword.jsx"));

// Legal Pages
const Accessibility = lazy(() => import("../../Screens/Accessibility/Accessibility.jsx"));
const PrivacyPolicy = lazy(() => import("../../Screens/Privacy/PrivacyPolicy.jsx"));
const TermsAndCondition = lazy(() => import("../../Screens/Terms/TermsAndConditon.jsx"));

// Protected/Admin Pages
const Admin = lazy(() => import("../../Screens/Admin/Admin"));
const AddProperty3 = lazy(() => import("../../Screens/AddProperty/AddProperty3.jsx"));

// Redirects
// const OldUrlRedirect = lazy(() => import("../../Components/Redirects/OldUrlRedirect.jsx"));

// Error Page
const NotFound = lazy(() => import("../../Screens/404NotFound/NotFound.jsx"));

// ==========================================
// VALID LISTING TYPES — Used to distinguish property URLs from other routes
// ==========================================
const VALID_LISTING_TYPES = ["buy", "rent"];

// ==========================================
// FALLBACK COMPONENTS
// ==========================================
const PageLoader = memo(() => (
  <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin" />
  </div>
));
PageLoader.displayName = "PageLoader";

const NavbarFallback = () => <div className="h-16 sm:h-20 bg-white" />;
const FooterFallback = () => <div className="h-64 bg-gray-900" />;

// ==========================================
// HELPER: Check if current path is a property detail page
// ==========================================
const isPropertyDetailPath = (pathname) => {
  // Match: /buy/city/type/name OR /rent/city/type/name
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 4 && VALID_LISTING_TYPES.includes(segments[0])) {
    return true;
  }

  // Also match category pages: /buy, /rent, /buy/city, /buy/city/type
  if (segments.length >= 1 && VALID_LISTING_TYPES.includes(segments[0])) {
    return true;
  }

  return false;
};

// ==========================================
// LAYOUT COMPONENT
// ==========================================
const Layout = memo(({ children }) => {
  const location = useLocation();

  // Routes that should show full layout (Navbar + Footer)
  const fullLayoutRoutes = [
    "/",
    "/about-us",
    "/pricing",
    "/contact-us",
    "/properties",
    "/create-property",
    "/accessibility",
    "/privacy-policy",
    "/terms-of-use",
  ];

  // Check if current path should show layout
  const showLayout =
    fullLayoutRoutes.includes(location.pathname) ||
    isPropertyDetailPath(location.pathname) ||
    // Support old URL format during transition
    matchPath("/properties/:slug", location.pathname);

  return (
    <>
      {showLayout && (
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>
      )}

      <main className="min-h-screen">{children}</main>

      {showLayout && (
        <>
          <Suspense fallback={null}>
            <MiniFooter />
          </Suspense>
          <Suspense fallback={<FooterFallback />}>
            <Footer />
          </Suspense>
        </>
      )}
    </>
  );
});
Layout.displayName = "Layout";

// ==========================================
// MAIN ROUTING COMPONENT
// ==========================================
const Routing = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user) setCurrentUser(user);
    } catch {
      // Silent fail
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ================================ */}
            {/* Public Routes                    */}
            {/* ================================ */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* ================================ */}
            {/* Property Routes — New Structure  */}
            {/* ================================ */}

            {/* All properties listing page */}
            <Route path="/properties" element={<ViewProperty />} />

            {/* 
              Property Detail Page
              URL: /buy/holden-beach/commercial/scuba-shop-202
              URL: /rent/wilmington/office/downtown-suite-55
            */}
            <Route
              path="/:listingType/:city/:propertyType/:propertyName"
              element={<PropertyDetails />}
            />

            {/* 
              Optional: Category/Filter pages
              URL: /buy → All properties for sale
              URL: /rent → All properties for rent
              URL: /buy/holden-beach → All for-sale in Holden Beach
              URL: /buy/holden-beach/commercial → All commercial for-sale in Holden Beach
            */}
            Uncomment these when you create the category pages:
            <Route path="/buy" element={<ViewProperty />} />
            <Route path="/rent" element={<ViewProperty />} />
            <Route path="/:listingType/:city" element={<ViewProperty />} />
            <Route path="/:listingType/:city/:propertyType" element={<ViewProperty />} />
           

            {/* 
              Old URL Redirect — Maintains SEO during transition
              /properties/scuba-shop-202 → /buy/holden-beach/commercial/scuba-shop-202
            */}
            {/* <Route path="/properties/:slug" element={<OldUrlRedirect />} /> */}

            {/* ================================ */}
            {/* Legal Routes                     */}
            {/* ================================ */}
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsAndCondition />} />

            {/* ================================ */}
            {/* Auth Routes                      */}
            {/* ================================ */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registercopy" element={<RegisterCopy />} />
            <Route path="/verify-otp" element={<OptVerification />} />
            <Route path="/forget-otp" element={<ForgetPassOtp />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* ================================ */}
            {/* Protected Routes                 */}
            {/* ================================ */}
            <Route
              path="/create-property"
              element={<ProtectiveRoute component={<AddProperty3 />} />}
            />

            {/* ================================ */}
            {/* Admin Routes                     */}
            {/* ================================ */}
            <Route path="/admin/*" element={<Admin />} />

            {/* ================================ */}
            {/* 404 — Must be last               */}
            {/* ================================ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {/* Cookie loads last, non-blocking */}
        <Suspense fallback={null}>
          <Cookie />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default Routing;