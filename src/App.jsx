import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Spaces from "./pages/Spaces";
import SpaceDetails from "./pages/SpaceDetails";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import Offres from "./pages/Offres";
import EventDetails from "./pages/EventDetails";
import ComingSoon from "./pages/ComingSoon";
import BackButton from "./components/BackButton";

function App() {
  return (
    <BrowserRouter>
      <BackButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:id" element={<SpaceDetails />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/partenaires" element={<ComingSoon type="partenaires" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
