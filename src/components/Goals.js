import React, { useState, useEffect } from "react";
import "./Goals.css";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper
} from "@mui/material";
import GoalForm from "./GoalForm";
import Plan from "./Plan";
import Metrics from "./Metrics";

function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("/api/goals");
      const data = await response.json();
      if (Array.isArray(data)) {
        setGoals(data);
      } else {
        console.error("Unexpected data format:", data);
      }
    };
    fetchGoals();
  }, []);  

  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const openGoalForm = () => {
    setIsGoalFormOpen(true);
  };

  const closeGoalForm = () => {
    setIsGoalFormOpen(false);
  };

  const addGoal = async (goal) => {
    const response = await fetch("/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...goal, status: "Not started" }),
    });
  
    if (response.ok) {
      const savedGoal = await response.json();
      setGoals((prevState) => [...prevState, savedGoal]);
    } else {
      console.error("Failed to save goal");
    }
  };

  const bubbleSize = (importance) => {
    switch (importance) {
      case "high":
        return 150;
      case "medium":
        return 100;
      default:
        return 50;
    }
  };
  
  const bubbleColor = (progress) => {
    switch (progress) {
      case "ahead":
        return "green";
      case "on track":
        return "orange";
      default:
        return "red";
    }
  };

  function GoalDetails({ goal, onClose }) {
    return (
      <div className="goal-details">
        <div className="goal-details-header">
          <h2>{goal.name}</h2>
          <p>{goal.summary}</p>
        </div>
        <div className="goal-details-status">
          <p>Status: {goal.status}</p>
        </div>
        <div className="goal-details-metrics">
          <Metrics goal={goal} />
        </div>
        <div className="goal-details-plans">
          <Plan goal={goal} />
        </div>
        <button className="goal-details-close" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="Goals">
      <Container>
        <Typography variant="h4" className="Goals-header">
          Eddie Lemons - Helps with your goals... What's yours?
        </Typography>
        <Typography variant="body1" className="Goals-description">
          A SMART goal is specific, measurable, attainable, relevant, and time-bound. Create your SMART goals and track their progress below.
        </Typography>
        <Button variant="contained" color="primary" onClick={openGoalForm}>
          Add New Goal
        </Button>
        <Grid container justifyContent="center">
          {selectedGoal && (
            <div className="goal-details">
              <GoalDetails goal={selectedGoal} onClose={() => setSelectedGoal(null)} />
            </div>
          )}
          <div className="Goals-list">
            {Array.isArray(goals) &&
              goals.map((goal, index) => (
                <Paper key={index} className="goal-item" onClick={() => setSelectedGoal(goal)}>
                  <div className="goal-name">{goal.name}</div>
                  <div className="goal-summary">{goal.summary}</div>
                </Paper>
              ))}
          </div>
          <GoalForm open={isGoalFormOpen} handleClose={closeGoalForm} handleAddGoal={addGoal} />
        </Grid>
      </Container>
    </div>
  );
}

export default Goals;
