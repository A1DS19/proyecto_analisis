const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploadImages = function (images) {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      images,
      (result) => {
        resolve({
          url: result.url,
        });
      },
      {
        resource_type: 'auto',
        folder: 'DRAGON_ROJO',
      }
    );
  });
};

module.exports.deleteImage = async function (public_id) {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (err) {
    return false;
  }
};
