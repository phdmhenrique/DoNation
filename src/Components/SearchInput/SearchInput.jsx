import { TabSearch } from './SearchInput.js';

import SearchIcon from '../../Icons/SearchIcon.jsx';

export default function SearchInput() {
    return (
        <TabSearch>
            <input placeholder="Procurar" />
            <SearchIcon />
        </TabSearch>
    )
}
