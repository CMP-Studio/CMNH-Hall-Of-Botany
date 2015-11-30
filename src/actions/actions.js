/*
 * action types
 */

export const CHECK_ITEM = 'CHECK_ITEM'

/*
 * action creators
 */

export function checkItem(index) {
  return { type: CHECK_ITEM, index: index }
}
