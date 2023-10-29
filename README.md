# AngularStarterKit

This starter kit use angular version `15.2.0` and includes the following features:

- [x] Scalable folder structure
- [x] Linter and prettier
- [x] Routing and lazy loading
- [ ] Authentication service, compatible with LINK
- [x] Light design system and layout utilities (css class based)
- [x] Toast service (snackbar and loading screen)
- [x] Modal service (support custom modals)
- [x] Test setup (jest)

## Start from this template

1. Clone this repository
2. Delete `.git` folder and run `git init` to start a new repository
3. Run `npm install`
4. Run `ng serve` to start the development server
5. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via jest.

# Guidelines

## Folder structure

```bash
src/
├─ app/ # source code of the application
│  ├─ core/ # core module, imported once in root module
│  │  ├─ components/ # singleton components, like header, footer etc..
│  │  ├─ constants/ # constants for the app
│  │  ├─ guards/ # guards for routes
│  │  ├─ interceptors/ # interceptors for http requests
│  │  ├─ models/ # models, interfaces for your app
│  │  ├─ services/ # services/stores, api calls etc..
│  ├─ modules/ # features (lazy loaded)
│  ├─ shared/ # everything that is shared between modules
│  ├─ styles/ # global styles
│  ├─ app.component.ts # the root component (there is more files hidden for simplicity)
├─ assets/ # static assets
│  ├─ icons/
│  ├─ illustrations/
├─ environments/ # environment variables. DO NOT PUT SECRETS HERE. THIS IS VISIBILE IN THE BROWSER
```

## linter and prettier

Setup your ide to lint and format on save. This will help you to keep the code clean and consistent.

for vscode, install the following extensions:

- prettier
- eslint

and configure them to lint on save.

## Routing and lazy loading

The app is using lazy loading for modules. This means that the modules are loaded only when the user navigates to the route. This is a good practice to improve the performance of the app. The routing is configured in `app-routing.module.ts` file and each module has its own routing file.

## Authentication service

TODO - add documentation & fix the service

## Design system

This is a very light design system, based on css classes. The idea is to have a set of classes that can be used to build the UI.

### Flex layout

The syntax is `.flex-<direction>`.
The direction can be `row` or `col` and it can be combined with the following modifiers:
`.left`, `.center`, `.right` for the x-axis
`.top`, `.middle`, `.bottom` for the y-axis
`.btw` for space between elements following the direction
`.wrap`, `.wrap-reverse` for wrapping elements
for wrapping elements in reverse order
`.no-gap`, `.small-gap`, `.micro-gap` for the gap between elements. By default, the gap is 1rem.

### Grid layout

The syntax is `.grid-<row/col>-<number>`.
The number can be from 2 to 5 and symbolize the number of columns/rows.

### Sizes

The syntax is `.h-<size>` for height and `.w-<size>` for width.
`full` size is 100vw or 100vh
`100` and `50` are % values.

### Variables

The variables are defined in `src/styles/variables.scss` file. You can use them in your components by importing them. Use them as much as possible to keep the design consistent.

```scss
@import '/src/app/styles/variables.scss';
```

### Responsive

For responsive design, use flex layout and grid layout as much as possible and avoid `px` values. Use `vw`/`vh` `rem` and `%` values instead.

You can also use the following mixins:

```scss
@import '/src/app/styles/mixins.scss';

.my-class {
  //default styles (in this case for width 300px to 600px)

  @include width-under(300px) {
    // styles for width under 300px
  }

  @include width-over(600px) {
    // styles for width over 600px
  }
}
```
