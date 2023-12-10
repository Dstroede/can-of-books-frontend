import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
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
            console.error('No Books Found. Server response:', res.status )
        }
    } catch (error) {
        console.error(error.message);
    }
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
                                    // Use a placeholder image when img is not available
                                    <img src="https://fakeimg.pl/600x500/FFFFFF/FFFFFF" alt={`Slide ${index + 1}`} />
                                )}
                                <Carousel.Caption className="book-card">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                    <p>{book.status}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <h3>No Books Found</h3>
                )}
            </>
        );
    }
}

export default BestBooks;