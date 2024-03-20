/**
 * @module dbService
 */
const dbService = {
  /**
  * @function create
  * @param {Object} model - The model to create
  * @param {Object} data - The data to create with
  * @returns {Promise} - Promise representing the created model
  */
  create: (model, data) => {
    return model.create(data)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  /**
     * @function updateOne
     * @param {Object} model - The model to update
     * @param {Object} filter - The filter to apply
     * @param {Object} data - The data to update with
     * @param {Object} [options={ new: true }] - The options to apply
     * @returns {Promise} - Promise representing the updated model
     */
  updateOne: (model, filter, data, options = { new: true }) => {
    return model.findOneAndUpdate(filter, data, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  /**
   * Deletes a single document based on the filter provided.
   *
   * @param {Object} model - The mongoose model on which the operation is to be performed.
   * @param {Object} filter - The conditions for deletion.
   * @param {Object} [options={ new: true }] - Options for the delete operation. By default, it returns the deleted document.
   * @returns {Promise<Object>} - Returns a promise that resolves with the deleted document if found, otherwise null.
   * @throws {Error} - If an error occurs during the operation.
   */
  deleteOne: (model, filter, options = { new: true }) => {
    return model.findOneAndDelete(filter, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },


  /**
   * Updates multiple documents in the database that match the filter.
   *
   * @param {Object} model - The Mongoose model to use for the update.
   * @param {Object} filter - The filter criteria to match the documents to update.
   * @param {Object} data - The data to update the matching documents with.
   * @returns {Promise<number>} - A promise that resolves with the number of documents modified.
   * @throws {Error} - If an error occurs during the update operation.
   */
  updateMany: (model, filter, data) => {
    return model.updateMany(filter, data)
      .then((result) => result.modifiedCount)
      .catch((error) => {
        throw error;
      });
  },
  /**
   * Deletes many documents in the collection that match the filter.
   *
   * @param {Object} model - The model representing the collection in the database.
   * @param {Object} filter - The filter used to select the documents to delete.
   * @returns {Promise<number>} A promise that resolves with the number of documents deleted.
   * @throws {Error} If there is an error in the deletion process.
   */
  deleteMany: (model, filter) => {
    return model.deleteMany(filter)
      .then((result) => result.deletedCount)
      .catch((error) => {
        throw error;
      });
  },

  /**
 * Finds one document in the collection that matches the filter.
 *
 * @param {Object} model - The model representing the collection in the database.
 * @param {Object} filter - The filter used to select the document.
 * @param {Object} [options={}] - Optional settings.
 * @returns {Promise<Object>} A promise that resolves with the document found or null if no document is found.
 * @throws {Error} If there is an error in the find process.
 */
  findOne: (model, filter, options = {}) => {
    return model.findOne(filter, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  /**
 * Finds many documents in the collection that match the filter.
 *
 * @param {Object} model - The model representing the collection in the database.
 * @param {Object} filter - The filter used to select the documents.
 * @param {Object} [options={}] - Optional settings.
 * @returns {Promise<Array<Object>>} A promise that resolves with the documents found or an empty array if no documents are found.
 * @throws {Error} If there is an error in the find process.
 */
  findMany: (model, filter, options = {}) => {
    const sortOption = options.sort ? options.sort : {};
    return model.find(filter, null, options)
      .sort(sortOption) 
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  count: (model, filter) => {
    return model.countDocuments(filter)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },
  /**
   * Paginates a model based on the provided filter and options.
   *
   * @param {Object} model - The model to paginate.
   * @param {Object} filter - The filter criteria to apply.
   * @param {Object} options - The pagination options.
   * @returns {Promise} - Returns a Promise that resolves to the paginated result.
   * @throws {Error} - Throws an error if the pagination fails.
   */
  paginate: (model, filter, options) => {
    return model.paginate(filter, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

};

module.exports = dbService;
