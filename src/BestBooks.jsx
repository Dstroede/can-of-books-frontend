import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button }from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBook from './CreateBook';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: false,
    }
  }

async componentDidMount(){
    try {
        let foundBooks = await fetch(`${import.meta.env.VITE_SERVER_URL}/books`);
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
        this.setState({ isLoading: true })
        console.log('Deleting books with this ID: ', bookId)
        let deleteBook = await fetch(`${import.meta.env.VITE_SERVER_URL}/books/${bookId}`, {
            method: 'DELETE',
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

handleBookCreated = (newBook) => {
    this.setState((prevState)=> ({
        books: [ ...prevState.books, newBook],
    }));
}
  render() {
    let carouselStyle = {
        margin: '2rem',
    }

        return (
            <>
                <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

                {this.state.books.length > 0 ? (
                    <Carousel style= {carouselStyle} data-bs-theme="dark">
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
                                    <Button variant='danger' onClick={() => this.handleDeleteBook(book._id)} >
                                        Delete Book </Button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <h3>No Books Found</h3>
                )}
                <CreateBook onBookCreated= {this.handleBookCreated}/>
            </>
        );
    }
}

export default BestBooks;