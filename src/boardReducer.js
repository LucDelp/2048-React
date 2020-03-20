import { LEFT, RIGHT, UP, DOWN } from './boardAction'

export function boardReducer (state, action) {
  switch (action.type) {
    case LEFT:
      console.log('LEFT')
      return state
    case RIGHT:
      console.log('RIGHT')
      return state
    case UP:
      console.log('UP')
      return state
    case DOWN:
      console.log('DOWN')
      return state
    default:
      return state
  }
}
