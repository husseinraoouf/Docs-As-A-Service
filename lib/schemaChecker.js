const schemas = {
	tag: {
		"title": "tag",
	  "type": "object",
	  "properties": {
			"id": {
	      "type": ["string", "null"],
	  	},
	  	"keyword": {
	      "type": ["string", "null"]
	  	},
	  	"keywordkind": {
	      "type": ["string", "null"]
	  	},
      "language": {
        "type": ["string", "null"]
      },
	  	"status": {
	      "enum": [
          "working",
          "obsolete",
          "html5",
          "deprecated",
          "experimental",
          "not standardized",
	        null,
	      ]
	  	},
	  	"link": {
	      "type": ["string", "null"]
	  	},
	  	"difintion": {
	      "type": ["string", "null"]
	  	},
	  	"examples": {
	      "type": "array",
	      // A simple schema for the items in this array, only specifying type.
	      "items": {
	        "type": "object",
		      "properties": {
		        "title": {
		          "type": ["string", "null"]
		        },
		        "code": {
		          "type": ["string", "null"]
		        },
		        "note": {
		          "type": ["string", "null"]
		        },
		        "link": {
		          "type": ["string", "null"]
		        }
		      }
	      }
	  	},
	  	"attributes": {
	      "type": "array",
	      // A simple schema for the items in this array, only specifying type.
	      "items": {
	        "type": "object",
		      "properties": {
		        "name": {
		          "type": ["string", "null"]
		        },
		        "status": {
		          "enum": [
                "working",
				        "obsolete",
				        "html5",
				        "deprecated",
				        "experimental",
				        "not standardized",
				        null,
			      	]
		        },
		        "detail": {
		          "type": ["string", "null"]
		        },
		        "notes": {
		          "type": ["string", "null"]
		        }
		      }
	      }
	  	},
	  }
  },

	attribute: {
		"id": "/attribut",
	  "type": "object",
	  "properties": {
			"id": {
	      "type": ["string", "null"]
	  	},
	  	"keyword": {
	      "type": ["string", "null"]
	  	},
	  	"keywordkind": {
	      "type": ["string", "null"]
	  	},
      "language": {
        "type": ["string", "null"]
      },
	  	"status": {
	      "enum": [
          "working",
	        "obsolete",
	        "html5",
	        "deprecated",
	        "experimental",
	        "not standardized",
	        null,
	      ]
	  	},
	  	"link": {
	      "type": ["string", "null"]
	  	},
	  }
	}
}

var p = {
  "id": "5a09fccadcc9d354b94c3132",
  "keyword": 456,
  "keywordkind": "tag",
  "status": null,
  "link": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body",
  "difintion": "The HTML <body> Element represents the content of an HTML document. There can be only one <body> element in a document.",
  "examples": [
    {
      "title": null,
      "code": "<html>\n  <head>\n    <title>Document title</title>\n  </head>\n  <body>\n    <p>This is a paragraph</p>\n  </body>\n</html>",
      "note": null,
      "link": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body#Example"
    }
  ],
  "attributes": [
    {
      "name": "alink",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "background",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "bgcolor",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "bottommargin",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "leftmargin",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "link",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "onafterprint",
      "status": null,
      "details": null
    },
    {
      "name": "onbeforeprint",
      "status": null,
      "details": null
    },
    {
      "name": "onbeforeunload",
      "status": null,
      "details": null
    },
    {
      "name": "onblur",
      "status": null,
      "details": null
    },
    {
      "name": "onerror",
      "status": null,
      "details": null
    },
    {
      "name": "onfocus",
      "status": null,
      "details": null
    },
    {
      "name": "onhashchange",
      "status": null,
      "details": null
    },
    {
      "name": "onlanguagechange",
      "status": "experimental",
      "details": null
    },
    {
      "name": "onload",
      "status": null,
      "details": null
    },
    {
      "name": "onmessage",
      "status": null,
      "details": null
    },
    {
      "name": "onoffline",
      "status": null,
      "details": null
    },
    {
      "name": "ononline",
      "status": null,
      "details": null
    },
    {
      "name": "onpopstate",
      "status": null,
      "details": null
    },
    {
      "name": "onredo",
      "status": null,
      "details": null
    },
    {
      "name": "onresize",
      "status": null,
      "details": null
    },
    {
      "name": "onstorage",
      "status": null,
      "details": null
    },
    {
      "name": "onundo",
      "status": null,
      "details": null
    },
    {
      "name": "onunload",
      "status": null,
      "details": null
    },
    {
      "name": "rightmargin",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "text",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "topmargin",
      "status": "obsolete",
      "details": null
    },
    {
      "name": "vlink",
      "status": "obsolete",
      "details": null
    }
  ]
}

var Validator = require('jsonschema').Validator;
var v = new Validator();


module.exports = (data) => {
  var response = v.validate(JSON.parse(JSON.stringify(data)), schemas[data.keywordkind]);
  return !response.errors.length
}