const mongoose = require('mongoose');

const orderScheema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  product: {
    type: String,
    required: true,
    enum: ['Teclado', 'Mouse', 'Monitor', 'Impressora', 'Notebook', 'Celular', 'Tablet', 'Otros']
  },
    description: {
      type: String,
      required: [true, 'Debe agregar una descripcion'],
    },
    nro_orden: {
      type: String,
      required: [true, 'Agregue el numero de orden'],
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', orderScheema);