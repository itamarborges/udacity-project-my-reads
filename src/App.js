import React from 'react'
import { Route, Link } from 'react-router-dom'
import BookShelf from './components/BookShelf'
import Book from './components/Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  filterBooks(typeShelf) {
    return this.state.books.filter((book) => book.shelf === typeShelf);
  }

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(this.getAllBooks())
  }

  render() {

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
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
