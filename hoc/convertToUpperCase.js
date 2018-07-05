import React, {Component} from 'react';


export  const upperCased = (ComposedComponent) => {
    type UpperCasedProps = {};
    class UpperCased extends Component<UpperCasedProps> {
        constructor(props) {
            super(props);
        }

        render() {
            const data = this.props.data.toUpperCase();
            return (<ComposedComponent {...this.props} data={data} />);
        }
    }

    return UpperCased
};

