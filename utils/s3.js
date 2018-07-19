require('dotenv').config();

const request = require('request');
const aws = require('aws-sdk');
const isDebug = process.env.NODE_ENV !== 'production';
const albumBucketName = isDebug ? 'sportsnucleus-test' : 'sportsnucleus';
const bucketRegion = 'us-west-2';
const cdnPath = `https://s3-us-west-2.amazonaws.com/${albumBucketName}`;
const { sendErrorEmail } = require('./../utils/email');

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
          if (!isDebug) {
            const errorText = `Image request error for ${imgPath}: ${JSON.stringify(
              err
            )} ${JSON.stringify(err.stack)}}`;

            sendErrorEmail(errorText);
          }

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
            if (err) {
              if (!isDebug) {
                const errorText = `Add image error for ${imgPath}: ${JSON.stringify(
                  err
                )} ${JSON.stringify(err.stack)}}`;

                sendErrorEmail(errorText);
              }

              return reject(err);
            }

            return resolve(`${cdnPath}/${key}`);
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
          const errorText = `Delete image error for ${imgPath}: ${JSON.stringify(
            err
          )} ${JSON.stringify(err.stack)}}`;

          sendErrorEmail(errorText);
        }

        return reject(err);
      }

      return resolve(data);
    });
  });
};

module.exports = { deleteFromS3, uploadToS3 };
