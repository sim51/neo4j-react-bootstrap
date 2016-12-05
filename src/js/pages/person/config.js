const configPerson = {
  searchQuery: 'MATCH (p:Person) WHERE lower(p.name) CONTAINS lower({search}) RETURN p.name AS Name, id(p) AS _id',
  searchSchema: {
    "type": "object",
    "properties": {
      search: {
        "type": "string",
        "title": "Search person",
        default: ""
      }
    }
  },
  searchUi: {
    search: {
      "ui:widget": {
        options: {
          // the cypher query to make the autocompletion. It must return a `value` field
          query: "MATCH (p:Person) WHERE lower(p.name) CONTAINS lower({value}) RETURN p.name AS value LIMIT 10"
        },
        component: "textCypherComplete"
      }
    }
  },
  detailGraphQuery : "MATCH p=(n:Person)--(m) WHERE id(n)={id} RETURN p",
  detailViewQuery : "MATCH (p:Person) WHERE id(p)={id} RETURN p.name AS Name"
}

export default configPerson;
