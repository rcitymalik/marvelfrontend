export const selectAllCharacters = (reduxState) => reduxState.allCharacters.characters;
export const selectCharacterById = (reduxState) => reduxState.allCharacters.characterDetails;
export const selectShowModal = (reduxState) => reduxState.allCharacters.showModal;
export const selectCharacterForModal = (reduxState) => reduxState.allCharacters.modalCharacter;
export const selectSearchBar = (reduxState)=> reduxState.allCharacters.searchBar;
export const selectShowOffCanvasSearch = (reduxState)=> reduxState.allCharacters.OffCanvasSearchBar;
export const selectTeam = (reduxState)=> reduxState.allCharacters.team;
export const selectTeamCharacters = (reduxState) => reduxState.allCharacters.teamCharacters;
export const selectCharacterGifs = (reduxState) => reduxState.allCharacters.oneCharacterGifs;
