import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

class EditBook extends React.Component {
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
            const { _id, title, description, status } = this.props.editedBook;
            this.setState({
                books: {
                    _id,
                    title: this.state.books.title || title,
                    description: this.state.books.description || description,
                    status: this.state.books.status || status,
                },
            });


            let res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/books/${this.props.editedBook._id}`, this.state.books);
            console.log('EditBook.jsx- Book Updated Successfully:', res.data);

            this.props.handleEditSubmit(this.state.books);
            this.props.handleCloseModal();
        } catch (error){
            console.log('EditBook.jsx- Error Creating Book:', error)
        }
    };

    render() {
          return (
              <>

                  <Modal show={ this.props.showModal } onHide={ this.handleCloseModal } >
                    <Modal.Header closeButton> 
                    <Modal.Title>Edit Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                  <Form onSubmit={(e) => this.handleSubmit(e)}>
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
  
                      <Button type="submit">Update Book</Button>
                  </Form>
                  </Modal.Body>
                  </Modal>
              </>
          );
      }
  }
  
  export default EditBook;