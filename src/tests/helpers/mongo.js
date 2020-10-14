import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * Reset the test database.
 * @returns {Promise} Returns a promise.
 */
export const resetDB = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    mongoose.connection.dropDatabase((dbErr) => {
      if (dbErr) return reject(dbErr);

      resolve();
    });
  });

/**
 * Update a document in the database.
 * @param {String} collectionName The collection name.
 * @param {Object} doc The document to update.
 * @param {Object} update Object containing the updated values.
 */
export const updateDocument = async (collectionName, doc, update) => {
  const collection = mongoose.connection.db.collection(collectionName);

  return new Promise((resolve) => {
    collection.updateOne({ _id: ObjectId(doc.id) }, { $set: update }, (updateErr) => {
      if (updateErr) throw new Error(`Error updating ${collectionName}: ${updateErr}`);
      resolve();
    });
  });
};

/**
 * Get a document from the database.
 * @param {String} collectionName The collection name.
 * @param {Object} doc The document to get.
 */
export const getDocument = async (collectionName, doc) => {
  const collection = mongoose.connection.db.collection(collectionName);

  return new Promise((resolve) => {
    collection.findOne({ _id: ObjectId(doc._id) }, (lookupErr, found) => {
      if (lookupErr) throw new Error(`Error looking up ${collectionName}: ${lookupErr}`);
      resolve(found);
    });
  });
};

before((done) => {
  mongoose.connection.on('open', (err) => {
    if (err) return done(err);

    return resetDB()
      .then(() => done())
      .catch(done);
  });
});

after((done) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  mongoose.connection.dropDatabase((err) => {
    if (err) return done(err);
    return mongoose.connection.close(done);
  }),
); // eslint-disable-line function-paren-newline
