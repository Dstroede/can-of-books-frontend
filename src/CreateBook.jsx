import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class CreateBook extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showModal: false,
        books: {
            title: '',
            description: '',
            status: ''
        },
      };
    }

    handleChange = (e) => {
        this.setState({
        books: { ...this.state.books, [e.target.name]: e.target.value },
    });
    };
    
    handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let resToken = await this.props.auth0.getIdTokenClaims();
            const token = resToken.__raw;
            console.log('This is my token :', token)
            this.props.updateToken(token)
            let res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/books`, this.state.books, {
                headers: {
                    'Authorization': `Bearer ${token}`},
            }); 
            console.log('New Book Created:', res.data);

            this.setState((prevState) => ({
                books: { ...prevState.books, res: res.data},
            }));
            this.props.onBookCreated(res.data);
            this.handleCloseModal();
        } catch (error){
            console.log('Error Creating Book:', error)
        }
    };

    handleShowModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    render() {
          return (
              <>
                  <Button variant="primary" onClick={ this.handleShowModal }>
                    Add Book
                  </Button>

                  <Modal show={ this.state.showModal } onHide={ this.handleCloseModal } >
                    <Modal.Header closeButton> 
                    <Modal.Title>Add New Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                  <Form onSubmit={ this.handleSubmit }>
                      <Form.Label>
                          Title:
                          <Form.Control
                           type="text"
                           placeholder="title"
                           name= "title"
                           value={this.state.books.title} 
                           onChange={this.handleChange} 
                           required />
                      </Form.Label>
  
                      <Form.Label>
                          Description:
                          <Form.Control
                          type="text"
                          placeholder="description" 
                          name= "description"
                          value={this.state.books.description} 
                          onChange={this.handleChange}  
                          required />
                      </Form.Label>
  
                      <Form.Label>
                          Status:
                          <Form.Control 
                          type="text" 
                          placeholder="status" 
                          name= "status"
                          value={this.state.books.status} 
                          onChange={this.handleChange}  
                          required />
                      </Form.Label>
  
                      <Button type="submit">Create Book</Button>
                  </Form>
                  </Modal.Body>
                  </Modal>
              </>
          );
      }
  }
  
  export default withAuth0(CreateBook);