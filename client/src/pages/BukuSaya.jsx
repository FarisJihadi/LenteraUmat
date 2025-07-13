import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config"; 
import { UserContext } from "../context/UserContext";

import { CardSkleton } from "../components/LihatDonasi/CardSkleton"; 
import BookCard from "../components/UmmahBook/BookCard"; 

import donaturSampul from "../assets/DonasiSaya/donaturSampul.png";
import komunitasSampul from "../assets/DonasiSaya/komunitasSampul.png";
import editProfilButton from "../assets/PermohonanSaya/editProfilButton.png";
import personProfile from "../assets/Navbar/personProfile.png";


export default function BukuSaya() {
    const [myBooks, setMyBooks] = useState([]);
    const [filter, setFilter] = useState("Terbaru");
    const [activeTab, setActiveTab] = useState("bukuSaya"); 
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user) return;

        const fetchMyBooks = async () => {
            setLoading(true);
            try {
                // To use your API, uncomment the lines below
                /*
                const res = await axiosInstance.get("/api/books"); // 1. Get all books
                const allBooks = res.data.books || [];
                const userBooks = allBooks.filter(book => book.uploaderId === user._id); // 2. Filter by user ID
                setMyBooks(userBooks);
                */

                // --- MOCK DATA LOGIC (for demonstration) ---
                const mockAllBooks = [
                     { _id: 1, uploaderId: user._id, title: "Pendidikan Agama Islam dan Budi Pekerti", grade: "Kelas II", imageUrl: "https://via.placeholder.com/200x280/81C784/FFFFFF?text=Buku+PAI", fileType: "PDF", category: "SD/MI", createdAt: new Date('2025-07-10T10:00:00Z') },
                     { _id: 6, uploaderId: user._id, title: "Matematika", grade: "Kelas IV", imageUrl: "https://via.placeholder.com/200x280/FF7043/FFFFFF?text=Buku+MTK", fileType: "PDF", category: "SD/MI", createdAt: new Date('2025-07-11T12:00:00Z') },
                     // Add other books uploaded by the user here
                ];
                
                const sorted = mockAllBooks.sort((a, b) => (
                    filter === "Terlama" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
                ));
                setMyBooks(sorted);


            } catch (err) {
                console.error("Gagal mengambil data buku saya:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBooks();
    }, [user, filter]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <Profil />
            <div className="max-w-5xl mx-auto mb-64 ">
                <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "bukuSaya" ? (
                    <>
                        <FilterSection filter={filter} handleFilterChange={handleFilterChange} itemCount={myBooks.length} />
                        <div className="flex gap-4 flex-wrap justify-center sm:justify-start px-4">
                            {loading && (
                                <div className="flex flex-wrap justify-center gap-4">
                                    {Array(3).fill(null).map((_, idx) => <CardSkleton key={idx} />)}
                                </div>
                            )}

                            {!loading && myBooks.length === 0 && <p className="w-full text-center py-10">Anda belum mengunggah buku.</p>}
                            
                            {!loading && myBooks.map((book) => (
                                <div key={book._id} className="w-full max-w-xs sm:w-[48%] md:w-[31%]">
                                     <BookCard book={book} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <BukuDisimpan />
                )}
            </div>
        </>
    );
}


export function Profil() {
    const [detilUser, setDetilUser] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchDetilUser = async () => {
                try {
                    const res = await axiosInstance.get(`/detil/get/${user._id}`);
                    setDetilUser(res.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDetilUser();
        }
    }, [user]);

    const handleClick = () => {
        navigate(`/edit-profil`);
    };

    const hasValidProfilePhoto = detilUser?.fotoProfil && typeof detilUser.fotoProfil === "string" && detilUser.fotoProfil.trim() !== "";

    return (
        <>
            <div className="bg-gray-200 rounded-b-[36px] w-full box-border h-fit relative">
                {user?.role === "donatur" ? <img src={donaturSampul} alt="" className="object-cover object-[30%_0%] h-56" /> : <img src={komunitasSampul} alt="" className="object-cover object-[30%_0%] h-56" />}
            </div>
            <div className="max-w-5xl mx-auto pt-4 px-8 flex md:flex-row flex-col justify-between">
                <div className="flex gap-4 md:gap-8">
                    {hasValidProfilePhoto ? (
                        <img src={detilUser.fotoProfil} alt="profile" className="w-24 h-24 md:w-36 md:h-36 bg-gray-500 border-4 relative md:-top-16 -top-10 border-white rounded-md object-cover" />
                    ) : (
                        <img src={personProfile} alt="profile" className="w-24 h-24 md:w-36 md:h-36 bg-gray-500 border-4 relative md:-top-16 -top-10 border-white rounded-md object-cover" />
                    )}
                    <div>
                        <h1 className="text-lg md:text-2xl font-semibold">{user?.namaLengkap || user?.username}</h1>
                        <p className="text-gray-600">{user?.username}</p>
                    </div>
                </div>
                <button className="border hidden md:block self-end h-fit rounded-full text-sm" onClick={handleClick}>
                    <img src={editProfilButton} alt="Edit Profil" className="w-32" />
                </button>
            </div>
        </>
    );
}

function TabSelector({ activeTab, setActiveTab }) {
    return (
        <div className="flex px-6 mb-8 font-medium">
            <button className={`px-5 border-b-2 md:text-md text-sm border-0 bg-transparent rounded-none pb-2 ${activeTab === "bukuSaya" ? "text-primary border-primary" : "text-gray-500"}`} onClick={() => setActiveTab("bukuSaya")}>
                Buku Saya
            </button>
            <button className={`px-5 border-b-2 md:text-md text-sm border-0 bg-transparent rounded-none pb-2 ${activeTab === "disimpan" ? "text-primary border-primary" : "text-gray-500"}`} onClick={() => setActiveTab("disimpan")}>
                Disimpan
            </button>
        </div>
    );
}

function FilterSection({ filter, handleFilterChange, itemCount }) {
    return (
        <div className="flex px-6 justify-between items-center mt-4 mb-4 md:mb-8">
            <div className="flex items-center gap-2">
                <label htmlFor="filter" className="text-sm">Urutkan:</label>
                <select id="filter" value={filter} onChange={handleFilterChange} className="border rounded px-2 py-1 text-sm">
                    <option value="Terbaru">Terbaru</option>
                    <option value="Terlama">Terlama</option>
                </select>
            </div>
            <div className="font-semibold px-8 text-center">
                Total Buku
                <p className="text-sm">
                    <span className="text-blue-700 text-2xl px-1">{itemCount}</span> Buku
                </p>
            </div>
        </div>
    );
}

function BukuDisimpan() {
    const [savedBooks, setSavedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    const fetchSavedBooks = useCallback(async () => {
        if (!user?._id) return;
        setLoading(true);
        try {
             // To use your API, uncomment this section
             /*
            const { data: savedList } = await axiosInstance.get(`/api/books/saved/${user._id}`);
            const bookDetails = await Promise.all(
                savedList.map(item => axiosInstance.get(`/api/books/${item.bookId}`))
            );
            setSavedBooks(bookDetails.map(res => res.data));
            */

            // --- MOCK DATA LOGIC (for demonstration) ---
            const mockSavedBooks = [
                { _id: 2, title: "Pendidikan Agama Islam dan Budi Pekerti", grade: "Kelas VII", imageUrl: "https://via.placeholder.com/200x280/4DB6AC/FFFFFF?text=Buku+PAI", fileType: "PDF", category: "SMP/MTS" },
                { _id: 4, title: "Sejarah Kebudayaan Islam", grade: "Kelas X", imageUrl: "https://via.placeholder.com/200x280/00897B/FFFFFF?text=Buku+SKI", fileType: "PDF", category: "SMA/MA" },
            ];
            setSavedBooks(mockSavedBooks);

        } catch (err) {
            console.error("Gagal mengambil daftar buku yang disimpan:", err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchSavedBooks();
    }, [fetchSavedBooks]);

    return (
        <div className="mt-6 px-4 sm:px-6">
            <h2 className="text-xl font-semibold mb-4">Buku yang Disimpan</h2>
            {loading && (
                <div className="flex flex-wrap justify-center gap-4">
                    {Array(2).fill(null).map((_, idx) => <CardSkleton key={idx} />)}
                </div>
            )}
            {!loading && savedBooks.length === 0 && <p>Tidak ada buku yang disimpan.</p>}
            <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
                {savedBooks.map((book) => (
                    <div key={book._id} className="w-full max-w-xs sm:w-[48%] md:w-[31%]">
                         <BookCard book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}