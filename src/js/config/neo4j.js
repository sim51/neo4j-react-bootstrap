import Log from "~/services/log";

// Logger
const log = new Log("Config");

/**
* Configuration object for the Neo4j
*/
const configNeo4j = {
  login: 'neo4j',
  password: 'admin',
  url: 'bolt://localhost'
}

export default configNeo4j;
