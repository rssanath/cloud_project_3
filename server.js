const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Temporary in-memory storage
const hormoneRecords = [];

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Hormone Tracker API is running"
  });
});

// Get all hormone records
app.get("/api/hormones", (req, res) => {
  res.json(hormoneRecords);
});

// Add a hormone record
app.post("/api/hormones", (req, res) => {
  const {
    name,
    value,
    unit,
    date
  } = req.body;

  if (!name || value === undefined || !unit || !date) {
    return res.status(400).json({
      error: "name, value, unit, and date are required"
    });
  }

  const record = {
    id: hormoneRecords.length + 1,
    name,
    value: Number(value),
    unit,
    date
  };

  hormoneRecords.push(record);

  res.status(201).json({
    message: "Hormone record created",
    record
  });
});

// Get one hormone record
app.get("/api/hormones/:id", (req, res) => {
  const id = Number(req.params.id);

  const record = hormoneRecords.find(
    item => item.id === id
  );

  if (!record) {
    return res.status(404).json({
      error: "Hormone record not found"
    });
  }

  res.json(record);
});

// Delete a hormone record
app.delete("/api/hormones/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = hormoneRecords.findIndex(
    item => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Hormone record not found"
    });
  }

  hormoneRecords.splice(index, 1);

  res.json({
    message: "Hormone record deleted"
  });
});

app.listen(PORT, () => {
  console.log(`Hormone Tracker API running at http://localhost:${PORT}`);
});
