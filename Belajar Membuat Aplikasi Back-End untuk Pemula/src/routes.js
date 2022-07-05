const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handler');

// import module handler lalu buat setiap route yang diminta
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => ({ test: 'test' }),
  },
  // Kriteria 1: API Dapat Menyimpan Buku
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // Kriteria 2: API Dapat Menampilkan Seluruh Buku
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // Kriteria 3: API Dapat Menampilkan Detail Buku
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  // Kriteria 4: API Dapat Mengubah Data Buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },
  // Kriteria 5: API Dapat Menghapus Buku
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },

];

module.exports = routes;
