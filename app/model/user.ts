
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, unique: true },
    password: { type: String, required: true },
  });

  return mongoose.model('User', UserSchema);
}
