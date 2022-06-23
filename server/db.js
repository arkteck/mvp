const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.mongoUN}:${process.env.mongoPW}@${process.env.mongoURL}/timelines?retryWrites=true&w=majority`);

const timelineSchema = new mongoose.Schema({
  event: String,
  startDate: Date,
  endDate: Date,
  backgroundColor: String,
  sessionID: String,
}, {
  timestamps: true,
});

const Timeline = mongoose.model('Timelines', timelineSchema);

exports.getEvents = (req, res) => {
  Timeline.find({ sessionID: req.sessionID })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

exports.addEvent = (req, res) => {
  const newEvent = { ...req.body };
  newEvent.sessionID = req.sessionID;
  Timeline.create(newEvent)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
