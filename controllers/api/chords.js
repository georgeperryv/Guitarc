const Song = require('../../models/chord')
const { uploadFile } = require('../../s3')

async function addChord (req, res) {
  const file = req.file
  console.log(file)
  const result = await uploadFile(file)
  console.log('result', result)
  const description = req.body.description
  res.send('nice')
}

module.exports = {
  addChord
}
