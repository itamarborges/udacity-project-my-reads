import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

  renderTitle() {
    switch (this.props.type) {
      case Book.CURRENTLY_READING:
        return 'Currently Reading';
      case Book.WANT_TO_READ:
        return 'Want to Read';
        case Book.READ:
          return 'Read';
      default:
        return 'Unknow Shelf';
    }
  }

  updateBook(book, shelf) {
    this.props.onUpdateBook(book, shelf);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.renderTitle()}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                shelf={book.shelf}
                onUpdateBook={(book, shelf) => {
                  this.updateBook(book, shelf)}
                }
              />
            </li>
          ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
