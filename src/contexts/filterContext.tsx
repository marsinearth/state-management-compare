import {ImmerHook, useImmer} from 'use-immer';
import React, {FC, createContext} from 'react';

export enum FilterEnum {
  SHOW_ALL = 'show_all',
  SHOW_COMPLETED = 'show_completed',
  SHOW_ACTIVE = 'show_active',
}

export const FILTER_TITLES = {
  [FilterEnum.SHOW_ALL]: 'All',
  [FilterEnum.SHOW_ACTIVE]: 'Active',
  [FilterEnum.SHOW_COMPLETED]: 'Completed',
};

type FilterState = {
  filter: FilterEnum;
  title: typeof FILTER_TITLES[FilterEnum];
};

type FilterContextState = ImmerHook<FilterState>;

export const FilterContext = createContext<FilterContextState>([
  {
    filter: FilterEnum.SHOW_ALL,
    title: FILTER_TITLES[FilterEnum.SHOW_ALL],
  },
  () => {},
]);

export const FilterProvider: FC = ({children}) => {
  const [filterState, setFilter] = useImmer<FilterState>({
    filter: FilterEnum.SHOW_ALL,
    title: FILTER_TITLES[FilterEnum.SHOW_ALL],
  });

  return (
    <FilterContext.Provider value={[filterState, setFilter]}>
      {children}
    </FilterContext.Provider>
  );
};
