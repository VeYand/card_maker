import { FilterType } from "../../../../types/types";

const SET_FILTER = "SET_FILTER";

interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: FilterType;
}

const setFilter = (payload: FilterType): SetFilterAction => ({
  type: SET_FILTER,
  payload,
});

const initialState: FilterType = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
};

type FilterAction = SetFilterAction;

const filterReducer = (
  state = initialState,
  action: FilterAction,
): FilterType => {
  switch (action.type) {
    case SET_FILTER:
      return {
        r: action.payload.r,
        g: action.payload.g,
        b: action.payload.b,
        a: action.payload.a,
      };
    default:
      return state;
  }
};

export { filterReducer, setFilter };
