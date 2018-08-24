const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NormalizeIterationSchema = new Schema({
  initialString: {
    type: String,
    required: true
  },
  normalizedString: {
    type: String,
    required: true
  },
  iteration: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const NormalizeIterations = mongoose.model('NormalizeIteration', NormalizeIterationSchema);

module.exports = NormalizeIterations;

