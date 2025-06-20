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
