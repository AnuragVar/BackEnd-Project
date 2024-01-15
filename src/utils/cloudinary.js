//cloudinary is mostly used to put images,files etc
//it is nothing but wrapper on aws, but with many facilities that they provide
//we can use it as a middleware or utility depends on usecases
// In our case we will make a utility of it
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: "419929138347856",
  api_secret: "yMalaHoSyZolV0nCby5XY-lwHvg",
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;
  console.log(localFilePath);
  //upload the file on cloudinary
  try {
    const Response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", Response.url);
    fs.unlinkSync(localFilePath);
    return Response;
  } catch (error) {
    console.log("error happened", error);
    fs.unlinkSync(localFilePath);
    //remove the file that comes in our local storage, but failed in uploading
    return null;
  }
};

// const uploadOnCloudinary = (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     const Response = cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     console.log("connection occured!!", Response.url);
//     return Response;
//   } catch (error) {
//     console.log("error happened", error);
//     return null;
//   } finally {
//     fs.unlinkSync(localFilePath);
//   }
// };
export { uploadOnCloudinary };
