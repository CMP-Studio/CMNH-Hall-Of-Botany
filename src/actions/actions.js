/*
 * action types
 */

export const SWITCH_CONTEXT = 'SWITCH_CONTEXT'

/*
 * action creators
 */

export function switchContext(index) {
  return { type: SWITCH_CONTEXT, index: index }
}
