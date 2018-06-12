require('dotenv').config();

const request = require('request');
const aws = require('aws-sdk');
const isDebug = process.env.NODE_ENV !== 'production';
const albumBucketName = isDebug ? 'sportsnucleus-test' : 'sportsnucleus';
const bucketRegion = 'us-west-2';
const cdnPath = `https://s3-us-west-2.amazonaws.com/${albumBucketName}`;

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: bucketRegion
});

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: albumBucketName }
});

const uploadToS3 = (imgPath, subfolder, filename) => {
  return new Promise((resolve, reject) => {
    const key = `${subfolder}/${filename}`;

    request(
      {
        url: imgPath,
        encoding: null
      },
      (err, res, body) => {
        if (err) {
          console.log(('saving image err', err));
          return reject(err);
        }

        s3.putObject(
          {
            Key: key,
            ContentType: res.headers['content-type'],
            ContentLength: res.headers['content-length'],
            Body: body
          },
          (err, res) => {
            if (err) reject(err);

            resolve(`${cdnPath}/${key}`);
          }
        );
      }
    );
  });
};

const deleteFromS3 = imgPath => {
  return new Promise((resolve, reject) => {
    const filename = imgPath.replace(cdnPath, '').replace('/', '');

    const params = {
      Bucket: albumBucketName,
      Key: filename
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        if (!isDebug) {
          var errorText = `Delete image error for ${imgPath}: ${JSON.stringify(
            err
          )} ${JSON.stringify(err.stack)}}`;

          return console.log(errorText);
        }

        return reject(err);
      }

      return resolve(data);
    });
  });
};

// const deleteS3Bucket = () => {
//   const params = { Bucket: albumBucketName };

//   s3.deleteBucket(params, (err, data) => {
//     if (err) {
//       console.log(err, err.stack);
//     } else {
//       console.log(data);
//     }
//   });
// };

module.exports = { deleteFromS3, uploadToS3 };
