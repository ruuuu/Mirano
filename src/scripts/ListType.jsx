
export const ListType = (categories) => (  //  как в реакте jsx,  categories-массив

  <ul class="filter__type-list">
    { categories.map((category) => (
        <li class="filter__type-item">
          <button class="filter__type-btn" type="button"> {category} </button>
        </li>
      ))
    }
  </ul>
);

