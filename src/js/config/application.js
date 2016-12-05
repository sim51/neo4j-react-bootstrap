/**
* Configuration object for the application
*/
const configApplication = {
  // Name of the application that will be display into the title tag
  name: "Neo4j movie application",
  // Path to the logo of the application
  logo: './assets/logo.png',
  // Logger level. Available values are Error, Warning, Info, Debug
  logLevel: 'Debug',
  // A regex to filter log based on the name of the logger
  logPattern: '.*',
  // Not used for now, but it's the size of the baobab history size . Will be used for undo actions.
  baobabHistorySize: 0,
  // Set the persistance mode of the application state.
  // Available values are :
  //  Off : state is not persisted
  //  LocalStorage :  state is persisted in the local storage of your browser
  //  Url : state is persisted in the url as a serialized JSON
  persistance: 'Off'
}

export default configApplication;
