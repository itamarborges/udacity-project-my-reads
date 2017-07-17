import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {

  renderTitle() {
    switch (this.props.type) {
      case Book.CURRENTLY_READING:
        return 'Currently Reading'
      case Book.WANT_TO_READ:
        return 'Want to Read'
        case Book.READ:
          return 'Read'
      default:
        return 'Unknow Shelf'
    }
  }

  updateBook(book, shelf) {
    this.props.onUpdateBook(book, shelf)
  }

  state = { }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.renderTitle()}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <Book
                coverImage="http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
                book={book}
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
