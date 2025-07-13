import { useState, useEffect } from "react";

import BookCard from "../components/UmmahBook/BookCard";
import UploadBookForm from "../components/UmmahBook/UploadBookForm";
import BookCardSkeleton from "../components/UmmahBook/BookCardSkeleton";

const Pagination = ({ totalPages, paginate, currentPage }) => {
  if (totalPages <= 1) return null;
  const maxPageButtons = 5;
  const pageNumbers = [];

  for (let i = 1; i <= Math.min(maxPageButtons, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="inline-flex items-center rounded-md shadow mt-8"
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "0.375rem",
        overflow: "hidden",
      }}
    >
      <a
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) paginate(currentPage - 1);
        }}
        href="#"
        className={`px-3 py-2 text-sm font-bold border-r border-gray-300 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-800 hover:bg-gray-50"
        }`}
      >
        &lt;
      </a>

      {pageNumbers.map((number) => (
        <a
          key={number}
          onClick={(e) => {
            e.preventDefault();
            paginate(number);
          }}
          href="#"
          className={`px-4 py-2 text-sm font-bold border-r border-gray-300 ${
            currentPage === number
              ? "bg-orange-500 text-white z-10"
              : "bg-white text-gray-800 hover:bg-gray-50"
          }`}
        >
          {number}
        </a>
      ))}

      {totalPages > maxPageButtons && (
        <>
          <span className="px-4 py-2 text-sm font-bold border-r border-gray-300 bg-white text-gray-800">
            ...
          </span>
          <a
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) paginate(currentPage + 1);
            }}
            href="#"
            className={`px-3 py-2 text-sm font-bold ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-50"
            }`}
          >
            &rarr;
          </a>
        </>
      )}

      {totalPages <= maxPageButtons && currentPage < totalPages && (
        <a
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) paginate(currentPage + 1);
          }}
          href="#"
          className={`px-3 py-2 text-sm font-bold ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-800 hover:bg-gray-50"
          }`}
        >
          &rarr;
        </a>
      )}
    </nav>
  );
};

function UmmahBook() {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  const mockBooks = [
    {
      _id: 1,
      title: "Pendidikan Agama Islam dan Budi Pekerti",
      grade: "Kelas II",
      imageUrl:
        "https://via.placeholder.com/200x280/81C784/FFFFFF?text=Buku+PAI",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 2,
      title: "Pendidikan Agama Islam dan Budi Pekerti",
      grade: "Kelas VII",
      imageUrl:
        "https://via.placeholder.com/200x280/4DB6AC/FFFFFF?text=Buku+PAI",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 3,
      title: "Pendidikan Agama Islam dan Budi Pekerti",
      grade: "Kelas VIII",
      imageUrl:
        "https://via.placeholder.com/200x280/26A69A/FFFFFF?text=Buku+PAI",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 4,
      title: "Sejarah Kebudayaan Islam",
      grade: "Kelas X",
      imageUrl:
        "https://via.placeholder.com/200x280/00897B/FFFFFF?text=Buku+SKI",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 5,
      title: "Panduan Manasik Haji",
      grade: "Lengkap",
      imageUrl:
        "https://via.placeholder.com/200x280/00695C/FFFFFF?text=Buku+Umum",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 6,
      title: "Matematika",
      grade: "Kelas IV",
      imageUrl:
        "https://via.placeholder.com/200x280/FF7043/FFFFFF?text=Buku+MTK",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 7,
      title: "Bahasa Indonesia",
      grade: "Kelas V",
      imageUrl:
        "https://via.placeholder.com/200x280/FF5722/FFFFFF?text=Buku+Indo",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 8,
      title: "Ilmu Pengetahuan Alam",
      grade: "Kelas VI",
      imageUrl:
        "https://via.placeholder.com/200x280/76FF03/000000?text=Buku+IPA",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 9,
      title: "Ilmu Pengetahuan Sosial",
      grade: "Kelas IX",
      imageUrl:
        "https://via.placeholder.com/200x280/FFC107/000000?text=Buku+IPS",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 10,
      title: "Bahasa Inggris",
      grade: "Kelas VII",
      imageUrl:
        "https://via.placeholder.com/200x280/29B6F6/FFFFFF?text=Buku+Eng",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 11,
      title: "Fisika",
      grade: "Kelas XI",
      imageUrl:
        "https://via.placeholder.com/200x280/42A5F5/FFFFFF?text=Buku+Fisika",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 12,
      title: "Kimia",
      grade: "Kelas XII",
      imageUrl:
        "https://via.placeholder.com/200x280/1E88E5/FFFFFF?text=Buku+Kimia",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 13,
      title: "Biologi",
      grade: "Kelas X",
      imageUrl:
        "https://via.placeholder.com/200x280/66BB6A/FFFFFF?text=Buku+Bio",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 14,
      title: "Kamus Besar Bahasa Indonesia",
      grade: "Edisi V",
      imageUrl: "https://via.placeholder.com/200x280/757575/FFFFFF?text=KBBI",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 15,
      title: "Akidah Akhlak",
      grade: "Kelas III",
      imageUrl:
        "https://via.placeholder.com/200x280/A1887F/FFFFFF?text=Buku+Akidah",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 16,
      title: "Fiqih",
      grade: "Kelas VIII",
      imageUrl:
        "https://via.placeholder.com/200x280/8D6E63/FFFFFF?text=Buku+Fiqih",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 17,
      title: "Ekonomi",
      grade: "Kelas XI",
      imageUrl:
        "https://via.placeholder.com/200x280/9CCC65/000000?text=Buku+Ekonomi",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 18,
      title: "Kumpulan Doa Sehari-hari",
      grade: "Lengkap",
      imageUrl:
        "https://via.placeholder.com/200x280/5C6BC0/FFFFFF?text=Buku+Doa",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 19,
      title: "Tematik Terpadu",
      grade: "Kelas I",
      imageUrl:
        "https://via.placeholder.com/200x280/FFEE58/000000?text=Tematik",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 20,
      title: "Sosiologi",
      grade: "Kelas XII",
      imageUrl:
        "https://via.placeholder.com/200x280/AB47BC/FFFFFF?text=Buku+Sosiologi",
      fileType: "PDF",
      category: "SMA/MA",
    },

    // New entries 21–50
    {
      _id: 21,
      title: "Geografi",
      grade: "Kelas X",
      imageUrl:
        "https://via.placeholder.com/200x280/7E57C2/FFFFFF?text=Buku+Geo",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 22,
      title: "Pendidikan Kewarganegaraan",
      grade: "Kelas XI",
      imageUrl:
        "https://via.placeholder.com/200x280/5E35B1/FFFFFF?text=Buku+PKN",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 23,
      title: "Teknologi Informasi",
      grade: "Kelas XII",
      imageUrl:
        "https://via.placeholder.com/200x280/3949AB/FFFFFF?text=Buku+TIK",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 24,
      title: "Prakarya",
      grade: "Kelas VII",
      imageUrl:
        "https://via.placeholder.com/200x280/1E88E5/FFFFFF?text=Buku+Prakarya",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 25,
      title: "Seni Budaya",
      grade: "Kelas VIII",
      imageUrl:
        "https://via.placeholder.com/200x280/00ACC1/FFFFFF?text=Buku+Seni",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 26,
      title: "Bahasa Arab",
      grade: "Kelas IX",
      imageUrl:
        "https://via.placeholder.com/200x280/00838F/FFFFFF?text=Buku+Arab",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 27,
      title: "Matematika",
      grade: "Kelas VII",
      imageUrl:
        "https://via.placeholder.com/200x280/D84315/FFFFFF?text=Buku+MTK",
      fileType: "PDF",
      category: "SMP/MTS",
    },
    {
      _id: 28,
      title: "Bahasa Inggris",
      grade: "Kelas XI",
      imageUrl:
        "https://via.placeholder.com/200x280/039BE5/FFFFFF?text=Buku+Eng",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 29,
      title: "Biologi",
      grade: "Kelas XII",
      imageUrl:
        "https://via.placeholder.com/200x280/43A047/FFFFFF?text=Buku+Bio",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 30,
      title: "Pendidikan Jasmani",
      grade: "Kelas VI",
      imageUrl:
        "https://via.placeholder.com/200x280/FFCA28/000000?text=Buku+PJOK",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 31,
      title: "Tematik Terpadu",
      grade: "Kelas II",
      imageUrl:
        "https://via.placeholder.com/200x280/FDD835/000000?text=Tematik",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 32,
      title: "Bahasa Daerah",
      grade: "Kelas IV",
      imageUrl:
        "https://via.placeholder.com/200x280/EF6C00/FFFFFF?text=Bhs+Daerah",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 33,
      title: "Teknik Otomotif",
      grade: "SMK",
      imageUrl:
        "https://via.placeholder.com/200x280/6D4C41/FFFFFF?text=SMK+Oto",
      fileType: "PDF",
      category: "SMK",
    },
    {
      _id: 34,
      title: "Teknik Komputer dan Jaringan",
      grade: "SMK",
      imageUrl: "https://via.placeholder.com/200x280/455A64/FFFFFF?text=TKJ",
      fileType: "PDF",
      category: "SMK",
    },
    {
      _id: 35,
      title: "Akuntansi Dasar",
      grade: "SMK",
      imageUrl:
        "https://via.placeholder.com/200x280/607D8B/FFFFFF?text=Akuntansi",
      fileType: "PDF",
      category: "SMK",
    },
    {
      _id: 36,
      title: "Bahasa Mandarin",
      grade: "Lengkap",
      imageUrl:
        "https://via.placeholder.com/200x280/C2185B/FFFFFF?text=Mandarin",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 37,
      title: "Buku Parenting Islami",
      grade: "Lengkap",
      imageUrl:
        "https://via.placeholder.com/200x280/D81B60/FFFFFF?text=Parenting",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 38,
      title: "Sejarah Indonesia",
      grade: "Kelas XI",
      imageUrl:
        "https://via.placeholder.com/200x280/AD1457/FFFFFF?text=Sejarah+Indo",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 39,
      title: "Keterampilan Hidup",
      grade: "Kelas V",
      imageUrl:
        "https://via.placeholder.com/200x280/6A1B9A/FFFFFF?text=Life+Skills",
      fileType: "PDF",
      category: "SD/MI",
    },
    {
      _id: 40,
      title: "Etika Profesi",
      grade: "SMK",
      imageUrl: "https://via.placeholder.com/200x280/4A148C/FFFFFF?text=Etika",
      fileType: "PDF",
      category: "SMK",
    },
    {
      _id: 41,
      title: "Logika Matematika",
      grade: "Kelas X",
      imageUrl:
        "https://via.placeholder.com/200x280/880E4F/FFFFFF?text=Logika+MTK",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 42,
      title: "Agribisnis",
      grade: "SMK",
      imageUrl:
        "https://via.placeholder.com/200x280/33691E/FFFFFF?text=Agribisnis",
      fileType: "PDF",
      category: "SMK",
    },
    {
      _id: 43,
      title: "Kesehatan Reproduksi Remaja",
      grade: "Lengkap",
      imageUrl: "https://via.placeholder.com/200x280/00C853/FFFFFF?text=KRR",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 44,
      title: "Sastra Indonesia",
      grade: "Kelas XII",
      imageUrl: "https://via.placeholder.com/200x280/01579B/FFFFFF?text=Sastra",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 45,
      title: "Kalkulus Dasar",
      grade: "Perguruan Tinggi",
      imageUrl:
        "https://via.placeholder.com/200x280/0277BD/FFFFFF?text=Kalkulus",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 46,
      title: "Psikologi Remaja",
      grade: "Lengkap",
      imageUrl:
        "https://via.placeholder.com/200x280/00695C/FFFFFF?text=Psikologi",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 47,
      title: "Etika Lingkungan",
      grade: "SMA",
      imageUrl:
        "https://via.placeholder.com/200x280/004D40/FFFFFF?text=Lingkungan",
      fileType: "PDF",
      category: "SMA/MA",
    },
    {
      _id: 48,
      title: "Bahasa Korea Dasar",
      grade: "Lengkap",
      imageUrl: "https://via.placeholder.com/200x280/880E4F/FFFFFF?text=Korea",
      fileType: "PDF",
      category: "Umum",
    },
    {
      _id: 49,
      title: "Keterampilan Wirausaha",
      grade: "SMK",
      imageUrl:
        "https://via.placeholder.com/200x280/BF360C/FFFFFF?text=Wirausaha",
      fileType: "PDF",
      category: "SMK",
    },
    {
      _id: 50,
      title: "Pemrograman Dasar",
      grade: "SMK",
      imageUrl: "https://via.placeholder.com/200x280/263238/FFFFFF?text=Coding",
      fileType: "PDF",
      category: "SMK",
    },
  ];

  useEffect(() => {
    setLoading(true);
    let filtered = mockBooks;
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setTotalPages(Math.ceil(filtered.length / booksPerPage));
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    setBooks(filtered.slice(indexOfFirstBook, indexOfLastBook));
    setLoading(false);
  }, [currentPage, searchTerm, selectedCategory]);

  const handleUpload = async (formData) => {
    console.log("Form data submitted (mock):", Object.fromEntries(formData));
    alert("Simulated book upload successful!");
  };

  /*
  // --- API LOGIC (Commented Out) ---
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: booksPerPage,
        });
        if (searchTerm) params.append('search', searchTerm);
        if (selectedCategory !== 'Semua') params.append('category', selectedCategory);

        // IMPORTANT: Replace '/api/books' with your actual backend endpoint.
        const response = await axios.get(`/api/books?${params.toString()}`);
        
        // EXPECTED API RESPONSE: { books: [], totalPages: 10, currentPage: 1 }
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);

      } catch (error) {
        console.error("Failed to fetch books:", error);
        setBooks([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchTerm, selectedCategory]);

  const handleUpload = async (formData) => {
    try {
      // IMPORTANT: Replace '/api/books/upload' with your actual upload endpoint.
      await axios.post('/api/books/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Book uploaded successfully!');
      setCurrentPage(1);
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Failed to upload book.');
    }
  };
  */

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {/* <Navbar /> */}
      <main className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center w-full md:w-auto"
            >
              <input
                type="text"
                placeholder="Cari Buku"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-r-md hover:bg-orange-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>Semua</option>
              <option>SD/MI</option>
              <option>SMP/MTS</option>
              <option>SMA/MA</option>
              <option>Umum</option>
            </select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Buku yang Tersedia
              </h1>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(booksPerPage)
                    .fill(0)
                    .map((_, index) => (
                      <BookCardSkeleton key={index} />
                    ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                      <BookCard key={book._id} book={book} />
                    ))}
                  </div>
                  {books.length === 0 && (
                    <div className="text-center py-10 col-span-full">
                      <p className="text-gray-600 text-lg">
                        Tidak ada buku yang ditemukan.
                      </p>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
            <aside>
              <UploadBookForm onUpload={handleUpload} />
            </aside>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default UmmahBook;
