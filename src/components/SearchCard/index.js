import React from 'react';

const SearchCard = ({address, id, name, items, pincode, onSelectItem, isHighlighted}) => {
  return (
    <li
      className={`list-group-item ${isHighlighted ? "active highlighted" : ""}`}
      onClick={onSelectItem}
    >
      <div className='row'>
        <div className='col text-left'>
        <p className='mb-0 font-weight-boldline-height-1'>
            {id}
          </p>
          <p className='mb-0 font-weight-boldline-height-1'>
            {name}
          </p>
          <p className='mb-0 font-weight-boldline-height-1'>
            {address}
          </p>
          <p className='mb-0 font-weight-boldline-height-1'>
            {pincode}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SearchCard;