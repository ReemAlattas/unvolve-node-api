import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const projectSchema = new Schema({
  name: { type: String, required: true },
  text: String,
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

projectSchema.pre('find', autoPopulateCreator);

const Project = mongoose.model('Project', projectSchema);
export default Project;
