// for uploading files to Amazon AWS S3
import { S3 } from 'aws-sdk';
import { NotImplementedError } from './error';
require('dotenv').config();


const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3Upload = (key, body) => {
  s3.upload(
    {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: body,
      ACL: 'public-read',
    },
    (s3Err, s3Res) => {
      if (s3Err) {
        console.log('Error while uploading!', s3Err);
      }
      return {
        s3Err,
        s3Res,
      }
    }
  );
};

const uuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  const uuidStr = `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  return uuidStr;
};

const deleteFile = filePath => {
  // delete file at given path
  throw NotImplementedError('deleteFile is not implemented.');
}

modules.export = {
  s3Upload,
  uuid,
  deleteFile,
};