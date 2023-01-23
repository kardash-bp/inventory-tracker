import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { TProduct } from '../../redux/features/types'
import ProductsTable from './ProductsTable'
import './ProductPagination.scss'
const ProductsPagination = ({
  items,
  itemsPerPage,
}: {
  items: TProduct[]
  itemsPerPage: number
}) => {
  const [itemOffset, setItemOffset] = useState(0)

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * itemsPerPage) % items.length
    console.log(
      `User requested page number ${selected}, which is offset ${newOffset}`
    )
    setItemOffset(newOffset)
  }

  return (
    <>
      <ProductsTable products={currentItems} />

      <ReactPaginate
        activeClassName={'item active-page '}
        // breakClassName={'item break-me '}
        breakLabel='...'
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={'item next '}
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={5}
        previousClassName={'item previous'}
        previousLabel='< previous'
      />
    </>
  )
}

export default ProductsPagination
