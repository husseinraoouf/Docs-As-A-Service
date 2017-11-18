import React from "react";

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


import CodeMirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';



class TagForm extends React.Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      keywordkind: 'tag',
      status: 'working',
      link: '',
      difintion: '',
      examples: [{ title: '', code: '', note: '', link: ''}],
      attributes: [{ name: '', status: 'working', details: '', note: ''}]
    };
  }

  handleChange = (newValue, field) => {
    this.setState({ [field]: newValue });
  }

  handleExampleChange = (newValue, idx, field) => {
    const newExamples = this.state.examples.map((example, sidx) => {
      if (idx !== sidx) return example;
      return { ...example, [field]: newValue };
    });

    this.setState({ examples: newExamples });
  }


  handleAttributeChange = (newValue, idx, field) => {
    const newAttributes = this.state.attributes.map((attribute, sidx) => {
      if (idx !== sidx) return attribute;
      return { ...attribute, [field]: newValue };
    });

    this.setState({ attributes: newAttributes });
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(JSON.stringify(this.state));
    const response = await this.props.createKeywordMutation({
	    variables: {
	      Data: this.state
    	}
  	})

    console.log(JSON.stringify(response));
  }

  handleAddExample = () => {
    this.setState({ examples: this.state.examples.concat([{ title: '', code: '', note: '', link: ''}]) });
  }

  handleRemoveExample = (idx) => () => {
    this.setState({ examples: this.state.examples.filter((s, sidx) => idx !== sidx) });
  }


  handleAddAttribute = () => {
    this.setState({ attributes: this.state.attributes.concat([{ name: '', status: 'working', details: '', note: ''}]) });
  }

  handleRemoveAttribute = (idx) => () => {
    this.setState({ attributes: this.state.attributes.filter((s, sidx) => idx !== sidx) });
  }

  render() {

    return (
    	<div className="container">
	      <form className="form-horizontal" onSubmit={this.handleSubmit}>

	        <div className="form-group">
            <label htmlFor="keywordkind" className="col-sm-2">Keyword Kind</label>
            <div className="col-sm-10">
              <select id="keywordkind" className="form-control" value={this.state.keywordkind} onChange={(evt) => this.props.handleKeywordKindChange(evt.target.value)}>
                <option value="tag">Tag</option>
                <option value="attribute">Attribute</option>
              </select>
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="keyword" className="col-sm-2">Keyword</label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.keyword}
                onChange={(evt) => this.handleChange(evt.target.value, "keyword")}
                className="form-control"
                id="keyword"
                placeholder="Keyword" />
            </div>
          </div>



					<div className="form-group">
            <label htmlFor="status" className="col-sm-2">Status</label>
            <div className="col-sm-10">
              <select id="status" className="form-control" value={this.state.status} onChange={(evt) => this.handleChange(evt.target.value, "status")} >
                <option value="working">Working</option>
			          <option value="obsolete">Obsolete</option>
			          <option value="html5">HTML5</option>
			          <option value="deprecated">Deprecated</option>
			          <option value="experimental">Experimental</option>
			          <option value="not standardized">Not Standardized</option>
              </select>
            </div>
          </div>


	        <div className="form-group">
            <label htmlFor="link" className="col-sm-2">link</label>
            <div className="col-sm-10">
              <input
                type="text"
                value={this.state.link}
                onChange={(evt) => this.handleChange(evt.target.value, "link")}
                className="form-control"
                id="link"
                placeholder="link"
              />
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="difintion" className="col-sm-2">difintion</label>
            <div className="col-sm-10">
              <textarea
				        value={this.state.difintion}
				        onChange={(evt) => this.handleChange(evt.target.value, "difintion")}
				        className="form-control"
				        rows="3"
				        id="difintion"
				      />
            </div>
          </div>


	        <h4>Examples</h4>


	        {this.state.examples.map((example, idx) => (
	          <div key={idx}>
							<h5>Example {idx + 1}</h5>

							<div className="row">
		            <label htmlFor={`example-${idx}-title`} className="col-sm-2 control">Example Title</label>
		            <div className="col-sm-8">
		              <input
		                className="form-control"
		                id={`example-${idx}-title`}
		                type="text"
			              placeholder={`Example #${idx + 1} Title`}
			              value={example.title}
			              onChange={ (evt) => this.handleExampleChange(evt.target.value, idx, "title")}
		              />
		            </div>
              </div>

							<div className="row">
				        <label htmlFor={`example-${idx}-code`} className="col-sm-2 control">Example Code</label>
	              <div className="col-sm-8">
	                <CodeMirror
		                className="codemi"
			              options={{
			                mode: 'xml',
			                lineNumbers: true,
			              }}
			              value={example.code}
			              onChange={(newValue) => this.handleExampleChange(newValue, idx, "code")}
			            />
	              </div>
	            </div>


							<div className="row">
		            <label htmlFor={`example-${idx}-note`} className="col-sm-2 control">Example Note</label>
		            <div className="col-sm-8">
									<textarea
						        value={example.note}
						        onChange={ (evt) => this.handleExampleChange(evt.target.value, idx, "note")}
						        className="form-control"
						        rows="3"
						        id={`example-${idx}-note`}
						      />
		            </div>
              </div>




							<div className="row">
		            <label htmlFor={`example-${idx}-link`} className="col-sm-2 control">Example Link</label>
		            <div className="col-sm-8">
		              <input
		                className="form-control"
		                id={`example-${idx}-link`}
		                type="text"
			              placeholder={`Example #${idx + 1} Link`}
			              value={example.link}
			              onChange={ (evt) => this.handleExampleChange(evt.target.value, idx, "link")}
		              />
		            </div>
              </div>

	            <div className="row">
		            <button type="button" onClick={this.handleRemoveExample(idx)} className="btn btn-danger col-sm-offset-4 col-sm-4">Delete</button>
		          </div>
	          </div>
	        ))}

	        <div className="row">
            <button type="button" onClick={this.handleAddExample} className="btn btn-primary col-sm-offset-4 col-sm-4">Add Example</button>
          </div>


	        <h4>Attributes</h4>


	        {this.state.attributes.map((attribute, idx) => (
	          <div key={idx}>
							<h5>Attribute {idx + 1}</h5>

							<div className="row">
		            <label htmlFor={`attribute-${idx}-name`} className="col-sm-2 control">Attribute Name</label>
		            <div className="col-sm-8">
		              <input
		                className="form-control"
		                id={`attribute-${idx}-name`}
		                type="text"
			              placeholder={`Attribute #${idx + 1} Name`}
			              value={attribute.title}
			              onChange={ (evt) => this.handleAttributeChange(evt.target.value, idx, "name")}
		              />
		            </div>
              </div>


              <div className="row">
		            <label htmlFor={`attribute-${idx}-status`} className="col-sm-2 control">Attribute Status</label>
		            <div className="col-sm-8">
		              <select className="form-control" id={`attribute-${idx}-status`} value={attribute.status} onChange={ (evt) => this.handleAttributeChange(evt.target.value, idx, "status")} >
		                <option value="working">Working</option>
					          <option value="obsolete">Obsolete</option>
					          <option value="html5">HTML5</option>
					          <option value="deprecated">Deprecated</option>
					          <option value="experimental">Experimental</option>
					          <option value="not standardized">Not Standardized</option>
		              </select>
		            </div>
              </div>


							<div className="row">
		            <label htmlFor={`attribute-${idx}-details`} className="col-sm-2 control">Attribute Details</label>
		            <div className="col-sm-8">
									<textarea
						        value={attribute.details}
						        onChange={ (evt) => this.handleAttributeChange(evt.target.value, idx, "details")}
						        className="form-control"
						        rows="3"
						        id={`attribute-${idx}-details`}
						      />
		            </div>
              </div>



							<div className="row">
		            <label htmlFor={`attribute-${idx}-note`} className="col-sm-2 control">Attribute Note</label>
		            <div className="col-sm-8">
									<textarea
						        value={attribute.note}
						        onChange={ (evt) => this.handleAttributeChange(evt.target.value, idx, "note")}
						        className="form-control"
						        rows="3"
						        id={`attribute-${idx}-note`}
						      />
		            </div>
              </div>


	            <div className="row">
		            <button type="button" onClick={this.handleRemoveAttribute(idx)} className="btn btn-danger col-sm-offset-4 col-sm-4">Delete</button>
		          </div>
	          </div>
	        ))}

	        <div className="row">
            <button type="button" onClick={this.handleAddAttribute} className="btn btn-primary col-sm-offset-4 col-sm-4">Add Attribute</button>
          </div>

	        <div className="row">
            <button type="button" className="btn btn-success col-sm-4">Submit</button>
          </div>
	      </form>
    	</div>
    )
  }
}



// 1
const CREATE_KEYWORD_MUTATION = gql`

	mutation createKeywordMutation($Data: keywordInput!){
	  createKeyword(Data: $Data) {
	    id
	    keyword
	  }
	}
`

// 3
export default graphql(CREATE_KEYWORD_MUTATION, { name: 'createKeywordMutation' })(TagForm);