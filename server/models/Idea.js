import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const ideaSchema = new Schema({
  title: { type: String, required: true },
  category: String,
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now  },
  _creator: { type: Schema.ObjectId, ref: 'User' },
  _comments: [{ type: Schema.ObjectId, ref:'Comment' }],
  _pledges: [{ type: Schema.ObjectId, ref:'Pledge' }],
  _projects: [{ type: Schema.ObjectId, ref:'Project' }],
});

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
