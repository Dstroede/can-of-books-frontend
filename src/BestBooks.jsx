import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button }from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBook from './CreateBook';
import EditBook from './EditBook';
import { withAuth0 } from '@auth0/auth0-react';




class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: false,
      showModal: false,
      token: null,
      editedBook:{
        _id: '',
        title: '',
        description: '',
        status: '',
      }
    }
  }

  handleEditBook = (book) => {
    console.log('Clicked Edit Book:', book);
    this.setState({
      showModal: true,
      editedBook: {
        _id: book._id || '',
        title: book.title,
        description: book.description,
        status: book.status,
      },
    });
  };

  handleCloseModal = () => {
    this.setState({
        showModal: false,
        editedBook:{
            _id: '',
            title: '',
            description: '',
            status: '',
        },
    });
  }
async componentDidMount(){
    try {
        let res = await this.props.auth0.getIdTokenClaims();
        const token = res.__raw;
        console.log('This is my token :', token)
        this.setState({ token });
        let foundBooks = await fetch(`${import.meta.env.VITE_SERVER_URL}/books`, {
            headers: {
                'Authorization': `Bearer ${token}`},
        });
        if (foundBooks.ok) {
            let bookData= await foundBooks.json();
            this.setState({
                books: bookData
            });
            console.log('Found these books:', bookData)
        }else {
            console.error('No Books Found. Server response:', foundBooks.status )
        }
    } catch (error) {
        console.error(error.message);
    }
}
async handleDeleteBook(bookId){
    try {
        let res = await this.props.auth0.getIdTokenClaims();
        const token = res.__raw;
        this.setState({ token });
        this.setState({ isLoading: true })
        console.log('Deleting books with this ID: ', bookId)
        let deleteBook = await fetch(`${import.meta.env.VITE_SERVER_URL}/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`},
        });
        if (deleteBook.ok) {
            this.setState((prevState) => ({
                books: prevState.books.filter((book) => book._id !== bookId),
            }));
            console.log('Book Delete Successfully');
        }else {
            let errorResponse = await deleteBook.json();
            console.error('Failed to Delete Book:', deleteBook.status, errorResponse )
        }
    } catch (error) {
        console.error('Error Deleting Book: ', error);
    } finally {
        this.setState({ isLoading: false })
    }
}
 
handleEditSubmit = async (updatedBook) => {
    try {
      const { _id, title, description, status } = updatedBook;
      const updatedBookData = { title, description, status };
      let res = await this.props.auth0.getIdTokenClaims();
      const token = res.__raw;
      this.setState({ token });
  
      let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/books/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        body: JSON.stringify(updatedBookData),
      });
        if (response.ok) {
            const updatedBookData = await res.json();
            this.setState((prevState) => ({
                books: prevState.books.map((book) => 
                book && updatedBookData && updatedBookData.updatedBook && book._id === updatedBookData.updatedBook._id
                ? updatedBookData.updatedBook
                : book
                  ),
            }));
            this.handleCloseModal();
        }else {
            console.error('BestBooks.jsx- Failed to Update Book:', response.status )
        }
    } catch (error) {
        console.error('BestBooks.jsx- Error Updating Book: ', error);
    }
};

handleBookCreated = (newBook) => {
    this.setState((prevState)=> ({
        books: [ ...prevState.books, newBook],
    }));
}
render() {
    let carouselStyle = {
      margin: '2rem',
    };

    return (
      <>
      {this.props.auth0.isAuthenticated ? (
        <>
            <h3>My Essential Lifelong Learning &amp; Formation Shelf</h3>

            {this.state.books.length > 0 ? (
              <Carousel style={carouselStyle} data-bs-theme="dark">
                {this.state.books.map((book, index) => (
                  <Carousel.Item key={index}>
                    {book.img ? (
                      <img src={book.img} alt={`Slide ${index + 1}`} />
                    ) : (
                      <img src="https://fakeimg.pl/600x500/FFFFFF/FFFFFF" alt={`Slide ${index + 1}`} />
                    )}
                    <Carousel.Caption className="book-card">
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>{book.status}</p>
                      <Button variant="danger" onClick={() => this.handleDeleteBook(book._id)}>
                        Delete Book
                      </Button>
                      <Button variant="secondary" onClick={() => this.handleEditBook(book)}>
                        Edit Book
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <h3>No Books Found</h3>
            )}
            <CreateBook onBookCreated={this.handleBookCreated} />
            {this.state.showModal && (
              <EditBook
                showModal={this.state.showModal}
                handleCloseModal={this.handleCloseModal}
                editedBook={this.state.editedBook}
                handleEditSubmit={this.handleEditSubmit}
              />
            )}
            </>
            ): (
                <h2> Please Log In To View and Add Books</h2>
            )}
      </>
    );
  }
}

export default withAuth0(BestBooks);