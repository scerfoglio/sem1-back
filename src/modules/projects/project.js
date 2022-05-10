const express = require('express');
const router = express.Router();
const projectsData = require('../../samples/projects.json');

// Create project
router.post('/projects', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Get all projects
router.get('/projects', (req, res) => {
  console.log(projectsData);
  res.send(projectsData);
});

// Get a project by id
router.get('/projects/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    console.log(`Id: ${id}`);
    for (let i = 0; i < projectsData.length; i++) {
      if (projectsData[i].id === id) {
        res.send(projectsData[i]);
        return;
      }
    }
    throw new Error("Not found")
  } catch {
    next({ error: "Not found" });
  }
  res.status(404);
  return next({ error: "Not found" });
});

module.exports = router;
