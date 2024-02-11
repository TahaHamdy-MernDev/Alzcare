const cloudinary = require('cloudinary').v2; 
const fs = require("fs");
const path = require("path"); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 * Asynchronously uploads a file to Cloudinary.
 *
 * @async
 * @param {string} file - The path to the file to be uploaded.
 * @returns {Promise<Object>} The result of the upload operation.
 * @throws {Error} If an error occurs during the upload operation.
 */
const uploadFile = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, { resource_type: "auto" });
    console.log('File uploaded successfully:', result);
    fs.unlinkSync(file);
    return result;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};

/**
 * Deletes a file from Cloudinary.
 *
 * @async
 * @param {string} publicId - The public ID of the file to delete.
 * @returns {Promise<object>} The result of the deletion operation.
 * @throws {Error} If an error occurs during deletion.
 */
const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('File deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};

/**
 * Asynchronously uploads a file and sets the URL and public ID in the request body.
 *
 * @async
 * @function uploadAndSet
 * @param {Object} req - The request object, which should contain the files to be uploaded.
 * @param {string} type - The type of file to be uploaded.
 * @returns {Promise<void>} A Promise that resolves when the file has been uploaded and the request body has been updated.
 */
const uploadAndSet = async (req, type) => {
  if (req.files[type]) {
    const filePath = path.join(__dirname, `../uploads/${req.files[type][0].filename}`);
    const result = await uploadFile(filePath);
    req.body[type] = {
      url: result.secure_url,
      publicId: result.public_id,
    };
    fs.unlinkSync(filePath);
  }
};

/**
 * Deletes old files from Cloudinary.
 *
 * @async
 * @function deleteOldFiles
 * @param {Object} doc - The document object that contains the file information.
 * @param {string} type - The type of the file to be deleted.
 * @throws Will throw an error if the deletion process fails.
 */
const deleteOldFiles = async (doc, type) => {
  if (doc[type] && doc[type].publicId) {
    try {
      await deleteFile(doc[type].publicId);
      console.log(`Deleted old ${type} from Cloudinary`);
    } catch (error) {
      console.error(`Failed to delete old ${type} from Cloudinary`, error);
      throw new Error("Internal Server Error (cloudinary)");
    }
  }
};


/**
 * Updates the files based on the request, document and type provided.
 * If the document of the specified type has a publicId, it destroys the existing file in cloudinary.
 * Then it uploads the new file and updates the request body with the new file's url and publicId.
 *
 * @async
 * @param {Object} req - The request object, expected to contain the files in the files property.
 * @param {Object} doc - The document object, expected to contain the file details.
 * @param {string} type - The type of the file to be updated.
 * @throws {Error} If there is an error in file upload or deletion.
 */
const updateFiles = async (req, doc, type) => {
  if (req.files[type]) {
    const filePath = path.join(__dirname, `../uploads/${req.files[type][0].filename}`);
    if (doc[type] && doc[type].publicId) {
      await cloudinary.uploader.destroy(doc[type].publicId);
    }
    const result = await uploadFile(filePath);
    req.body[type] = {
      url: result.secure_url,
      publicId: result.public_id,
    };
    fs.unlinkSync(filePath);
  }
};

const deleteManyFiles=async(doc,types) =>{
  let publicIds = [];

  for (let type of types) {
      if (doc[type] && doc[type].publicId) {
          publicIds.push(doc[type].publicId);
      }
  }
try {
  console.log(publicIds);
   const result = await cloudinary.api.delete_resources(publicIds);
  return result;
} catch (error) {
  console.error(`Failed to delete old ${types} from Cloudinary`, error);
  throw new Error("Internal Server Error (cloudinary)");
}
 
}

module.exports = {
  uploadFile, 
  deleteFile, 
  deleteManyFiles,
  uploadAndSet, 
  deleteOldFiles,
  updateFiles
}
