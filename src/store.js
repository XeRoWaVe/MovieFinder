import { configureStore } from "@reduxjs/toolkit";
import moviesSliceReducer from "./state/MoviesSlice";
import filtersSliceReducer from "./state/FiltersSlice";

const store= configureStore({
    reducer: {
        movies: moviesSliceReducer,
        filters: filtersSliceReducer
    }
})

export default store