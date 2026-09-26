import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Header } from "./HeaderBar.jsx";
import { Footer } from "./Footer.jsx";
import { IndexPage } from "./IndexPage.jsx";
import { ArtistsPage } from "./ArtistsPage.jsx";
import { ArtistDetail } from "./ArtistDetail.jsx";
import { CommercialsPage } from "./CommercialsPage.jsx";
import { CommercialDetail } from "./CommercialDetail.jsx";

import BingoPage from "./BingoPage.jsx";
import BingoSettingsPage from "./BingoSettingsPage.jsx";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:id" element={<ArtistDetail />} />
        <Route path="/commercials" element={<CommercialsPage />} />
        <Route path="/commercials/:id" element={<CommercialDetail />} />
        <Route path="/bingo" element={<BingoPage />} />
        <Route path="/bingo-settings" element={<BingoSettingsPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;