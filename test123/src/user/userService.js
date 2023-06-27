const userModel = require('./userModel');

module.exports.getDataFromDBService = () => {
    return userModel.find({})
        .then(result => {
            return result;
        })
        .catch(error => {
            throw error;
        });
};
//
module.exports.createUserDBService = userDetails => {
    const userModelData = new userModel({
        name: userDetails.name,
        address: userDetails.address,
        phone: userDetails.phone,
        product: userDetails.product,
    });
    return userModelData.save()
        .then(result => {
            return true;
        })
        .catch(error => {
            throw error;
        });
};

module.exports.updateUserDBService = (id, userDetails) => {
    return userModel.findByIdAndUpdate(id, userDetails, { new: true })
        .then(result => {
            return result;
        })
        .catch(error => {
            throw error;
        });
};

module.exports.removeUserDBService = id => {
    return userModel.findByIdAndDelete(id)
        .then(result => {
            return result;
        })
        .catch(error => {
            throw error;
        });
};

module.exports.findUserByNameDBService = (id) => {
    return userModel.findOne({ id: id })
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      });
  };