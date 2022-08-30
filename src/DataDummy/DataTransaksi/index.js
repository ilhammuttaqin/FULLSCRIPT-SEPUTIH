import {
  AHA,
  BodyButter,
  InstanGlow,
  Sabun,
  Vitamin,
  PaketAll,
  PaketLengkap,
  SabunKategori,
  BodyCream,
  Serum,
  PerawatanWajah,
} from "../../assets";

export const DataTransaksi = [
  {
    id: 1,
    tanggalPemesanan: "Jumat, 1 september 2021",
    status: "keranjang",
    totalHarga: 129000,
    berat: 0.3,
    transaksi: [
      {
        id: 1,
        produk: {
          id: 1,
          nama: "AHA Body Serum",
          gambar: AHA,
          kategori: {
            id: 3,
            nama: "Serum",
            gambar: Serum,
          },
          harga: 47000,
          berat: 0.1,
          stok: 100,
        },
        jumlahPesanan: 2,
        subTotal: 94000,
        keterangan: null,
      },
      {
        id: 2,
        produk: {
          id: 4,
          nama: "Sabun",
          gambar: Sabun,
          kategori: {
            id: 1,
            nama: "Sabun Whitehning",
            gambar: SabunKategori,
          },
          harga: 35000,
          berat: 0.1,
          stok: 1000,
        },
        jumlahPesanan: 1,
        subTotal: 35000,
        keterangan: null,
      },
    ],
  },
  {
    id: 2,
    tanggalPemesanan: "Sabtu, 2 september 2021",
    status: "lunas",
    totalHarga: 129000,
    berat: 0.3,
    transaksi: [
      {
        id: 1,
        produk: {
          id: 1,
          nama: "AHA Body Serum",
          gambar: AHA,
          kategori: {
            id: 2,
            nama: "Serum",
            gambar: Serum,
          },
          harga: 47000,
          berat: 0.1,
          stok: 100,
        },
        jumlahPesanan: 2,
        subTotal: 94000,
        keterangan: null,
      },
      {
        id: 2,
        produk: {
          id: 4,
          nama: "Sabun",
          gambar: Sabun,
          kategori: {
            id: 1,
            nama: "Sabun Whitehning",
            gambar: SabunKategori,
          },
          harga: 35000,
          berat: 0.1,
          stok: 1000,
        },
        jumlahPesanan: 1,
        subTotal: 35000,
        keterangan: null,
      },
    ],
  },
  {
    id: 3,
    tanggalPemesanan: "Sabtu, 8 september 2021",
    status: "lunas",
    totalHarga: 140000,
    berat: 0.4,
    transaksi: [
      {
        id: 1,
        produk: {
          id: 1,
          nama: "Instan Glow",
          gambar: InstanGlow,
          kategori: {
            id: 2,
            nama: "Body Cream",
            gambar: BodyCream,
          },
          harga: 35000,
          berat: 0.1,
          stok: 100,
        },
        jumlahPesanan: 4,
        subTotal: 94000,
        keterangan: null,
      },
    ],
   
  },
];
