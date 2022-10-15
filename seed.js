require('dotenv').config()
require('./config/database')

const Chord = require('./models/chord')

;(async function () {
  await Chord.deleteMany({})
  const chords = await Chord.create([
    {
      name: 'A Major',
      chordImage: 'Screen Shot 2022-10-15 at 10.46.19 AM.png',
      learned: false
    }
  ])

  process.exit()
})()


<ul className='CategoryList'>{chordList}</ul>
<div>
  {/* {temp.current.map(imageId => {
    console.log('this is imageIDdd', imageId)
    var li = document.getElementById(imageId)
    console.log('this is li')

    return <img src={`/images/${imageId}`} />
  })} */}
  {/* <img src='/images/31f7b7f02a951db2cce0818a87cb2f01' /> */}
</div>
{/* <img src='/images/Screen Shot 2022-10-15 at 10.46.19 AM.png' /> */}