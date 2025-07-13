import { useState } from 'react';

// A helper component for the file inputs to show the selected file's name
const FilePreview = ({ file, onClear }) => (
  <div className="mt-2 text-sm text-center">
    <p className="font-semibold truncate">{file.name}</p>
    <button type="button" onClick={onClear} className="text-red-500 hover:text-red-700 text-xs">
      Remove
    </button>
  </div>
);

function UploadBookForm({ onUpload }) {
  // Updated state to match the new form fields
  const [judul, setJudul] = useState('');
  const [sampul, setSampul] = useState(null);
  const [filePdf, setFilePdf] = useState(null);
  const [penerbit, setPenerbit] = useState('');
  const [isbn, setIsbn] = useState('');
  const [edisi, setEdisi] = useState('');
  const [penulis, setPenulis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', judul);
    formData.append('coverImage', sampul);
    formData.append('pdfFile', filePdf);
    formData.append('publisher', penerbit);
    formData.append('isbn', isbn);
    formData.append('edition', edisi);
    formData.append('author', penulis);

    onUpload(formData);
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm w-full">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Upload Buku
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Judul Buku */}
        <div>
          <label htmlFor="judul-buku" className="block text-sm font-medium text-gray-700 mb-1">Judul Buku</label>
          <input type="text" id="judul-buku" value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Ketikkan Judul Buku" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" required />
        </div>

        {/* Upload Sampul */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Sampul Buku</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="sampul-buku" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                  <span>Upload a file</span>
                  <input id="sampul-buku" name="sampul-buku" type="file" className="sr-only" onChange={(e) => setSampul(e.target.files[0])} accept="image/jpeg, image/png, application/pdf" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">JPEG, JPG, PNG, PDF (5MB, Maksimal [n] Gambar/File)</p>
            </div>
          </div>
          {sampul && <FilePreview file={sampul} onClear={() => setSampul(null)} />}
        </div>
        
        {/* Upload PDF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload File PDF</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
               <div className="flex text-sm text-gray-600 justify-center">
                 <p>Upload a file or drag and drop</p>
               </div>
               <label htmlFor="file-pdf" className="relative cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded-md font-medium text-gray-700 text-sm">
                  <span>Choose File</span>
                  <input id="file-pdf" name="file-pdf" type="file" className="sr-only" onChange={(e) => setFilePdf(e.target.files[0])} accept=".pdf" />
                </label>
            </div>
          </div>
          {filePdf && <FilePreview file={filePdf} onClear={() => setFilePdf(null)} />}
        </div>

        {/* Other Fields */}
        <div>
          <label htmlFor="penerbit" className="block text-sm font-medium text-gray-700 mb-1">Penerbit</label>
          <input type="text" id="penerbit" value={penerbit} onChange={(e) => setPenerbit(e.target.value)} placeholder="Ketikkan Penerbit" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">Judul ISBN</label>
          <input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="Ketikkan Judul ISBN" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="edisi" className="block text-sm font-medium text-gray-700 mb-1">Edisi</label>
          <input type="text" id="edisi" value={edisi} onChange={(e) => setEdisi(e.target.value)} placeholder="Ketikkan Edisi Buku" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="penulis" className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
          <input type="text" id="penulis" value={penulis} onChange={(e) => setPenulis(e.target.value)} placeholder="Ketikkan Penulis Buku" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" required />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button type="submit" className="inline-flex items-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Kirim
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
            </svg>
          </button>
        </div>
        
      </form>
    </div>
  );
}

export default UploadBookForm;