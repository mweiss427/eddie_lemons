import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";

function GoalForm({ open, handleClose, handleAddGoal }) {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    handleAddGoal({ name, summary, endDate });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New SMART Goal</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          A SMART goal is specific, measurable, attainable, relevant, and time-bound. Fill in the
          details below to create your goal.
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Summary"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <TextField
          label="End Date"
          fullWidth
          type="date"
          margin="normal"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add Goal
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GoalForm;
