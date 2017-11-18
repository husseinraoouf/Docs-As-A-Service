import "babel-polyfill";

import React from "react";
import TagForm from './TagForm';
import AttributeForm from './AttributeForm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      keywordkind: 'tag',
    };
  }

  handleKeywordKindChange = (newValue) => {
    this.setState({ keywordkind: newValue });
  }

  render() {

    let form = null;
    if (this.state.keywordkind == "tag") {
      form = <TagForm handleKeywordKindChange={this.handleKeywordKindChange} />
    } else if (this.state.keywordkind == "attribute") {
      form = <AttributeForm handleKeywordKindChange={this.handleKeywordKindChange} />
    }

    return (
      <div>
        {form}
      </div>
    )
  }
}

export default App;