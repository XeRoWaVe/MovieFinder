import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        shows: [],
        selectedFilters: [],
        search: ''
    },
    reducer: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setShows: (state, action) => {
            state.shows = action.payload;
        },
        setSelectedFilters: (state, action) => {
            state.selectedFilters = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
})

export const { setMovies, setShows, setSelectedFilters, setSearch } = moviesSlice.actions;

export default moviesSlice.reducer;