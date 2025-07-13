import React, { useState, useEffect, useContext, useCallback } from "react";
import { axiosInstance } from "../config"; // Pastikan path ini benar
import { UserContext } from "../context/UserContext"; // Pastikan path ini benar
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BookCardSkeleton from "../components/UmmahBook/BookCardSkeleton"; // Gunakan skeleton yang sama

function AdminDashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]); // Menyimpan semua buku (terverifikasi & belum terverifikasi)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Mengambil semua materi tanpa filter status
      const response = await axiosInstance.get("/materi/getall");
      setAllBooks(response.data);
    } catch (err) {
      console.error("Error fetching all books:", err);
      setError("Gagal memuat daftar materi.");
      Swal.fire("Error", "Gagal memuat daftar materi.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect jika bukan admin
    if (user) {
      if (user?.role !== "admin") {
        Swal.fire("Akses Ditolak", "Anda tidak memiliki izin untuk mengakses halaman ini.", "error").then(() => {
          navigate("/"); // Redirect ke halaman utama
        });
        return;
      }
    }
    fetchAllBooks();
  }, [user, navigate, fetchAllBooks]);

  const handleApprove = async (bookId) => {
    Swal.fire({
      title: "Konfirmasi Verifikasi",
      text: "Apakah Anda yakin ingin memverifikasi materi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Verifikasi!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Memverifikasi...",
          text: "Mohon tunggu...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          await axiosInstance.put(`/materi/update/${bookId}`, {
            statusMateri: "terverifikasi",
          });
          Swal.fire("Berhasil!", "Materi berhasil diverifikasi.", "success");
          fetchAllBooks(); // Refresh daftar setelah verifikasi
        } catch (error) {
          console.error("Error approving book:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat memverifikasi materi.", "error");
        }
      }
    });
  };

  const handleUnverify = async (bookId) => {
    Swal.fire({
      title: "Batalkan Verifikasi",
      text: "Apakah Anda yakin ingin membatalkan verifikasi materi ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Batalkan!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Membatalkan Verifikasi...",
          text: "Mohon tunggu...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          await axiosInstance.put(`/materi/update/${bookId}`, {
            statusMateri: "belum terverifikasi",
          });
          Swal.fire("Berhasil!", "Verifikasi materi berhasil dibatalkan.", "success");
          fetchAllBooks(); // Refresh daftar setelah pembatalan verifikasi
        } catch (error) {
          console.error("Error unverifying book:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat membatalkan verifikasi materi.", "error");
        }
      }
    });
  };

  const handleDelete = async (bookId) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus materi ini? Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Menghapus...",
          text: "Mohon tunggu...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        try {
          await axiosInstance.delete(`/materi/delete/${bookId}`);
          Swal.fire("Berhasil!", "Materi berhasil dihapus.", "success");
          fetchAllBooks(); // Refresh daftar setelah penghapusan
        } catch (error) {
          console.error("Error deleting book:", error);
          Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus materi.", "error");
        }
      }
    });
  };

  // Filter buku berdasarkan status untuk tampilan yang lebih teratur
  const unverifiedBooks = allBooks.filter((book) => book.statusMateri === "belum terverifikasi");
  const verifiedBooks = allBooks.filter((book) => book.statusMateri === "terverifikasi");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Jika bukan admin, pesan sudah ditangani di useEffect dengan redirect
  if (!user || user.role !== "admin") {
    return null; // Atau tampilkan pesan loading/redirecting
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Admin</h1>

      {/* Bagian Materi Belum Terverifikasi */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Materi Belum Terverifikasi ({unverifiedBooks.length})</h2>
        {unverifiedBooks.length === 0 ? (
          <div className="text-center py-10 border border-gray-200 rounded-lg bg-white">
            <p className="text-gray-600 text-lg">Tidak ada materi yang menunggu verifikasi saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unverifiedBooks.map((book) => (
              <div key={book._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <img className="h-48 w-full object-cover" src={book.coverMateri || "https://placehold.co/200x280/cccccc/333333?text=No+Cover"} alt={book.judulMateri} />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.judulMateri}</h3>
                  <p className="text-sm text-gray-600 mb-2">Penulis: {book.penulis}</p>
                  <p className="text-sm text-gray-600 mb-2">Kategori: {book.kategori}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Status: <span className="font-bold text-red-500">{book.statusMateri}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-auto">Diunggah pada: {new Date(book.createdAt).toLocaleDateString()}</p>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => handleApprove(book._id)} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition">
                      Verifikasi
                    </button>
                    <button onClick={() => handleDelete(book._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bagian Materi Sudah Terverifikasi */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Materi Sudah Terverifikasi ({verifiedBooks.length})</h2>
        {verifiedBooks.length === 0 ? (
          <div className="text-center py-10 border border-gray-200 rounded-lg bg-white">
            <p className="text-gray-600 text-lg">Tidak ada materi yang sudah terverifikasi saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedBooks.map((book) => (
              <div key={book._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                <img className="h-48 w-full object-cover" src={book.coverMateri || "https://placehold.co/200x280/cccccc/333333?text=No+Cover"} alt={book.judulMateri} />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.judulMateri}</h3>
                  <p className="text-sm text-gray-600 mb-2">Penulis: {book.penulis}</p>
                  <p className="text-sm text-gray-600 mb-2">Kategori: {book.kategori}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Status: <span className="font-bold text-green-600">{book.statusMateri}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-auto">Diunggah pada: {new Date(book.createdAt).toLocaleDateString()}</p>
                  <div className="mt-4 flex gap-3">
                    <button onClick={() => handleUnverify(book._id)} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition">
                      Batalkan Verifikasi
                    </button>
                    <button onClick={() => handleDelete(book._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sm transition">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
