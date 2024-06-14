import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label>Search Contacts</label>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;

