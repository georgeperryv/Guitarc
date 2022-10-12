import './CategoryList.css'

export default function CategoryList ({
  categories,
  activeCat,
  setActiveCat,
  setMakeUniqueCatMessage,
  setMakeUniqueSongMessage
}) {
  // const cats = categories.map(cat => <li> hello </li>)

  // return <ul>{cats}</ul>

  // const items = menuItems.map(item =>
  //     <MenuListItem
  //       key={item._id}
  //       menuItem={item}
  //       handleAddToOrder={handleAddToOrder}
  //     />

  //   <form autoComplete='off' onSubmit={handleAddCollection}>
  //           <label>Add Category</label>
  //           <input
  //             type='text'
  //             name='category'
  //             value={category.category}
  //             onChange={handleChange}
  //             required
  //           />
  //           <button type='submit'>Submit</button>
  //         </form>
  //   const cats = categories.map(cat => (
  //     <li
  //       key={cat}
  //       className={cat === activeCat ? 'active' : ''}
  //       // FYI, the below will also work, but will give a warning
  //       // className={cat === activeCat && 'active'}
  //       onClick={() => setActiveCat(cat)}
  //     >
  //       {cat}
  //     </li>
  //   ))
  //   return <ul className='CategoryList'>{cats}</ul>
  // }
  console.log('categories inside categorylist', categories)
  const cats = categories.map(cat => (
    <li
      key={cat}
      className={cat === activeCat ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      onClick={() => {
        setActiveCat(cat)
        setMakeUniqueCatMessage('')
        setMakeUniqueSongMessage('')
      }}
    >
      {cat}
    </li>
  ))
  return <ul className='CategoryList'>{cats}</ul>
}
