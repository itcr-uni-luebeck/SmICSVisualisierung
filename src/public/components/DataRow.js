import { Component } from "react/cjs/react.production.min"

class DataRow extends Component {
  constructor(props) {
    super(props)
  }

  render = () => {
    return <pre>{JSON.stringify(this.props.value, null, 4)}</pre>
  }
}

export default DataRow
