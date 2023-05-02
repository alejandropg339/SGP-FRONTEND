import { SearchBarPropsInterface } from "../../interfaces/SearchBarProps.interface"

export const SearchBar = ({label, onInputChange}: SearchBarPropsInterface) => {
    return (
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1"><i className='bx bx-search' ></i></span>
            <input type="text" className="form-control" onChange={onInputChange} id="searchBar" placeholder={label}/>
        </div>
    )
}
