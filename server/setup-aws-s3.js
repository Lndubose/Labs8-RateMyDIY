const path = require( 'path' );
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  // your SECRET ACCESS KEY from AWS should go here
  secretAccessKey: process.env.AWS_SECRET_KEY,

  // not working key, your ACCESS KEY ID from AWS should go here
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'us-east-1' // region of your bucket
});

// sets new instance of aws s3
const s3 = new aws.S3();

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

    key: function (req, file, cb) {
			cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    },
    
    // tell browsers and CDNs to cache the file for one year
    cacheControl: 'max-age=31536000',
    
    // metadata stored on asw s3
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    // what to call file on AWS server
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
    
    // automatically select the content type by file's input
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),

  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB

	fileFilter: function( req, file, cb ){
    checkFileType( file, cb );
  }

})

function checkFileType( file, cb ){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
  
  // define ext
	const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  
  // define mime
  const mimetype = filetypes.test( file.mimetype );
  
  // check if ext/mime are allowed
	if( mimetype && extname ){
		return cb( null, true );
	} else {
		cb( 'Error: Images Only!' );
	}
}

module.exports = upload;