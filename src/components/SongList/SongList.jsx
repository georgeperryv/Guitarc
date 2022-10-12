export default function SongList ({
  songs,
  activeSong,
  setActiveSong,
  setMakeUniqueSongMessage
}) {
  console.log('this is the songs array sent', songs)
  const songList = songs.map(s => (
    <li
      key={s}
      className={s === activeSong ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      onClick={() => {
        setActiveSong(s)
        setMakeUniqueSongMessage('')
      }}
    >
      {s}
    </li>
  ))
  return <ul className='CategoryList'>{songList}</ul>
}
