import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./api";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventDescription: "",
    eventImage: "",
    eventLocation: "",
    eventAttendees: "",
    eventFacilities: "gold",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/events/add`, formData);
      setMessage("Event added successfully!");
      setFormData({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventDescription: "",
        eventImage: "",
        eventLocation: "",
        eventAttendees: "",
        eventFacilities: "gold",
      });
      navigate("/");
    } catch (error) {
      setError("Failed to add event. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 5 }}>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 4,
          borderRadius: 5,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: 3, color: "#003366" }}
        >
          Add Event
        </Typography>

        {message && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            id="eventImage"
            label="Event Image URL"
            variant="outlined"
            type="url"
            fullWidth
            value={formData.eventImage}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <TextField
            id="eventName"
            label="Event Name"
            variant="outlined"
            fullWidth
            value={formData.eventName}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <TextField
            id="eventDate"
            label="Event Date"
            variant="outlined"
            type="date"
            fullWidth
            value={formData.eventDate}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <TextField
            id="eventTime"
            label="Event Time"
            variant="outlined"
            type="time"
            fullWidth
            value={formData.eventTime}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <TextField
            id="eventDescription"
            label="Event Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formData.eventDescription}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <TextField
            id="eventLocation"
            label="Event Location"
            variant="outlined"
            fullWidth
            value={formData.eventLocation}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <TextField
            id="eventAttendees"
            label="Number of Attendees"
            variant="outlined"
            type="number"
            fullWidth
            min="1"
            value={formData.eventAttendees}
            onChange={handleChange}
            required
            sx={{ marginBottom: 2, borderRadius: 3 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Event Facilities</InputLabel>
            <Select
              id="eventFacilities"
              value={formData.eventFacilities}
              onChange={handleChange}
              required
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="gold">Gold</MenuItem>
              <MenuItem value="silver">Silver</MenuItem>
              <MenuItem value="vip">VIP</MenuItem>
              <MenuItem value="vvip">VVIP</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              padding: 1.5,
              fontSize: "1rem",
              borderRadius: 3,
              "&:hover": { backgroundColor: "#003366" },
            }}
          >
            Add Event
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddEventForm;
