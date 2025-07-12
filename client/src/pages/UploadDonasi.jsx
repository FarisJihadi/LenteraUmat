import FormUpload from "../components/UploadDonasi/FormUpload";

export default function UploadDonasi() {
  return (
    <>
      <PanduanUpload />
      <FormUpload />
    </>
  );
}

function PanduanUpload() {
  return (
    <div className="md:flex md:flex-col -gap-8 lg:max-w-4xl md:text-3xl text-[28px] mx-auto  md:px-[59px]  p-8">
      <h2 className="text-4xl font-bold mb-32">Panduan Upload Donasi:</h2>

      {/* Langkah 1 */}
      <div className="flex items-start md:self-end md:w-[400px] -mt-20 space-x-6 mb-24">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-primary z-10" />
          <div className="w-px h-40 bg-gray-300" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-4">Langkah 1</h3>
          <div className="border rounded-lg shadow-sm p-6 md:w-md">
            <div className="mb-4 md:text-lg text-base  font-semibold text-gray-700">Isi Informasi Donasi</div>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600">
              <li>Tulis nama barang yang didonasikan.</li>
              <li>Pilih kategori barang.</li>
              <li>Spesifikasikan jenis barang.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Langkah 2 */}
      <div className="flex items-start md:gap-4 md:self-start max-w-[400px] -mt-20 md:flex-row-reverse space-x-6 mb-24">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-primary z-10" />
          <div className="w-px h-40 bg-gray-300" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold md:text-right text-primary mb-4">Langkah 2</h3>
          <div className="border rounded-lg shadow-sm p-6 max-w-md">
            <div className="mb-2 md:text-lg text-base font-semibold text-gray-700">Unggah Foto & Deskripsi</div>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600">
              <li>Lampirkan foto barang (pastikan jelas, format JPG/PNG, maks. 5MB).</li>
              <li>Jelaskan kondisi dan detail barang.</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Langkah 3 */}
      <div className="flex items-start md:self-end max-w-[400px] -mt-20 space-x-6 mb-24">
        <div className="flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-primary z-10" />
          <div className="w-px h-40 bg-gray-300" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-primary mb-2">Langkah 3</h3>
          <div className="border rounded-lg shadow-sm p-6 max-w-md">
            <div className="mb-2 md:text-lg text-base font-semibold text-gray-700">Alamat & Submit</div>
            <ul className="list-disc list-inside text-sm md-text-base text-gray-600">
              <li>Cantumkan alamat barang yang didonasikan.</li>
              <li>Klik tombol 'Kirim' dan tunggu konfirmasi.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
