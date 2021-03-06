// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable';
import fs from 'fs';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  console.log('in upload!!!');
  const form =  formidable();
  form.uploadDir = './';
  form.multiples = true;
  form.keepExtensions = true;
  const files = [];

  // form.on('field', function (field, value) {});
  form.on('file', function (field, file) {
    files.push(file);
  });
  form.on('end', function () {
    const path = files[0].filepath;
    const image = fs.readFileSync(path);
    console.log(image);
  });

  form.parse(req);
};
