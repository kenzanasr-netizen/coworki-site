import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import SpaceDetails from "./pages/SpaceDetails";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import Offres from "./pages/Offres";
import EventDetails from "./pages/EventDetails";
import BackButton from "./components/BackButton";
import ScrollToTop from "./components/ScrollToTop";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import UserDashboard from "./pages/UserDashboard";
import Business from "./pages/Business";
import BusinessRequest from "./pages/BusinessRequest";
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerSpaceForm from "./pages/PartnerSpaceForm";
import AdminDashboard from "./pages/AdminDashboard";
import SmartMatching from "./pages/SmartMatching";
import EcoVisibility from "./pages/EcoVisibility";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import PartnerLanding from "./pages/PartnerLanding";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateSectionPage from "./pages/PrivateSectionPage";
import About from "./pages/About";
import DemoJury from "./pages/DemoJury";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import BusinessDashboard from "./pages/BusinessDashboard";
import LegalPage from "./pages/LegalPage";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <BackButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:id" element={<SpaceDetails />} />
        <Route path="/space-details/:id" element={<SpaceDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-confirmation" element={<Payment />} />
        <Route path="/profile" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/business" element={<Business />} />
        <Route path="/b2b" element={<Business />} />
        <Route path="/business/request" element={<BusinessRequest />} />
        <Route path="/company/dashboard" element={<ProtectedRoute role="business"><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/business" element={<ProtectedRoute role="business"><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/partner/dashboard" element={<ProtectedRoute role="partner"><PartnerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/partner" element={<ProtectedRoute role="partner"><PartnerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/partner/spaces/new" element={<ProtectedRoute role="partner"><PartnerSpaceForm /></ProtectedRoute>} />
        <Route path="/dashboard/partner/:section" element={<ProtectedRoute role="partner"><PrivateSectionPage area="partner" /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/:section" element={<ProtectedRoute role="admin"><PrivateSectionPage area="admin" /></ProtectedRoute>} />
        <Route path="/smart-matching" element={<ProtectedRoute role="user"><SmartMatching /></ProtectedRoute>} />
        <Route path="/eco-visibility" element={<EcoVisibility />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/partner-pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/demo" element={<DemoJury />} />
        <Route path="/legal/terms" element={<LegalPage type="terms" />} />
        <Route path="/legal/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/legal/mentions" element={<LegalPage type="mentions" />} />
        <Route path="/legal/cancellation" element={<LegalPage type="cancellation" />} />
        <Route path="/partenaires" element={<PartnerLanding />} />
        <Route path="/partners" element={<PartnerLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
