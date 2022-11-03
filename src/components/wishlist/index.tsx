import React from 'react'

interface Props {
  defaultList: Wishlist
  wishlists: Wishlist[]
}

function Wishlist(_props: Props) {
  return (
    <div className="whishList flex-1 justify-center font-primary bg-gray-50 h-screen">
      <div className="card sm:w-{967} sm:h-{715} border border-gray-100">
        <div className="flex  ml-5">
          <button className="mt-6 sm:hidden text-vivaraDark">X</button>
          <h2 className="sm:ml-28 ml-2 mt-6">Meus favoritos</h2>
          <p />
        </div>
        <div className="flex flex-col gap-y-4 mt-6 mx-7 bg-white shadow-md">
          <div className="topImage flex justify-center" />
          <div className="flex justify-evenly mb-5" />
        </div>
      </div>
    </div>
  )
}

export default Wishlist
