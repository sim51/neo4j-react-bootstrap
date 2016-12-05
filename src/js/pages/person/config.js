const configPerson = {
	searchQuery: 'MATCH (p:Person) WHERE p.name CONTAINS {search} RETURN p.name AS Name, id(p) AS _id',
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
	  	"type": "object",
	  	"properties": {
	  		search: {
	  			"ui:widget": {
				    options: {
				      query: "MATCH (p:Person) WHERE p.name CONTAINS {value} RETURN p.name AS value LIMIT 10"
				    },
				    component: "textCypherComplete"
				}
	  		}
		}
	},
  detailGraphQuery : "MATCH p=(n:Person)--(m) WHERE id(n)={id} RETURN p",
  detailViewQuery : "MATCH (p:Person) WHERE id(p)={id} RETURN p.name AS Name"
}

export default configPerson;
