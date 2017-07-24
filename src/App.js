import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Book from './components/Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  static MAX_RESULTS = 20;

  state = {
    books: [],
    searchBooks: [],
    query: ''
  }
  //get an specific book from the back end and add it to the "main"shelf
  addBook = (id, shelf) => {
    BooksAPI.get(id)
      .then((book) => {
        book.shelf = shelf;
        this.setState({ books : this.state.books.concat(book)})
      });
  }

  //get all books in the shelf
  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  filterBooks = (typeShelf) => {
    return this.state.books.filter((book) => book.shelf === typeShelf);
  }

  //After updates a book, prepare a new shelf with the values returned from
  //BookAPI. If the book was already loaded, just enforces the correct shelf. If not,
  //BookAPI is called to recover the book and it's added to the "main"shelf
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((results) => {
        let resultBooks = [];
        results.currentlyReading.forEach((idItem) => {
          let bookFound = this.state.books.filter((item) => item.id === idItem).shift();
          if (!bookFound) {
            this.addBook(idItem, Book.CURRENTLY_READING);
          } else {
            bookFound.shelf = Book.CURRENTLY_READING;
            resultBooks.push(bookFound);
          }
        });
        results.wantToRead.forEach((idItem) => {
          let bookFound = this.state.books.filter((item) => item.id === idItem).shift();
          if (!bookFound) {
            this.addBook(idItem, Book.WANT_TO_READ);
          } else {
            bookFound.shelf = Book.WANT_TO_READ;
            resultBooks.push(bookFound);
          }
        });

        results.read.forEach((idItem) => {
          let bookFound = this.state.books.filter((item) => item.id === idItem).shift();
          if (!bookFound) {
            this.addBook(idItem, Book.READ);
          } else {
            bookFound.shelf = Book.READ;
            resultBooks.push(bookFound);
          }
        });
        this.setState({ books: resultBooks });
      }
    );
  }

  //Mount the results from BookAPI.search
  //To show unique results, first, is created an array only with id's
  //If the book is not at the same position at its index in the array of indexes,
  //it means this book is already in the shelf
  updateQuery = (query) => {
    this.setState({ query });
    if (query.trim() !== '') {
      BooksAPI.search(query.trim(), BooksApp.MAX_RESULTS)
        .then((searchBooks) => {
          //the particular test about state.query is to solve a problem
          //when someone erases the search word very fast
          //Probably, it would show some results as queries with values
          //take more time to come back
          if (!searchBooks || searchBooks.error || this.state.query.trim() === '') {
            this.setState({ searchBooks: [] });
          } else {
            const idSearchBooks = searchBooks.map((item) => (item.id));
            const uniqueSearchBooks = searchBooks.filter(
              (item, index, array) => array.indexOf(item) === idSearchBooks.indexOf(item.id));

            this.setState({ searchBooks: uniqueSearchBooks });
          }
        });
    } else {
      this.setState({ searchBooks: [] });
    }
  }

  setShelf = (bookFilter) => {
    const bookSearch = this.state.books.filter((book) => book.id === bookFilter.id).shift();
    return (bookSearch) ? bookSearch.shelf : Book.NONE;
  }

  render() {
    const { query, searchBooks } = this.state;
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      shelf={this.setShelf(book)}
                      onUpdateBook={(book, shelf) => {
                        this.updateBook(book, shelf)}
                      }
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )} />

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  type={Book.CURRENTLY_READING}
                  books={this.filterBooks(Book.CURRENTLY_READING)}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book, shelf)}
                  }
                />
                <BookShelf
                  type={Book.WANT_TO_READ}
                  books={this.filterBooks(Book.WANT_TO_READ)}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book, shelf)}
                  }
                />
                <BookShelf
                  type={Book.READ}
                  books={this.filterBooks(Book.READ)}
                  onUpdateBook={(book, shelf) => {
                    this.updateBook(book, shelf)}
                  }
                />
              </div>
            </div>
            <div className="open-search">
              <Link className='close-create-contact' to='/search' >Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
