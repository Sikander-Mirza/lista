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

// Error Page
const NotFound = lazy(() => import("../../Screens/404NotFound/NotFound.jsx"));

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
// LAYOUT COMPONENT
// ==========================================
const Layout = memo(({ children }) => {
  const location = useLocation();

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

  const isPropertyDetailPage = matchPath("/properties/:slug", location.pathname);
  const showLayout = fullLayoutRoutes.includes(location.pathname) || isPropertyDetailPage;

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
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<ViewProperty />} />
            <Route path="/properties/:slug" element={<PropertyDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* Legal Routes */}
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsAndCondition />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registercopy" element={<RegisterCopy />} />
            <Route path="/verify-otp" element={<OptVerification />} />
            <Route path="/forget-otp" element={<ForgetPassOtp />} />
            <Route path="/reset-password" element={<ForgetPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* Protected Routes */}
            <Route
              path="/create-property"
              element={<ProtectiveRoute component={<AddProperty3 />} />}
            />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<Admin />} />

            {/* 404 */}
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