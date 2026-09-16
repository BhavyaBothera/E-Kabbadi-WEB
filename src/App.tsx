import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PickupProvider } from './context/PickupContext';

// Common Components (Loaded Synchronously for immediate paint)
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { QuickDemoBar } from './components/common/QuickDemoBar';
import { Footer } from './components/common/Footer';

// Helper to handle named exports with React.lazy
const lazyImport = <T extends Record<string, any>, K extends keyof T>(
  factory: () => Promise<T>,
  name: K
) => React.lazy(() => factory().then((module) => ({ default: module[name] })));

// --- Lazy Loaded Pages (Code Splitting for Performance) ---
const LandingPage = lazyImport(() => import('./pages/LandingPage'), 'LandingPage');
const RatesPage = lazyImport(() => import('./pages/public/RatesPage'), 'RatesPage');
const HowItWorksPage = lazyImport(() => import('./pages/public/HowItWorksPage'), 'HowItWorksPage');
const BulkBusinessPage = lazyImport(() => import('./pages/public/BulkBusinessPage'), 'BulkBusinessPage');
const SocietiesPage = lazyImport(() => import('./pages/public/SocietiesPage'), 'SocietiesPage');
const EPRCompliancePage = lazyImport(() => import('./pages/public/EPRCompliancePage'), 'EPRCompliancePage');
const CentersPage = lazyImport(() => import('./pages/public/CentersPage'), 'CentersPage');
const AboutPage = lazyImport(() => import('./pages/public/AboutPage'), 'AboutPage');
const LoginPage = lazyImport(() => import('./pages/auth/LoginPage'), 'LoginPage');
const SignupPage = lazyImport(() => import('./pages/auth/SignupPage'), 'SignupPage');
const ForgotPasswordPage = lazyImport(() => import('./pages/auth/ForgotPasswordPage'), 'ForgotPasswordPage');

const UserDashboard = lazyImport(() => import('./pages/user/UserDashboard'), 'UserDashboard');
const SellScrapPage = lazyImport(() => import('./pages/user/SellScrapPage'), 'SellScrapPage');
const BulkUploadPage = lazyImport(() => import('./pages/user/BulkUploadPage'), 'BulkUploadPage');
const AIAnalysisPage = lazyImport(() => import('./pages/user/AIAnalysisPage'), 'AIAnalysisPage');
const PickupSchedulePage = lazyImport(() => import('./pages/user/PickupSchedulePage'), 'PickupSchedulePage');
const CollectorMatchingPage = lazyImport(() => import('./pages/user/CollectorMatchingPage'), 'CollectorMatchingPage');
const LiveTrackingPage = lazyImport(() => import('./pages/user/LiveTrackingPage'), 'LiveTrackingPage');
const UserOrdersPage = lazyImport(() => import('./pages/user/UserOrdersPage'), 'UserOrdersPage');
const ScrapJourneyPage = lazyImport(() => import('./pages/user/ScrapJourneyPage'), 'ScrapJourneyPage');
const UserRewardsPage = lazyImport(() => import('./pages/user/UserRewardsPage'), 'UserRewardsPage');
const UserProfilePage = lazyImport(() => import('./pages/user/UserProfilePage'), 'UserProfilePage');

const MerchantDashboard = lazyImport(() => import('./pages/merchant/MerchantDashboard'), 'MerchantDashboard');
const MerchantRequestsPage = lazyImport(() => import('./pages/merchant/MerchantRequestsPage'), 'MerchantRequestsPage');
const MerchantNavigationPage = lazyImport(() => import('./pages/merchant/MerchantNavigationPage'), 'MerchantNavigationPage');
const MerchantHistoryPage = lazyImport(() => import('./pages/merchant/MerchantHistoryPage'), 'MerchantHistoryPage');

const AdminDashboard = lazyImport(() => import('./pages/admin/AdminDashboard'), 'AdminDashboard');
const AdminAnalyticsPage = lazyImport(() => import('./pages/admin/AdminAnalyticsPage'), 'AdminAnalyticsPage');
const AdminCollectorsPage = lazyImport(() => import('./pages/admin/AdminCollectorsPage'), 'AdminCollectorsPage');
const AdminRecyclersPage = lazyImport(() => import('./pages/admin/AdminRecyclersPage'), 'AdminRecyclersPage');

// --- Global Scroll Reset ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

// --- Premium Loading Fallback ---
const PageLoader = () => (
  <div className="h-[70vh] w-full flex items-center justify-center">
    <div className="relative flex items-center justify-center w-20 h-20">
      <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin" />
      <div className="absolute w-12 h-12 rounded-full bg-emerald-500/20 animate-pulse-ring" />
    </div>
  </div>
);

// --- Route Protection ---
const ProtectedRoute = ({ allowedRole }: { allowedRole?: string }) => {
  const { user } = useAuth();
  
  // For Hackathon Demo: Assume user is authenticated if a role is present. 
  // In production, verify actual JWT session.
  if (!user) return <Navigate to="/auth/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />;
  
  return <Outlet />;
};

// --- App Layout Shell ---
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const publicRoutes = ['/', '/rates', '/how-it-works', '/bulk', '/societies', '/epr', '/centers', '/about'];
  const isAuthPage = location.pathname.startsWith('/auth');
  const isPublic = publicRoutes.includes(location.pathname) || isAuthPage;
  
  const isMerchant = location.pathname.startsWith('/merchant');
  const isAdmin = location.pathname.startsWith('/admin');
  const showSidebar = !isPublic && (isMerchant || isAdmin);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 bg-radial-gradient-emerald">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <aside className="hidden lg:block w-64 border-r border-zinc-200/50 glass-panel flex-shrink-0 z-20">
            <Sidebar type={isAdmin ? 'ADMIN' : 'MERCHANT'} />
          </aside>
        )}

        <main className={`flex-1 ${isPublic ? 'pb-0' : 'pb-24 lg:pb-12'} overflow-y-auto w-full`}>
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </main>
      </div>

      {isPublic && !isAuthPage && <Footer />}
      <QuickDemoBar />
      {!isPublic && <BottomNav />}
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PickupProvider>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/rates" element={<RatesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/bulk" element={<BulkBusinessPage />} />
              <Route path="/societies" element={<SocietiesPage />} />
              <Route path="/epr" element={<EPRCompliancePage />} />
              <Route path="/centers" element={<CentersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

              {/* Citizen (User) Protected Routes */}
              <Route element={<ProtectedRoute allowedRole="USER" />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/sell" element={<SellScrapPage />} />
                <Route path="/user/bulk-upload" element={<BulkUploadPage />} />
                <Route path="/user/sell/analyze" element={<AIAnalysisPage />} />
                <Route path="/user/pickup" element={<PickupSchedulePage />} />
                <Route path="/user/pickup/matching" element={<CollectorMatchingPage />} />
                <Route path="/user/pickup/:id/tracking" element={<LiveTrackingPage />} />
                <Route path="/user/orders" element={<UserOrdersPage />} />
                <Route path="/user/orders/:id" element={<ScrapJourneyPage />} />
                <Route path="/user/rewards" element={<UserRewardsPage />} />
                <Route path="/user/profile" element={<UserProfilePage />} />
              </Route>

              {/* Collector (Merchant) Protected Routes */}
              <Route element={<ProtectedRoute allowedRole="MERCHANT" />}>
                <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
                <Route path="/merchant/requests" element={<MerchantRequestsPage />} />
                <Route path="/merchant/navigation" element={<MerchantNavigationPage />} />
                <Route path="/merchant/history" element={<MerchantHistoryPage />} />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
                <Route path="/admin/collectors" element={<AdminCollectorsPage />} />
                <Route path="/admin/recyclers" element={<AdminRecyclersPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </PickupProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;