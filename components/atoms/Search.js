import React from "react";

export default function Search({ data, onSelectItem, isActive }) {
  return (
    <li
      className={`search__result--wrapper--list ${isActive ? "active" : ""}`}
      onClick={onSelectItem}
    >
      <div className="d-flex align-items-center">
        <figure className="search__result--wrapper--list--image">
          <img
            src={
              data.image
                ? `http://localhost:3001/uploads/products/${data.image}`
                : "/assets/images/default.png"
            }
            alt="itemsproducts"
            className="rounded-circle"
          />
        </figure>

        <h6>{data.name}</h6>
      </div>
    </li>
  );
}
