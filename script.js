function Book(name, author, pages, read) {
    if (!new.target)
        throw Error("You must use the 'new' keyword to call the constructor.");

    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
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
        pagesInput.value,
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
            <input type="checkbox" id="read-${book.id}" ${book.read ? 'checked' : ''}>
            Read the book?
        </label>
        <button type="button" class="remove-button">Remove</button>
    `;

    document.querySelector('.book-container').append(bookCard);
    return bookCard;
}
