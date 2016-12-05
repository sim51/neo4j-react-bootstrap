const configMovie = {
	searchQuery: 'MATCH (m:Movie) WHERE m.title CONTAINS {search} RETURN m.title AS Title, id(m) AS _id',
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
	  	"type": "object",
	  	"properties": {
	  		search: {
	  			"ui:widget": {
				    options: {
				      query: "MATCH (m:Movie) WHERE m.title STARTS WITH {value} RETURN m.title AS value LIMIT 10"
				    },
				    component: "textCypherComplete"
				}
	  		}
		}
	},
  detailGraphQuery : "MATCH p=(m:Movie)--(n) WHERE id(m)={id} RETURN p",
  detailViewQuery : "MATCH (m:Movie) WHERE id(m)={id} RETURN m.title AS title"
}

export default configMovie;
