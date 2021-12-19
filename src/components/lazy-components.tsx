import React from 'react';

// This return's a class component as hooks can not be scoped under a function :(
// This act's like React.lazy as react lazy doesn't work well when import() goes through catch.
// https://medium.com/@botfather/react-loading-chunk-failed-error-88d0bb75b406
const lazyImport = (importHandler: any, { name }: { name: string }) => {

  class LazyComponent extends React.Component<any, {
    Comp: React.Component<any, any> | React.FC<any> | null,
  }> {
    constructor(props: any) {
      super(props);
      this.state = {
        Comp: null,
      };
    }

    componentDidMount() {
      this.setState({ Comp: () => <div>Loading Component...</div> });
      (async () => {
        const ImportedComp = await importHandler().catch((e: Error) => {
          // track events
          console.error('Error loading component', e);
          window.location.reload();
        });
        if (!(ImportedComp && ImportedComp.default)) {
          this.setState({ Comp: () => <div>Component Error, Please refresh the page</div> }); // error component
          return console.error(`Module/Component must be returned from importing(${name}) and must have default export.`);
        }
        this.setState({ Comp: ImportedComp.default });
      })().catch((e) => {
        console.error(e);
        this.setState({ Comp: () => <div>Page unavailable at this moment</div> });
      });
    }

    render() {
      const { Comp }: { Comp: any } = this.state;
      return Comp ? <Comp {...this.props} /> : null;
    }
  }

  return LazyComponent;
}

export const Login: any = lazyImport(() =>
  import(/* webpackChunkName: "login" */ './login'), {
  name: 'login'
});

export const ChangePassword: any = lazyImport(() =>
  import(/* webpackChunkName: "change-password" */ './change-password'), {
  name: 'change-password'
});