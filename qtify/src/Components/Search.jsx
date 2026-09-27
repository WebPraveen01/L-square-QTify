import React, { useMemo, useState } from "react";
import styles from "./Search.module.css";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const truncate = (value, maxLength) => {
  if (!value) return "";
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
};

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

function Search({ searchData = [], placeholder = "Search an album of your choice" }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const options = useMemo(() => {
    const uniqueAlbums = new Map();

    (searchData || []).forEach((album) => {
      if (album?.slug && !uniqueAlbums.has(album.slug)) {
        uniqueAlbums.set(album.slug, album);
      }
    });

    return Array.from(uniqueAlbums.values());
  }, [searchData]);

  const filteredOptions = useMemo(() => {
    const query = inputValue.trim().toLowerCase();
    if (!query) return options.slice(0, 8);

    return options.filter((album) => {
      const title = (album?.title || "").toLowerCase();
      const artistNames = (album?.songs || [])
        .flatMap((song) => Array.isArray(song?.artists) ? song.artists : [song?.artists])
        .filter(Boolean)
        .map((artist) => (typeof artist === "string" ? artist : artist?.name || ""))
        .filter(Boolean)
        .map((artist) => artist.toLowerCase());

      const artistMatch = artistNames.some((artist) => artist.includes(query));
      const titleMatch = title.includes(query);

      return titleMatch || artistMatch;
    }).slice(0, 8);
  }, [inputValue, options]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const targetAlbum = selectedAlbum || filteredOptions[0] || null;

    if (!targetAlbum?.slug) {
      return;
    }

    navigate(`/album/${targetAlbum.slug}`);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <Autocomplete
        freeSolo
        options={filteredOptions}
        inputValue={inputValue}
        value={selectedAlbum}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        onChange={(_, newValue) => setSelectedAlbum(newValue)}
        getOptionLabel={(option) => typeof option === "string" ? option : option?.title || ""}
        isOptionEqualToValue={(option, value) => option?.slug === value?.slug}
        filterOptions={(opts) => opts}
        noOptionsText="No albums found"
        renderOption={(props, option) => {
          const artists = (option?.songs || [])
            .flatMap((song) => Array.isArray(song?.artists) ? song.artists : [song?.artists])
            .filter(Boolean)
            .map((artist) => (typeof artist === "string" ? artist : artist?.name || ""))
            .filter(Boolean);

          return (
            <li {...props} key={option.slug || option.title} className={styles.listElement}>
              <div>
                <p className={styles.albumTitle}>{option.title}</p>
                <p className={styles.albumArtists}>
                  {truncate(artists.join(", "), 40) || "Unknown artist"}
                </p>
              </div>
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            sx={{
              width: 420,
              backgroundColor: "#fff",
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                height: 48,
                borderRadius: 1,
                paddingRight: 0,
              },
              '& input': {
                color: "#000",
                fontSize: "14px",
                padding: "10px 14px",
              },
              '& fieldset': {
                borderColor: "#000",
              },
            }}
          />
        )}
      />

      <button className={styles.searchButton} type="submit" aria-label="Search albums">
        <SearchIcon />
      </button>
    </form>
  );
}

export default Search;
