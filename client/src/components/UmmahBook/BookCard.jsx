import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import shareIcon from "../../assets/CardDonasi/share.png";
import { UserContext } from "../../context/UserContext"; // Pastikan path ini benar
import { axiosInstance } from "../../config"; // Pastikan path ini benar
import Swal from "sweetalert2"; // Untuk notifikasi error saja

// Konfigurasi Swal.mixin untuk toast alert (untuk error/peringatan)
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

/**
 * Displays a single book card that links to a detail page.
 * @param {object} props
 * @param {object} props.book - The book object.
 * @param {function} props.onBookmarkToggle - Callback when bookmark status changes.
 */
function BookCard({ book, onBookmarkToggle }) {
  const { user } = useContext(UserContext);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Periksa apakah buku sudah disimpan oleh pengguna saat komponen dimuat
    if (user && book && book.disimpan && book.disimpan.includes(user._id)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [user, book]); // Bergantung pada user dan book

  const handleToggleBookmark = async (e) => {
    e.preventDefault(); // Mencegah navigasi ke halaman detail buku
    e.stopPropagation(); // Mencegah event menyebar ke Link
    try {
      const response = await axiosInstance.post(`/materi/toggle-simpan/${book._id}`, { userId: user._id });
      const newBookmarkStatus = response.data.disimpan.includes(user._id);
      setIsBookmarked(newBookmarkStatus); // Perbarui status bookmark berdasarkan respons API
      // Tidak ada Toast.fire untuk sukses, hanya perubahan ikon
      if (onBookmarkToggle) {
        onBookmarkToggle(book._id, newBookmarkStatus); // Panggil callback untuk memberitahu parent
      }
    } catch (error) {
      console.error("Gagal toggle simpan materi:", error);
      Toast.fire({
        icon: "error",
        title: "Terjadi kesalahan saat menyimpan materi.",
      });
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/book/${book._id}`; // URL halaman detail buku

    if (navigator.share) {
      // Web Share API
      navigator
        .share({
          title: book.judulMateri,
          text: `Lihat materi ini di UmmahBook: ${book.judulMateri} oleh ${book.penulis}`,
          url: shareUrl,
        })
        .then(() => console.log("Berhasil berbagi"))
        .catch((error) => console.error("Gagal berbagi:", error));
    } else {
      // Fallback: Salin ke clipboard
      document.execCommand("copy"); // Menggunakan execCommand karena navigator.clipboard.writeText mungkin tidak berfungsi di iframe
      const el = document.createElement("textarea");
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      Toast.fire({
        icon: "success",
        title: "Link buku telah disalin ke clipboard.",
      });
    }
  };

  return (
    <Link to={`/book/${book._id}`} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col no-underline">
      <div className="flex-shrink-0">
        <img className="h-72 w-full object-cover" src={book.coverMateri || "https://placehold.co/200x280/cccccc/333333?text=No+Cover"} alt={book.judulMateri} />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center gap-2 mb-2">
          <div className="flex gap-2">
            <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{book.linkMateri?.endsWith(".pdf") ? "PDF" : "File"}</span>
            <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">{book.kategori || "Umum"}</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center cursor-pointer" onClick={handleToggleBookmark}>
              {isBookmarked ? <BsBookmarkFill className="text-primary w-5 h-5" /> : <BsBookmark className="text-gray-400 w-5 h-5" />}
            </div>
            <img src={shareIcon} alt="Share" className="w-5 h-5 cursor-pointer" onClick={handleShare} />
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-800 flex-grow">{`${book.judulMateri} oleh ${book.penulis}`}</p>
      </div>
    </Link>
  );
}

export default BookCard;
