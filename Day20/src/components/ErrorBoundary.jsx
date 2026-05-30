import React from "react";

class ErrorBoundary
extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      hasError: false

    };

  }

  static getDerivedStateFromError() {

    return {

      hasError: true

    };

  }

  componentDidCatch(
    error,
    errorInfo
  ) {

    console.error(
      error,
      errorInfo
    );

  }

  render() {

    if (
      this.state.hasError
    ) {

      return (

        <div
          className="
            min-h-screen
            flex
            flex-col
            justify-center
            items-center
            bg-red-50
          "
        >

          <h1
            className="
              text-5xl
              font-bold
              text-red-600
            "
          >
            Something Went Wrong
          </h1>

          <p
            className="
              mt-4
              text-gray-600
            "
          >
            Please refresh the page.
          </p>

        </div>

      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;