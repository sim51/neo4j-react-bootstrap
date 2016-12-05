const configMovie = {
  searchQuery: 'MATCH (m:Movie) WHERE lower(m.title) CONTAINS lower({search}) RETURN m.title AS Title, id(m) AS _id',
  searchSchema: {
    "type": "object",
    "properties": {
      search: {
        "type": "string",
        "title": "Search movie",
        default: ""
      }
    }
  },
  searchUi: {
    search: {
      "ui:widget": {
        options: {
          query: "MATCH (m:Movie) WHERE lower(m.title) CONTAINS lower({value}) RETURN m.title AS value LIMIT 10"
        },
        component: "textCypherComplete"
      }
    }
  },
  detailGraphQuery : "MATCH p=(m:Movie)--(n) WHERE id(m)={id} RETURN p",
  detailViewQuery : "MATCH (m:Movie) WHERE id(m)={id} RETURN m.title AS title"
}

export default configMovie;
