
import { CHECK_ITEM } from '../actions/actions';

const initalState = [
    {title: 'test', checked: false},
    {title: 'test 2', checked: true},
  ];

export default function rows(state = initalState, action:number) {
  switch (action.type) {
    case CHECK_ITEM:
      const index = action.index;
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          checked: !state[index].checked
        }),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
}
