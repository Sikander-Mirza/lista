// Routing/Routing.jsx
import { useEffect, useState, lazy, Suspense } from "react";
import { 
  BrowserRouter, 
  matchPath, 
  Route, 
  Routes, 
  useLocation 
} from "react-router-dom";

// Critical Components (load immediately)
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import MiniFooter from "../../Components/Footer/MiniFooter.jsx";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.jsx";
import Cookie from "../../Components/Cookie/Cookie.jsx";
import ProtectiveRoute from "../ProtectiveRoute/ProtectiveRoute.jsx";
import useUnreadMessageListener from "../../CustomHook/useUnreadMessageListener/useUnreadMessageListener.js";

// ==========================================
// PAGE LOADER COMPONENT
// ==========================================
const PageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin" />
    <p className="text-gray-500 text-sm">Loading...</p>
  </div>
);

// ==========================================
// LAZY IMPORTS WITH PRELOAD SUPPORT
// ==========================================

// Helper function to create lazy component with preload
const lazyWithPreload = (importFn) => {
  const Component = lazy(importFn);
  Component.preload = importFn;
  return Component;
};

// High Priority Pages (will be preloaded)
const Home = lazyWithPreload(() => import("../../Screens/Home/Home"));
const ViewProperty = lazyWithPreload(() => import("../../Screens/ViewProperty/ViewProperty"));
const PropertyDetails = lazyWithPreload(() => import("../../Screens/ViewProperty/PropertyDetails"));

// Medium Priority Pages
const AboutUs = lazyWithPreload(() => import("../../Screens/AboutUs/AboutUs"));
const Pricing = lazyWithPreload(() => import("../../Screens/Pricing/Pricing"));
const ContactUs = lazyWithPreload(() => import("../../Screens/ContactUs/ContactUs.jsx"));

// Auth Pages
const Login = lazyWithPreload(() => import("../../Screens/Login/login"));
const Register = lazyWithPreload(() => import("../../Screens/Register/register"));
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
// PRELOAD HOOK
// ==========================================
const usePreloadRoutes = () => {
  useEffect(() => {
    // Preload high-priority routes after initial page load
    const preloadTimeout = setTimeout(() => {
      // Preload main pages in background
      Home.preload?.();
      ViewProperty.preload?.();
      PropertyDetails.preload?.();
    }, 2000); // Wait 2 seconds after initial load

    // Preload auth pages when user hovers on login/register links
    const preloadAuthTimeout = setTimeout(() => {
      Login.preload?.();
      Register.preload?.();
    }, 5000); // Wait 5 seconds

    return () => {
      clearTimeout(preloadTimeout);
      clearTimeout(preloadAuthTimeout);
    };
  }, []);
};

// ==========================================
// LAYOUT COMPONENT
// ==========================================
const Layout = ({ children }) => {
  const location = useLocation();

  // Routes that show full layout
  const fullLayoutRoutes = [
    "/", 
    "/about-us", 
    "/pricing", 
    "/contact-us",
    "/properties", 
    "/create-property", 
    "/accessibility",
    "/privacy-policy", 
    "/terms-of-use"
  ];

  // Check if property detail page
  const isPropertyDetailPage = matchPath("/properties/:slug", location.pathname);

  // Determine what to show
  const showNavbar = fullLayoutRoutes.includes(location.pathname) || isPropertyDetailPage;
  
  const showMiniFooter = [
    "/", 
    "/about-us", 
    "/contact-us", 
    "/properties", 
    "/create-property",
    "/accessibility", 
    "/privacy-policy", 
    "/terms-of-use"
  ].includes(location.pathname) || isPropertyDetailPage;

  const showFooter = fullLayoutRoutes.includes(location.pathname) || isPropertyDetailPage;

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {showMiniFooter && <MiniFooter />}
      {showFooter && <Footer />}
    </>
  );
};

// ==========================================
// ROUTE CONFIGURATION
// ==========================================
const routeConfig = [
  // Public Routes
  { path: "/", element: <Home />, exact: true },
  { path: "/properties", element: <ViewProperty /> },
  { path: "/properties/:slug", element: <PropertyDetails /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/contact-us", element: <ContactUs /> },
  
  // Legal Routes
  { path: "/accessibility", element: <Accessibility /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-use", element: <TermsAndCondition /> },
  
  // Auth Routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/registercopy", element: <RegisterCopy /> },
  { path: "/verify-otp", element: <OptVerification /> },
  { path: "/forget-otp", element: <ForgetPassOtp /> },
  { path: "/reset-password", element: <ForgetPassword /> },
  { path: "/set-new-password", element: <SetNewPassword /> },
  { path: "/change-password", element: <ChangePassword /> },
  
  // Protected Routes
  { 
    path: "/create-property", 
    element: <ProtectiveRoute component={<AddProperty3 />} />,
    protected: true 
  },
  
  // Admin Routes
  { path: "/admin/*", element: <Admin /> },
  
  // 404
  { path: "*", element: <NotFound /> },
];

// ==========================================
// MAIN ROUTING COMPONENT
// ==========================================
const Routing = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("User"));
      if (user) setCurrentUser(user);
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }, []);

  // Listen for unread messages
  useUnreadMessageListener(currentUser);

  // Preload routes in background
  usePreloadRoutes();

  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {routeConfig.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
        <Cookie />
      </Layout>
    </BrowserRouter>
  );
};

export default Routing;