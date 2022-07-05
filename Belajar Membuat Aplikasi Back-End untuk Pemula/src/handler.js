const { nanoid } = require('nanoid');
const books = require('./books');

// Handler API Dapat Menyimpan Buku
const addBookHandler = (request, h) => {
  // destructuring dari body request
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  // Cek apakah ada name
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // Cek apakah readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // push to books array
  books.push(newBook);
  // Jika sukses, data sudah masuk ke array sehingga bisa diquery dengan filter
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Jika berhasil
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  // Jika Error
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Handler API Dapat Menampilkan Seluruh Buku
const getAllBooksHandler = (request, h) => {
  console.log(books);
  // ambil query
  const { name: nameQuery, reading: readingQuery, finished: finishedQuery } = request.query;
  // Manipulasi isi properti object dari array book
  const bookFormatted = books.filter((book) => {
    // jika ada query name
    if (nameQuery && !book.name.toLowerCase().includes(nameQuery.toLowerCase())) {
      return false;
    }
    // jika ada query reading
    if (readingQuery && (book.reading !== (parseInt(readingQuery, 10) === 1))) {
      return false;
    }
    // jika ada query finished
    if (finishedQuery && (book.finished !== (parseInt(finishedQuery, 10) === 1))) {
      console.log();
      return false;
    }
    return true;
  }).map((book) => {
    const { id, name, publisher } = book;
    return {
      id, name, publisher,
    };
  });
  const response = h.response({
    status: 'success',
    data: { books: bookFormatted },
  });
  response.code(200);
  return response;
};

// Handler API Dapat Menampilkan Detail Buku
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((item) => item.id === bookId)[0];
  console.log(book);
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Handler API Dapat Mengubah Data Buku
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  // Cek apakah ada name
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  // Cek apakah readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  // Jika id ditemukan
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  // Jika id tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// API Dapat Menghapus Buku
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);
  // Jika Id buku ditemukan
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // Jika Id buku tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
