const dbService = {
  create: (model, data) => {
    return model.create(data)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  updateOne: (model, filter, data, options = { new: true }) => {
    return model.findOneAndUpdate(filter, data, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  deleteOne: (model, filter, options = { new: true }) => {
    return model.findOneAndDelete(filter, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  updateMany: (model, filter, data) => {
    return model.updateMany(filter, data)
      .then((result) => result.modifiedCount)
      .catch((error) => {
        throw error;
      });
  },

  deleteMany: (model, filter) => {
    return model.deleteMany(filter)
      .then((result) => result.deletedCount)
      .catch((error) => {
        throw error;
      });
  },

  findOne: (model, filter, options = {}) => {
    return model.findOne(filter, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },

  findMany: (model, filter, options = {}) => {
    return model.find(filter, options)
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

  paginate: (model, filter, options) => {
    return model.paginate(filter, options)
      .then((result) => result)
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = dbService;
