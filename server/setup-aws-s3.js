
const aws = require('aws-sdk');

aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: process.env.AWS_SECRET_KEY,
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1', // region of your bucket
  signatureVersion: 'v4'
});
// sets new instance of aws s3
const s3 = new aws.S3();

const multer = require('multer');
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    // allows for new instances of s3 created from above
    s3: s3,
    // name of bucket on aws s3
    bucket: 'ratemydiy',
    // access control for the file (‘public read’ means that anyone can view files)
    // you can check all the available types here:
    // https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl 
    acl: 'public-read',
    // key: function (req, file, cb) {
		// 	cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		// },
    // metadata stored on asw s3
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    // key: function (req, file, cb) {
    //   // What to call file on AWS server
    //   cb(null, Date.now().toString())
    // }
    key: function (req, file, cb) {
      // What to call file on AWS server
      cb(null, file.originalname);
    }
  })
});

const download = (prefix, callback) => {
  let params = {
    Bucket: 'ratemydiyresized',
    Prefix: `${prefix}`
  }

  s3.listObjectVersions(params, function(err, data) {
    if (err) {
      console.log('VERSIONS ERROR', err, err.stack);
      return err;
    } else {
      console.log('VERSIONS DATA', data);
      let latestData = data.Versions[Array.length-1];
      let latestVersion = {
        key: latestData.Key,
        version: latestData.VersionId
      };
      console.log('LATEST VERSION', latestVersion);
      callback(err, `https://s3.us-east-2.amazonaws.com/${params.Bucket}/${latestVersion.key}?versionId=${latestVersion.version}`);
      // delete params.Prefix;
      // params.Key = latestVersion.key;
      // console.log('PARAMS', params);
      // s3.getSignedUrl('getObject', params, function(err, data) {
      //   if (err) {
      //     console.log('URL ERROR', err, err.stack);
      //     return err;
      //   } else {
      //     console.log('URL DATA', data);
      //     callback(err, data);
      //   }
      // });
    }
  });
}

module.exports = {
  upload,
  download
};