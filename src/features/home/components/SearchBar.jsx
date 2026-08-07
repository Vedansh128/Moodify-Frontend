import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSong } from "../hooks/useSong.js";
import "./searchbar.scss";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const { handleSearch } = useSong();

  async function submit(e) {

    e.preventDefault();

    if (!query.trim()) return;

    await handleSearch(query);

    setQuery("");

}

    return (
        <form
            className="search-bar"
            onSubmit={submit}
        >
            <FaSearch className="search-icon" />

            <input
                type="text"
                placeholder="Search songs, artists or playlists..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
}