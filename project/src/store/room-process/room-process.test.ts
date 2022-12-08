import { roomProcess, setActiveRoomId, setCurrentSortOption, setSelectedCity } from './room-process';

describe('Reducer: roomProcess', () => {

  it('without additional parameters should return initial state', () => {
    expect(roomProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({currentCity: 'Paris', currentSortOption: 'Popular', activeRoomId: null});
  });

  it('should set current city by a given value', () => {
    const state = {currentCity: 'Paris', currentSortOption: 'Popular', activeRoomId: null};
    expect(roomProcess.reducer(state, setSelectedCity('Amsterdam')))
      .toEqual({currentCity: 'Amsterdam', currentSortOption: 'Popular', activeRoomId: null});
  });

  it('should set active room id by a given value', () => {
    const state = {currentCity: 'Paris', currentSortOption: 'Popular', activeRoomId: null};
    expect(roomProcess.reducer(state, setActiveRoomId(19)))
      .toEqual({currentCity: 'Paris', currentSortOption: 'Popular', activeRoomId: 19});
  });

  it('should set current sort option by a given value', () => {
    const state = {currentCity: 'Paris', currentSortOption: 'Popular', activeRoomId: null};
    expect(roomProcess.reducer(state, setCurrentSortOption('Top rated first')))
      .toEqual({currentCity: 'Paris', currentSortOption: 'Top rated first', activeRoomId: null});
  });

});
