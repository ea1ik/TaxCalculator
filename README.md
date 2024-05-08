# Tax Calculator

This project is a tax calculator that helps calculate taxes based on income. It consists of three main categories: frontend implementation, backend integration, and testing.

## Frontend Implementation

The project is written in React 18 and Typescript 5.2.2

To enhance the development experience, Vite is used as the build tool. Vite is a fast and lightweight build tool specifically designed for modern frontend projects. It offers instant server startup, hot module replacement (HMR), and optimized production builds.

### UI Components with shadcn

For UI components, we are using the `shadcn` library, which is based on Radix UI. `shadcn` provides a wide range of optimized UI components with enhanced accessibility (ARIA) support and theming capabilities. It offers lightweight implementations out of the box, ensuring a smooth user experience.

### Customization with TailwindCSS

The project utilizes TailwindCSS to reduce the CSS overhead, while also offering a great developer experience. Tailwind also helps with creating responsive designs for all screen sizes and browsers.

## Backend Integration

The backend integration is done in the `/src/api` directory of the project. It utilizes a custom fetch function called `apiFetch` that connects to the rest of the endpoint.
All endpoints are transformed into hooks (i.e: `useTaxBrackets`) found in the `/src/hooks` directory. This assures that all the endpoints are separate and run standalone.

### Backend Services

The backend is built on top of `@tanstack/react-query`. It's a famous library for client-side rendering, that offers very important concepts such as auto-retry and data caching. The main entry point of the application (`main.tsx`) wraps the main component (`App.tsx`) in a `QueryClientProvider`. This offers to use the ability to use a hook called `useQuery`, which connects with our endpoints and `apiFetch`.

### Caching and Retries

The caching is set to 30 seconds, meaning the same request will persist for 30 seconds and then a new one will be replaced. Retries is set to 3, meaning an endpoint will be called up to 3 times before it actually throws the error.

## Testing

The project implements unit testing for both logic functions and UI functions.
Although the project does not offer every possible testing scenario, it does cover the most basic implementations. The testing frameworks used are vitest and react-testing-library.

1. Unit Testing for logic: Functions that implement some sort of logic (i.e: calculateTaxes) are tested for multiple cases (base cases, error cases, empty cases...).
   Vitest is used to run the tests
2. Unit Testing for components: React is made of components that composes its UI. Each component is tested with different kind of props to ensure that it renders correctly to the DOM. React Testing Library with Vitest is used to run the tests

## Getting Started

To get started with the tax calculator project, follow these steps:

1. Clone the repository: `git clone https://github.com/ea1ik/TaxCalculator.git`
2. Install the necessary dependencies: `npm install`
3. Run the server: `npm run start-server`
4. Start the development serverf for the client: `npm run dev`
5. Open your browser and navigate to `http://localhost:5173` to access the tax calculator.

## Run Tests

To run the two category of tests:

1. Run unit tests for logic: `npm run test-utils`
2. Run unit tests for components: `npm run test-components`
3. Run all tests: `npm run test`

## Time Taken for Implementation

| Step                        | Time Taken |
| --------------------------- | ---------- |
| Setting up project + design | ~30 mins   |
| Frontend Implementation     | ~2 hours   |
| Backend Integration         | ~20 mins   |
| Creating all test scenarios | ~3 hours   |
| Final refactoring & docu.   | ~1 hour    |
| Total                       | ~7 hours   |

## More improvements to be done

1. Implement a build CI/CD pipeline that utilizes Github Actions or a cloud provider (AWS, GCP, Azure...) that connects building the website, packaging, testing and deploying.
2. Add SEO to the website for better compatibility with the web
3. Add more unit tests and end-to-end tests
