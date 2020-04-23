import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export enum FilterEnum {
  SHOW_ALL = 'show_all',
  SHOW_ACTIVE = 'show_active',
  SHOW_COMPLETED = 'show_completed',
}

export const FILTER_TITLES = {
  [FilterEnum.SHOW_ALL]: 'All',
  [FilterEnum.SHOW_ACTIVE]: 'Active',
  [FilterEnum.SHOW_COMPLETED]: 'Completed',
};

export type FilterState = typeof initialState;

const initialState = {
  name: FilterEnum.SHOW_ALL,
  title: FILTER_TITLES[FilterEnum.SHOW_ALL],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterEnum>) => {
      const filter = action.payload;
      state.name = filter;
      state.title = FILTER_TITLES[filter];
    },
  },
});

export const {setFilter} = filterSlice.actions;

export default filterSlice.reducer;
