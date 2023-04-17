// Metrics.js
import React from "react";
import { Button } from "@mui/material";

function Metrics({ goal }) {
  if (goal.metrics) {
    return (
      <div>
        <h3>Metrics</h3>
        {/* Render the metrics content here */}
      </div>
    );
  } else {
    return (
      <div>
        <h3>Metrics</h3>
        <Button variant="contained" color="primary">
          Attach metrics
        </Button>
      </div>
    );
  }
}

export default Metrics;
