import React from "react";
import {  UserEdit,Logout, CekResi, History } from "../../assets";

export const DataProfile = [
    {
        id:1,
        nama:"Edit Profil",
        gambar: <UserEdit/>,
        halaman: "Edit Profile"
    },
    {
        id:2,
        nama:"History Pemesanan",
        gambar: <History/>,
        halaman: "History Pemesanan"
    },
    {
        id:3,
        nama:"Cek Resi",
        gambar: <CekResi/>,
        halaman: "Cek Resi"
    },
    {
        id:4,
        nama:"Keluar",
        gambar: <Logout/>,
        halaman: "Login"
    
    },
    
]
