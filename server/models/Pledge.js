import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const pledgeSchema = new Schema({
  amount: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now },
  _creator: { type: Schema.ObjectId, ref: 'User'},
  _idea: { type: Schema.ObjectId, ref: 'Post' }
});

const autoPopulateCreator = function(next) {
  this.populate({
    path: '_creator',
    select: 'username created -_id'
  });
  next();
};

pledgeSchema.pre('find', autoPopulateCreator);

const Pledge = mongoose.model('Pledge', pledgeSchema);
export default Pledge;
