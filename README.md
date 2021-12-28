# Folder Structure
every folder which exposes anythign to outside its module should have `index.ts{x}` file to expose it.
### `/src/atoms`
This contains the designing library, decoupled, reusable components, which do no have side effects.<br/>
example : buttons, cards, forms, icons, lists, modals, notifications, panels, tables, tabs, etc.
### `/src/components`
This contains the components that are used in the application, these can be fatures or sections grouped together with api calls, business logic, flow logic onto its respective files.<br/>
example : home, login, signup, etc.<br/>
all the component must be named `{name}.component.tsx` if it contains a util then it should be `{name}.util.tsx`<br/>
`lazy-components` are used to load the components lazily, this is done to reduce the bundle size and improve the performance of the application.<br/>
### `/src/pages`
This contains the pages that are used in the application, we are using `<Outlet/>` for layout-ing them under a page. <br/>
Check the routing library `react-router-dom` for the same.

### `/src/lib`
contains all library creation and usage wrapper, such as localStorage wrapper and axios.

### `/src/service`
contains all API calls, mutation and query signatures.

### `/src/configurations`
this will have all the configuration files, such as environment variables, api endpoints, etc.

### `/src/assets`
this will include styles, images, fonts, etc.

### `/src/redux`
this contains redux related files, such as reducers, actions, etc.
use toolkit to create reducers and actions slices.


# General Guidelines
### be very careful with the atoms, treat them like a library which anyone can use, avoid adding dependency and increase coupling.
- naming conventions `{name}.component.tsx` will be components.
- naming conventions `{name}.service.tsx` will be api calls.
- naming conventions `{name}.slice.tsx` will be reducers and actions.
- naming conventions `{name}.pages.tsx` will be layouts with outlets.
- `variable.css` will have css variables.
- `atomic.css` will have one liner css selectors.
- `{name}.css` will be imported from their respective folders example : `/src/components/auth/auth.css` will be imported to `/src/assets/styles/index.css`.
### Don't put every small thing onto redux, use this only if you need to use data in more than one place. 