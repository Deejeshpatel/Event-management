import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col, Row, InputGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaImage, FaMapMarkerAlt } from 'react-icons/fa';
import { API_URL } from './api';

const EditEventForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
    eventImage: '',
    eventLocation: '',
    eventAttendees: '',
    eventFacilities: ''
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/events/${id}`);
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/events/edit/${id}`, eventData);
      alert('Event updated successfully');
      navigate('/'); 
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };

  return (
    <Container className="edit-event-form my-5">
      <h2 className="text-center mb-4 text-primary">Edit Event</h2>
      <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
        <Row>
          <Col md={6}>
            <Form.Group controlId="eventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                name="eventName"
                value={eventData.eventName}
                onChange={handleChange}
                required
                style={{
                  borderColor: '#3f51b5',
                  boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="eventDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="eventDate"
                value={eventData.eventDate.split('T')[0]} 
                onChange={handleChange}
                required
                style={{
                  borderColor: '#3f51b5',
                  boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="eventTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="eventTime"
                value={eventData.eventTime}
                onChange={handleChange}
                required
                style={{
                  borderColor: '#3f51b5',
                  boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="eventAttendees">
              <Form.Label>Attendees</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Enter number of attendees"
                  name="eventAttendees"
                  value={eventData.eventAttendees}
                  onChange={handleChange}
                  required
                  style={{
                    borderColor: '#3f51b5',
                    boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
                  }}
                />
                <InputGroup.Text>people</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="eventDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter event description"
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleChange}
            required
            style={{
              borderColor: '#3f51b5',
              boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
            }}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="eventImage">
              <Form.Label><FaImage /> Image URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter image URL"
                name="eventImage"
                value={eventData.eventImage}
                onChange={handleChange}
                required
                style={{
                  borderColor: '#3f51b5',
                  boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="eventLocation">
              <Form.Label><FaMapMarkerAlt /> Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event location"
                name="eventLocation"
                value={eventData.eventLocation}
                onChange={handleChange}
                required
                style={{
                  borderColor: '#3f51b5',
                  boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="eventFacilities">
          <Form.Label>Facilities</Form.Label>
          <Form.Control 
            as="select" 
            name="eventFacilities" 
            value={eventData.eventFacilities} 
            onChange={handleChange} 
            required
            style={{
              borderColor: '#3f51b5',
              boxShadow: '0 0 5px rgba(63, 81, 181, 0.3)'
            }}
          >
            <option value="">Select a facility</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="vip">VIP</option>
            <option value="vvip">VVIP</option>
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            type="submit"
            className="w-50"
            style={{
              backgroundColor: '#3f51b5',
              borderColor: '#3f51b5',
              fontSize: '1.1rem',
              padding: '10px',
              boxShadow: '0 0 10px rgba(63, 81, 181, 0.3)',
              transition: 'background-color 0.3s, box-shadow 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1a237e'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3f51b5'}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditEventForm;
