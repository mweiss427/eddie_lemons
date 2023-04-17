// Plan.js
import React from "react";
import { Button } from "@mui/material";

function Plan({ goal }) {
  if (goal.plan) {
    return (
      <div>
        <h3>Plan</h3>
        {/* Render the plan content here */}
      </div>
    );
  } else {
    return (
      <div>
        <h3>Plan</h3>
        <Button variant="contained" color="primary">
          Add a plan
        </Button>
      </div>
    );
  }
}

export default Plan;
