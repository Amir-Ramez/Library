class Book {
    #name;
    #author;
    #pages;
    #read;
    #id;

    constructor(name, author, pages, read) {
        this.#name = name;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
        this.#id = crypto.randomUUID();
    }

    // setter and getters
    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get author() {
        return this.#author;
    }

    set author(author) {
        this.#author = author;
    }

    get pages() {
        return this.#pages;
    }

    set pages(pages) {
        this.#pages = pages;
    }

    get read() {
        return this.#read;
    }

    set read(read) {
        this.#read = read;
    }

    get id() {
        return this.#id;
    }
}

const books = [];
const dialog = document.querySelector('#dialog');
const form = document.querySelector('#dialog form');
const addBookButton = document.querySelector('.add-button button');
const submitButton = document.querySelector('#submit-button');
const nameInput = document.querySelector('#book-name');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

addBookButton.addEventListener('click', () => {
    form.reset();
    dialog.showModal();
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();

    const book = addNewBook(
        nameInput.value,
        authorInput.value,
        Number(pagesInput.value),
        readInput.checked
    );
    createBookCard(book);
});

function addNewBook(name, author, pages, read) {
    const book = new Book(name, author, pages, read);
    books.push(book);
    return book;
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.dataset.id = book.id;

    bookCard.innerHTML = `
        <h3>${book.name}</h3>
        <p>By: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <label for="read-${book.id}">
            Read the book?
            <input type="checkbox" id="read-${book.id}" ${book.read ? 'checked' : ''}>
        </label>
        <button type="button" class="remove-button">Remove</button>
    `;

    document.querySelector('.book-container').append(bookCard);
    return bookCard;
}

document.querySelector('.book-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const bookCard = event.target.closest('.book-card');
        const id = bookCard.dataset.id;
        removeBookById(id);
    }
});

function removeBookById(id) {
    const index = books.findIndex((book) => book.id === id);
    if (index != -1) books.splice(index, 1);

    const bookCard = document.querySelector(`.book-card[data-id="${id}"]`);
    if (bookCard) bookCard.remove();
}

function addTempBookCard() {
    const book = new Book('C++ How To Program', 'Deitel & Deitel', 1080, true);
    books.push(book);
    createBookCard(book);
}

addTempBookCard();
