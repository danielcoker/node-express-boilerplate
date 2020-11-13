import mongoose from 'mongoose';
import schema from './schema';

import './hooks';

export { schema };

export const model = mongoose.model('User', schema);
