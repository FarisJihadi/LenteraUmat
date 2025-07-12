import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config";
import FormDaftarDonatur from "../components/Daftar/FormDaftarDonatur";
import FormDaftarKomunitas from "../components/Daftar/FormDaftarKomunitas";
import Swal from "sweetalert2";

export default function Daftar() {
  const [role, setRole] = useState("donatur");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    namaLengkap: "",
    pernyataanUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
  }, [role]);

  const handleDaftar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        namaLengkap: formData.namaLengkap,
        pernyataanUrl: formData.pernyataanUrl,
      };

      await axiosInstance.post("/auth/register", payload);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Artikel berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
      setLoading(false);
      navigate("/masuk");
    } catch (err) {
      console.error("Daftar gagal", err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="daftar-container mx-auto max-w-[500px] md:mt-8 mt-10 mb-16 px-8  ">
        <HeaderDaftar role={role} />

        <RoleSelector role={role} setRole={setRole} />

        {role === "donatur" ? (
          <FormDaftarDonatur formData={formData} setFormData={setFormData} handleDaftar={handleDaftar} loading={loading} />
        ) : (
          <FormDaftarKomunitas formData={formData} setFormData={setFormData} handleDaftar={handleDaftar} loading={loading} />
        )}

        <div className="flex justify-center mt-5">
          <p>
            Sudah punya akun?
            <Link to="/masuk" className="underline font-bold text-primary">
              {" "}
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function HeaderDaftar({ role }) {
  return (
    <div className="mb-8">
      <p className="md:text-heading-[36px] sm:text-3xl text-[28px] font-extrabold mb-2 mt-5">
        {role === "donatur" ? "Yuk" : "Ayo"} <span className="text-primary">{role === "donatur" ? "Daftar!" : "Bergabung!"}</span>
      </p>
      {role === "donatur" ? (
        <p className="md:text-normal text-sm">
          Donasikan Barang Bekas Layak Pakai <br /> atau Barumu
        </p>
      ) : (
        <p className="md:text-normal text-sm">
          Mari Kita Salurkan Barang Bekas <br /> Layak Pakai / Baru
        </p>
      )}
    </div>
  );
}

function RoleSelector({ role, setRole }) {
  return (
    <>
      <p className="mb-5 text-body-lg">Pilih daftar sebagai</p>
      <div className="flex gap-4 mb-6 w-full max-w-md justify-center text-body-lg">
        <button className={`pb-2 md:text-normal text-[15px] font-medium border-0 rounded-none bg-white ${role === "donatur" ? "border-primary border-b-2" : ""} focus:outline-none`} onClick={() => setRole("donatur")}>
          Donatur
        </button>
        <button className={`pb-2 md:text-normal text-[15px] font-medium border-0 rounded-none bg-white ${role === "komunitas" ? "border-primary border-b-2" : ""} focus:outline-none`} onClick={() => setRole("komunitas")}>
          Komunitas
        </button>
      </div>
    </>
  );
}
