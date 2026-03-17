import { useEffect, useState, lazy, Suspense, memo, useCallback } from "react";
import {
  BrowserRouter,
  matchPath,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// ✅ ONLY load ScrollToTop synchronously (tiny component)
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop.jsx";
import ProtectiveRoute from "../ProtectiveRoute/ProtectiveRoute.jsx";

// ✅ LAZY LOAD layout components — they're not needed for first contentful paint
const Navbar = lazy(() => import("../../Components/Navbar/Navbar.jsx"));
const Footer = lazy(() => import("../../Components/Footer/Footer.jsx"));
const MiniFooter = lazy(() => import("../../Components/Footer/MiniFooter.jsx"));
const Cookie = lazy(() => import("../../Components/Cookie/Cookie.jsx"));

// ==========================================
// PAGE LOADER COMPONENT
// ==========================================
const PageLoader = memo(() => (
  <div 
    className="flex flex-col justify-center items-center min-h-[60vh] gap-4"
    style={{ contain: 'layout style paint' }}
  >
    <div 
      className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"
      style={{ willChange: 'transform' }}
    />
    <p className="text-gray-500 text-sm">Loading...</p>
  </div>
));
PageLoader.displayName = 'PageLoader';

// ✅ Minimal navbar fallback — prevents layout shift
const NavbarFallback = memo(() => (
  <div 
    className="h-16 sm:h-20 bg-white border-b border-gray-100"
    style={{ contain: 'layout style' }}
  />
));
NavbarFallback.displayName = 'NavbarFallback';

// ✅ Minimal footer fallback
const FooterFallback = memo(() => (
  <div 
    className="h-64 bg-gray-900"
    style={{ contain: 'layout style' }}
  />
));
FooterFallback.displayName = 'FooterFallback';

// ==========================================
// LAZY IMPORTS WITH PRELOAD SUPPORT
// ==========================================
const lazyWithPreload = (importFn) => {
  const Component = lazy(importFn);
  Component.preload = importFn;
  return Component;
};

// ✅ Home is highest priority
const Home = lazyWithPreload(() => import("../../Screens/Home/Home"));

// Medium Priority Pages
const ViewProperty = lazyWithPreload(() => import("../../Screens/ViewProperty/ViewProperty"));
const PropertyDetails = lazyWithPreload(() => import("../../Screens/ViewProperty/PropertyDetails"));
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
// PRELOAD HOOK — Optimized timing
// ==========================================
const usePreloadRoutes = () => {
  useEffect(() => {
    // ✅ Use requestIdleCallback to avoid blocking main thread
    const preloadWhenIdle = (preloadFn, timeout = 5000) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => preloadFn?.(), { timeout });
      } else {
        setTimeout(() => preloadFn?.(), timeout);
      }
    };

    // Preload Home immediately if not already loaded (for back navigation)
    preloadWhenIdle(Home.preload, 1000);

    // Preload other high-priority routes after 3 seconds
    const timer1 = setTimeout(() => {
      preloadWhenIdle(ViewProperty.preload);
      preloadWhenIdle(PropertyDetails.preload);
    }, 3000);

    // Preload auth pages after 6 seconds
    const timer2 = setTimeout(() => {
      preloadWhenIdle(Login.preload);
      preloadWhenIdle(Register.preload);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
};

// ==========================================
// LAYOUT COMPONENT — Memoized to prevent re-renders
// ==========================================
const Layout = memo(({ children }) => {
  const location = useLocation();

  // ✅ Memoize route checks
  const layoutConfig = useCallback(() => {
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

    const miniFooterRoutes = [
      "/",
      "/about-us",
      "/contact-us",
      "/properties",
      "/create-property",
      "/accessibility",
      "/privacy-policy",
      "/terms-of-use",
    ];

    const isPropertyDetailPage = matchPath("/properties/:slug", location.pathname);
    const isFullLayout = fullLayoutRoutes.includes(location.pathname) || isPropertyDetailPage;
    const hasMiniFooter = miniFooterRoutes.includes(location.pathname) || isPropertyDetailPage;

    return {
      showNavbar: isFullLayout,
      showMiniFooter: hasMiniFooter,
      showFooter: isFullLayout,
    };
  }, [location.pathname]);

  const { showNavbar, showMiniFooter, showFooter } = layoutConfig();

  return (
    <>
      {showNavbar && (
        <Suspense fallback={<NavbarFallback />}>
          <Navbar />
        </Suspense>
      )}
      
      <main className="min-h-screen" style={{ contain: 'layout style' }}>
        {children}
      </main>
      
      {showMiniFooter && (
        <Suspense fallback={null}>
          <MiniFooter />
        </Suspense>
      )}
      
      {showFooter && (
        <Suspense fallback={<FooterFallback />}>
          <Footer />
        </Suspense>
      )}
    </>
  );
});
Layout.displayName = 'Layout';

// ==========================================
// ROUTE CONFIGURATION
// ==========================================
const routeConfig = [
  // Public Routes
  { path: "/", element: <Home /> },
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
  },

  // Admin Routes
  { path: "/admin/*", element: <Admin /> },

  // 404
  { path: "*", element: <NotFound /> },
];

// ==========================================
// UNREAD MESSAGE LISTENER — Lazy loaded
// ==========================================
const UnreadMessageListener = memo(({ userId }) => {
  useEffect(() => {
    if (!userId) return;

    // ✅ Dynamically import the hook to reduce initial bundle
    import("../../CustomHook/useUnreadMessageListener/useUnreadMessageListener.js")
      .then((module) => {
        // Hook is loaded, it will handle its own logic
      })
      .catch(() => {});
  }, [userId]);

  return null;
});
UnreadMessageListener.displayName = 'UnreadMessageListener';

// ==========================================
// MAIN ROUTING COMPONENT
// ==========================================
const Routing = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Load user in requestAnimationFrame to avoid blocking render
  useEffect(() => {
    requestAnimationFrame(() => {
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        if (user) setCurrentUser(user);
      } catch {
        // Silent fail
      }
    });
  }, []);

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
        
        {/* ✅ Load Cookie after page is interactive */}
        <Suspense fallback={null}>
          <Cookie />
        </Suspense>
        
        {/* ✅ Load message listener only if user exists */}
        {currentUser && <UnreadMessageListener userId={currentUser.id} />}
      </Layout>
    </BrowserRouter>
  );
};

export default Routing;