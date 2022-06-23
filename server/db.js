const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.mongoUN}:${process.env.mongoPW}@${process.env.mongoURL}/timelines?retryWrites=true&w=majority`);

const timelineSchema = new mongoose.Schema({
  id: Number,
  campus: String,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: String,
  updated_at: String,
});

const Timeline = mongoose.model('Timelines', timelineSchema);

exports.search = (req, res) => {
  const term = new RegExp(req.params.term, 'i');
  Product.find({ name: term })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};

exports.randomSale = (req, res) => {
  const rand = Math.floor(Math.random() * 638);
  Sales.findOne().skip(rand)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};
