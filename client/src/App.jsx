import { React, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Beranda from "./pages/Beranda";
import Daftar from "./pages/Daftar";
import Masuk from "./pages/Masuk";
import LihatDonasi from "./pages/LihatDonasi";
import UploadDonasi from "./pages/UploadDonasi";
import Artikel from "./pages/Artikel";
import DetailArtikel from "./components/Artikel/DetailArtikel";
import ListDonasiLengkap from "./components/LihatDonasi/ListDonasiLengkap";
import DetailBarang from "./components/LihatDonasi/DetailBarang";
import DonasiSaya from "./pages/DonasiSaya";
import DetailDonasiSaya from "./components/DonasiSaya/DetailDonasiSaya";
import PermohonanSaya from "./pages/PermohonanSaya";
import ArtikelSaya from "./pages/ArtikelSaya";
import EdiProfil from "./pages/EditProfil";
import Navbar from "./components/Navbar/Navbar";
import Navbar2 from "./components/Navbar/Navbar2";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import ViewProfil from "./pages/ViewProfil";
import NotFound from "./pages/NotFound";
import UmmahBook from "./pages/UmmahBook";
import UmmahPartner from "./pages/UmmahPatner";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NavbarWrapper() {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    if (location.pathname === "/" || location.pathname === "/lihat-donasi") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setScrolling(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  if (location.pathname === "/" || location.pathname === "/lihat-donasi") {
    return scrolling ? <Navbar /> : <Navbar2 />;
  }

  return <Navbar />;
}

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <NavbarWrapper />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Beranda />} />
            <Route path="/daftar" element={<Daftar />} />
            <Route path="/masuk" element={<Masuk />} />
            <Route path="/ummah-book" element={<UmmahBook />} />
            <Route path="/ummah-patner" element={<UmmahPartner />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/upload-donasi" element={<UploadDonasi />} />

            {/* Protected untuk komunitas */}
            <Route
              path="/permohonan-saya"
              element={
                <ProtectedRoute allowedRoles={["komunitas"]}>
                  <PermohonanSaya />
                </ProtectedRoute>
              }
            />

            <Route
              path="/artikel-saya"
              element={
                <ProtectedRoute allowedRoles={["komunitas"]}>
                  <ArtikelSaya />
                </ProtectedRoute>
              }
            />

            {/* Protected untuk donatur */}

            <Route
              path="/donasi-saya"
              element={
                <ProtectedRoute allowedRoles={["donatur"]}>
                  <DonasiSaya />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donasi-saya/detail-donasi/:id"
              element={
                <ProtectedRoute allowedRoles={["donatur"]}>
                  <DetailDonasiSaya />
                </ProtectedRoute>
              }
            />

            {/* Rute lain tetap seperti semula */}
            <Route path="/lihat-donasi" element={<LihatDonasi />} />
            <Route path="/lihat-semua-donasi" element={<ListDonasiLengkap />} />
            <Route path="/lihat-donasi/donasi-kategori/detail-barang/:id" element={<DetailBarang />} />
            <Route path="/lihat-donasi/donasi-semua/detail-barang/:id" element={<DetailBarang />} />
            <Route path="/lihat-donasi/donasi-tersedia/detail-barang/:id" element={<DetailBarang />} />
            <Route path="/lihat-donasi/donasi-disalurkan/detail-barang/:id" element={<DetailBarang />} />
            <Route path="/artikel/detail-artikel/:id" element={<DetailArtikel />} />
            <Route path="/view-profil/:id" element={<ViewProfil />} />
            <Route path="/edit-profil" element={<EdiProfil />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
