const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order'
    },
    text: {
      type: String,
      required: [true, 'Debe agregar un texto a la nota']
    },
    isStaff: {
      type: Boolean,
      default: false
    },
    staffId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Note', noteSchema);