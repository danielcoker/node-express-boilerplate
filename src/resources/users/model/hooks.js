import baseModel from '../../../libs/baseModel';
import { bcryptHash } from '../../../libs/password';
import schema from './schema';

schema.plugin(baseModel, {
  private: ['password', 'createdAt', 'updatedAt'],
  timestamp: true,
});

schema.pre('save', function preSaveUser(next) {
  if (this.isModified('password')) this.password = bcryptHash(this.password);
  next();
});
