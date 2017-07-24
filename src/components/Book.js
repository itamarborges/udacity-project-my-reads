import React from 'react'

class Book extends React.Component {
  state = { shelf: this.props.shelf };

  static CURRENTLY_READING = "currentlyReading";
  static WANT_TO_READ = "wantToRead";
  static READ = "read";
  static NONE = "none";


  printAuthors(arrAuthors) {
    return (
      <div>
        {arrAuthors && arrAuthors.map((author) => (
          <p key={author}>{author}</p>
        ))}
      </div>
    );
  }

  changeBook(event) {
    this.props.onUpdateBook(this.props.book, event.target.value);
    this.setState({ shelf: event.target.value });
  }

  returnUrlImage(imageLinks) {
    return (imageLinks && imageLinks.smallThumbnail) ? imageLinks.smallThumbnail : '';
  }

  render() {
    const { title, authors, imageLinks } = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+this.returnUrlImage(imageLinks)+')' }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(e) => this.changeBook(e)}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{this.printAuthors(authors)}</div>
      </div>

    );
  }
}

export default Book;
