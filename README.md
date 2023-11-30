# AngularStarterKit

This starter kit use angular version `15.2.0` and includes the following features:

- [x] Scalable folder structure
- [x] Linter and prettier
- [x] Routing and lazy loading
- [x] Authentication service
- [x] Light design system and layout utilities (css class based)
- [x] Toast service (snackbar and loading screen)
- [x] Modal service (support custom modals)
- [x] Test setup (jest)
- [x] docker compose for production

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

The `AuthService` allows you to authenticate a user and keep it logged in thanks to localstorage with a JWT token.

### Before starting

don't forget to unsubscribe from observables. The easiest way is to use `takeUntil`as last operator of your pipe

```typescript
someobservable$.pipe(takeUntil(this.destroyed$)).subscribe( ... )
```

### AuthService

First you need to import the authService and inject it.

```typescript
constructor(private readonly authService:AuthService){}
```

##### services attributes

You can retrieve the user's token and check if the user is connected.

```typescript
const userToken: string = authService.token;
const isUserConnected: boolean = authService.connected;
```

### Login

connect a user. This method will automatically save the JWT token in the service and the local storage.
In case of failure it will show an error toast.

```typescript
authService.login(login: string, password: string)
  .pipe(takeUntil(this.destroy$))
  .subscribe((loggedIn: boolean) => {
    if (loggedIn) {
      // Successfully logged in
    } else {
      // Handle login failure
    }
  });
```

### Register

To allow users to create a new account. This will NOT connect the user.
In case of failure it will show an error toast.

```typescript
authService.register(login: string, password: string)
  .pipe(takeUntil(this.destroy$))
  .subscribe((registered: boolean) => {
    if (registered) {
      // Successfully registered
    } else {
      // Handle registration failure
    }
  });
```

### Checking Token Validity

You can check the validity of the user's token by using the `isTokenValid` method.
If the token is invalid, the user will be logged out.

```typescript
authService
  .isTokenValid()
  .pipe(takeUntil(this.destroy$))
  .subscribe((isValid: boolean) => {
    if (isValid) {
      // Token is valid
    } else {
      // Token is invalid or expired
    }
  });
```

### Logout

To disconnect the user and clear their token.

```typescript
authService.logout();
```

That's it! You can now use the `AuthService` !

## Modal service & custom modals

The modal service allows you to open a modal and close it from anywhere in the app. It also allows you to create custom modals.

### Create a custom modal

Let's create the UsernameModalComponent.

First be sure that the module where UsernameModalComponent is declared has imported the `SharedModule`.

#### username-modal.component.ts

To create a custom modal, you need to create a component that extends the `BaseModalComponent`, it allows you to open the modal with the service. You can modify the payload in your `handleClose` function.

```typescript
export class UsernameModalComponent extends BaseModalComponent {
  username: string = '';

  constructor() {
    super();
  }

  handleClose(event: ModalPayload) {
    const editedPayload = { ...event, data: this.username };
    this.onClose(editedPayload);
  }
}
```

#### username-modal.component.html

In the template you will need to use the modal component `app-modal`. This component will handle the modal logic & options. You can add your custom content inside the modal

**You have to**

- pass the `options` _(inherited from BaseModalComponent)_
- define the function `handleClose` that will be called when the user close the modal.

The `validator` is optional and allows you to disable the confirm button if the validator returns false.

```html
<app-modal
  [options]="options"
  [validator]="username !== ''"
  (closeEvent)="handleClose($event)">
  <!-- custom info -->
  <div class="w-100 flex-col center middle">
    <input
      type="text"
      class="basic"
      placeholder="basic input"
      [(ngModel)]="username"
      placeholder="Name" />
  </div>
</app-modal>
```

### The service

First you need to import the modalService and inject it.

```typescript
constructor(private readonly modalService:ModalService){}
```

Then you can either open any modal. Modals options are always optionals. you can custom mutliple options like the title, the size, the data etc...

```typescript
export interface ModalOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
}
```

Here are the default options.

```typescript
{
  title: 'Modal title',
  message: '',
  confirmText: 'Yes',
  cancelText: 'No',
  confirmColor: 'primary',
  cancelColor: 'basic'
}
```

```typescript
openModal() {
    this.modalService
      .open(YourModalComponent, { title: "What's your name ?" })
      .subscribe(payload => {
        if (payload.success) {
          // Do something, the modal was confirmed
        } else {
          // Do something else the modal was canceled
        }
      });
  }
```

You can also open a confirmation modal (under the hood it's just a basic modal with different default options)

```typescript
{
  title: 'Please confirm your choice',
  message: 'Are you sure you want to do this?',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmColor: 'danger',
}
```

```typescript
openConfirmModal() {
    this.modalService.openConfirmModal().subscribe(payload => {
      if (payload.success) {
        // Do something, user confirmed
      } else {
        // Do something else user canceled
      }
    });
  }
```

And that's it! You can now use your modal ! You can check the `CustomModalComponent` in the app (in the `starter-kit` module) for a working example.

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
