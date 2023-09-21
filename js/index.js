document.addEventListener("DOMContentLoaded", function () {
  const addBookBtn = document.getElementById("addBookBtn");
  const modal = document.getElementById("modal");
  const modalConfirm = document.getElementById("modalConfirm");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const saveBookBtn = document.getElementById("saveBookBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const notCompleteContainer = document.getElementById("notComplateContainer");
  const completedContainer = document.getElementById("complatedContainer");
  const searchInput = document.getElementById("searchInput");

  let books = [];

  const showModalAddBook = () => {
    modal.style.display = "block";
  };

  const showModalConfirm = (id) => {
    modalConfirm.style.display = "block";

    const bookToDelete = books.find((book) => book.id === id);
    if (bookToDelete) {
      const bookNameToDelete = document.getElementById("bookNameToDelete");
      bookNameToDelete.textContent = bookToDelete.title;
    }

    confirmDeleteBtn.addEventListener("click", () => {
      const index = books.findIndex((book) => book.id === id);
      if (index !== -1) {
        books.splice(index, 1);
        renderBook();
        saveBooksToLocalStorage();
        hideModalConfirm();
      }
    });

    cancelDeleteBtn.addEventListener("click", () => {
      hideModalConfirm();
    });
  };

  const hideModalConfirm = () => {
    modalConfirm.style.display = "none";
  };

  const saveBooksToLocalStorage = () => {
    localStorage.setItem("books", JSON.stringify(books));
  };

  const getBooksFromLocalStorage = () => {
    const booksLocalStorage = localStorage.getItem("books");
    return booksLocalStorage ? JSON.parse(booksLocalStorage) : [];
  };

  const addBook = (title, author, year, isComplete) => {
    const book = {
      id: Date.now(),
      title,
      author,
      year: +year,
      isComplete,
    };
    books.push(book);
    renderBook();
    saveBooksToLocalStorage();
  };

  const renderBook = (bookList) => {
    notCompleteContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    const booksToRender = bookList || books;

    booksToRender.forEach((book, index) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const bookHeader = document.createElement("div");
      bookHeader.classList.add("book-header");

      const bookTitle = document.createElement("div");
      bookTitle.classList.add("book-title");
      bookTitle.innerHTML = `<h3>${buku.title}</h3><p>(${buku.year})</p>`;

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = buku.author;

      const bookAction = document.createElement("div");
      bookAction.classList.add("book-action");

      const buttonDelete = document.createElement("button");
      buttonDelete.classList.add("cancel-delete-button");
      buttonDelete.textContent = "Hapus";
      buttonDelete.addEventListener("click", () => {
        showModalConfirm(buku.id);
      });

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.checked = buku.isComplete;
      checkBox.addEventListener("change", () => {
        buku.isComplete = checkBox.checked;
        renderBook();
        saveBooksToLocalStorage();
      });

      bookHeader.appendChild(bookTitle);
      bookHeader.appendChild(bookAuthor);
      bookAction.appendChild(buttonDelete);
      bookAction.appendChild(checkBox);
      bookCard.appendChild(bookHeader);
      bookCard.appendChild(bookAction);

      if (book.isComplete) {
        completedContainer.appendChild(bookCard);
      } else {
        notCompleteContainer.appendChild(bookCard);
      }
    });
  };

  addBookBtn.addEventListener("click", function () {
    showModalAddBook();
  });

  saveBookBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;
    const isComplete = document.getElementById("isComplete").checked;

    if (title && author && year) {
      addBook(title, author, year, isComplete);
      modal.style.display = "none";

      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("year").value = 0;
      document.getElementById("isComplete").checked = false;
    } else {
      alert("Harap isi semua field!");
    }
  });

  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  books = getBooksFromLocalStorage();
  renderBook();

  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.toLowerCase();

    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword)
    );

    renderBook(filteredBooks);
  });
});
