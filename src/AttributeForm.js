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
      keywordkind: 'attribute',
      tags: ['']
    };
  }

  handleChange = (newValue, field) => {
    this.setState({ [field]: newValue });
  }

  handleTagChange = (newValue, idx) => {
    const newTags = this.state.tags.map((tag, sidx) => {
      if (idx !== sidx) return tag;
      return newValue;
    });

    this.setState({ tags: newTags });
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

  handleAddTag = () => {
    this.setState({ tags: this.state.tags.concat([''] )});
  }

  handleRemoveTag = (idx) => () => {
    this.setState({ tags: this.state.tags.filter((s, sidx) => idx !== sidx) });
  }


  render() {

    return (
      <div className="container">
        <form className="form-horizontal" onSubmit={this.handleSubmit} >
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


          <h4>Tags</h4>

          {this.state.tags.map((tag, idx) => (
            <div key={idx}>
              <div className="form-group">
                <div className="row">
                  <label htmlFor={`${idx} attribute`} className="col-sm-2 control">Attribute Name</label>


                  <div className="col-sm-8">
                    <div className="input-group">
                      <input
                        type="text"
                        value={tag}
                        onChange={ (evt) => this.handleTagChange(evt.target.value, idx)}
                        className="form-control"
                        id={`${idx} attribute`}
                        placeholder="Attribute Name"
                      />
                      <span className="input-group-btn">
                        <button type="button" onClick={this.handleRemoveTag(idx)} className="btn btn-danger">Delete</button>
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
          <div className="row">
            <button type="button" onClick={this.handleAddTag} className="btn btn-primary col-sm-offset-4 col-sm-4">Add Tag</button>
          </div>
          <br />
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