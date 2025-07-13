import React, { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../config";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import { FaBookmark, FaRegBookmark, FaSearch, FaFilter } from "react-icons/fa";
import FormUploadMateri from "../components/UploadBook/FormUpload"; // Pastikan path ini sesuai dengan struktur proyek Anda

export default function UmmahBook() {
  const { user } = useContext(UserContext);
  const [materis, setMateris] = useState([]);
  const [filteredMateris, setFilteredMateris] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchMateris = async () => {
    setIsLoading(true);
    try {
      const params = {
        judul: searchQuery,
        kategori: filterCategory,
      };
      const res = await axiosInstance.get("/materi/getall", { params });
      setMateris(res.data);
      setFilteredMateris(res.data);
    } catch (err) {
      console.error("Gagal memuat materi:", err);
      Swal.fire("Error", "Gagal memuat materi. Silakan coba lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMateris();
  }, [searchQuery, filterCategory]);

  const handleSaveToggle = async (materiId) => {
    if (!user) {
      Swal.fire("Peringatan", "Anda harus login untuk menyimpan materi.", "warning");
      return;
    }

    try {
      await axiosInstance.post(`/materi/toggle-simpan/${materiId}`, { userId: user._id });
      setMateris((prevMateris) =>
        prevMateris.map((materi) => {
          if (materi._id === materiId) {
            const isSaved = materi.disimpan.includes(user._id);
            return {
              ...materi,
              disimpan: isSaved ? materi.disimpan.filter((id) => id !== user._id) : [...materi.disimpan, user._id],
            };
          }
          return materi;
        })
      );
    } catch (error) {
      console.error("Gagal menyimpan materi:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan materi.", "error");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Memuat materi...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">UmmahBook</h1>

      <FormUploadMateri onUploadSuccess={fetchMateris} />
      {/* Kontrol Pencarian & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div className="relative flex-grow w-full sm:w-auto">
          <input type="text" placeholder="Cari materi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-full" />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="relative w-full sm:w-auto">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full px-4 py-2 border rounded-full appearance-none">
            <option value="all">Semua Kategori</option>
            <option value="Tafsir">Tafsir</option>
            <option value="Aqidah">Aqidah</option>
            <option value="Fiqh">Fiqh</option>
            <option value="Sirah Nabawiyah">Sirah Nabawiyah</option>
            <option value="Kewirausahaan">Kewirausahaan</option>
          </select>
          <FaFilter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Tampilan Daftar Materi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {materis.length > 0 ? (
          materis.map((materi) => (
            <div key={materi._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between transform transition duration-300 hover:scale-105">
              <a href={materi.linkMateri} target="_blank" rel="noopener noreferrer">
                {/* Menggunakan tag img untuk coverMateri */}
                <img
                  src={materi.coverMateri || "https://placehold.co/200x280/e0e0e0/555555?text=No+Cover"} // Fallback jika coverMateri kosong
                  alt={materi.judulMateri}
                  className="w-full h-40 object-cover" // Sesuaikan ukuran dan object-fit
                />
                <div className="p-4">
                  <h4 className="font-semibold text-lg truncate">{materi.judulMateri}</h4>
                  <p className="text-sm text-gray-600 mb-2 truncate">{materi.deskripsi}</p>
                  <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">{materi.kategori}</span>
                </div>
              </a>
              <div className="p-4 pt-0 flex justify-end">
                <button onClick={() => handleSaveToggle(materi._id)} className="text-2xl text-gray-500 hover:text-blue-500" title={materi.disimpan.includes(user?._id) ? "Hapus dari Simpanan" : "Simpan"}>
                  {materi.disimpan.includes(user?._id) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Materi tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
