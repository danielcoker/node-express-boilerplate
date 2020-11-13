import { Schema } from 'mongoose';

// User schema definition.
const schema = new Schema(
  {
    name: { $type: String, required: true },
    email: { $type: String, unique: true, required: true },
    password: { $type: String },
  },
  {
    typeKey: '$type', // So that we can use fields named `type`.
  },
);

export default schema;
