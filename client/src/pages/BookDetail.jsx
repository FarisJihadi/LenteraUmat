import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// --- MOCK DATA for a single book (for testing) ---
// In a real app, this data would come from your API call.
const mockBookDetail = {
  _id: '1',
  title: 'Pendidikan Agama Islam dan Budi Pekerti',
  grade: 'Kelas II',
  imageUrl: 'https://via.placeholder.com/200x280/81C784/FFFFFF?text=Buku+PAI',
  pdfUrl: '#', // Replace with actual PDF link
  onlineReadUrl: '#', // Replace with link to online reader if you have one
  publisher: 'Pusat Kurikulum dan Perbukuan, Balitbang, Kemendikbud',
  isbn: '978-602-282-184-7',
  edition: '2017',
  authors: ['Achmad Hasim', 'M. Kholid Fathoni'],
};
// --- END MOCK DATA ---


function BookDetail() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Gets the book ID from the URL, e.g., "/book/1"

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        // --- API LOGIC (Commented out by default) ---
        // Uncomment this to use your real API
        /*
        const response = await axios.get(`/api/books/${id}`); // Replace with your actual endpoint
        setBook(response.data);
        */

        // --- MOCK DATA LOGIC (Active by default) ---
        // This simulates an API call and finds the book from mock data
        console.log(`Fetching details for book ID: ${id}`);
        setBook(mockBookDetail);


      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // Re-run this effect if the ID in the URL changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p> {/* You can replace this with a more advanced spinner */}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Buku Tidak Ditemukan</h2>
        <Link to="/ummah-book" className="text-teal-600 hover:underline mt-4 inline-block">
          Kembali ke Daftar Buku
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <Link to="/ummah-book" className="hover:underline">Ummah Book</Link>
          <span className="mx-2">&gt;</span>
          <span>{book.title}</span>
        </div>

        {/* Main Detail Card */}
        <div className="bg-[#E6F6F6] rounded-2xl p-5 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="md:col-span-1">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {`${book.title} untuk ${book.grade}`}
              </h1>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-4 mb-8">
                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Unduh PDF
                </a>
                <a href={book.onlineReadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white text-teal-600 border border-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Baca Online
                </a>
              </div>

              {/* Detail Section */}
              <h2 className="text-lg font-bold text-gray-700 border-b pb-2 mb-4">DETAIL BUKU</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-500">Penerbit</h3>
                  <p className="text-gray-800 mt-1">{book.publisher}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">ISBN</h3>
                  <p className="text-gray-800 mt-1">{book.isbn}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Edisi</h3>
                  <p className="text-gray-800 mt-1">{book.edition}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Penulis</h3>
                  <p className="text-gray-800 mt-1">{book.authors.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetail;