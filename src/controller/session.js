// routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const DAL = require('../DAL/dal');

// Create a new session
router.post('/sessions', async (req, res) => {
  try {
    const session = new Session(
        req.body.userId, req.body.sessionId, req.body.usageCount
    );
    
    await DAL.saveEntity(session); 
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

// // Read all sessions
// router.get('/sessions', async (req, res) => {
//   try {
//     const sessions = await DAL.Session.find({});
//     res.status(200).send(sessions);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Read a session by ID
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await DAL.getById('value1', Session, req.params.id); // TODO
    if (!session) {
      return res.status(404).send();
    }
    
    res.status(200).send(session);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Update a session by ID
router.patch('/sessions/:id/update_usage', async (req, res) => {
    console.log(req.body.usage_time_seconds);
    try {
    const session = await DAL.getById('value1', Session, req.params.id); // TODO
    if (!session) {
      return res.status(404).send();
    }
    console.log(session);
    session.usageCount = req.body.usage_time_seconds;
    console.log(session);
    await DAL.saveEntity(session);
    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a session by ID
/*
router.delete('/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).send();
    }
    res.status(200).send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});*/

module.exports = router;