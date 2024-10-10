# Diggilo

## Screenshots

### Söksidan:

![image](https://github.com/user-attachments/assets/02016d4d-359b-4ed1-973b-d4ba9e649ac1)

![image](https://github.com/user-attachments/assets/33bf5667-7370-4e07-bcb0-16d477d9ca34)

### Annons-sidan:

![image](https://github.com/user-attachments/assets/dcb7788a-4368-4980-9ee6-c47f349e9c6a)

## Tech Stack

- HTML5
- Typescript
- React
- Sass
- Styled components

### Build Tools

- Vite
- GitHub Pages / Actions

## Design

- Low-Fidelity Wireframe
- Arbetsformedlingens Design System

## Formatting

This project uses code standards by applying the ESLint and Prettier tools:

- **ESLint**: identifies bugs and patterns to make the code more consistent.
- **Prettier**: code formatter for making the code more readable and consistent.

## Status

This project is marked as "Finished".

## Getting Started

To run the occupation search web application on you local machine, follow these steps:

1. Download or clone the repository.
2. Change directory to the code folder.
3. Install the necessary dependencies by running `npm install`.
4. To enable map add token for mapgl in env file, example env provided.
5. Start the application using `npm run dev`.

## APIs

1. https://jobsearch.api.jobtechdev.se/
2. https://taxonomy.api.jobtechdev.se/v1/taxonomy/swagger-ui/index.html

## External resources

1. https://designsystem.arbetsformedlingen.se/
2. https://www.jobtechdev.se/sv
3. https://arbetsformedlingen.se/platsbanken/
4. https://www.mapbox.com/

## App Description

This project was an assignment in which we were tasked with creating an occupation search web application using external resources provided by Arbetsförmedlingen, the Swedish government's job search platform. By integrating their APIs, we implemented functionality to display relevant job ads, and by utilizing their design system, we ensured a cohesive and professional appearance. For styling, however, we applied our own custom colors as this was requested to give the application a unique look while maintaining the structure provided by Arbetsförmedlingen's design guidelines.

## General Features

- **Header**: Header with navigation.
- **Footer**: Footer with navigation.
- **Home**: Homepage where user can search and navigate to searchpage either by including free search or leaving the input empty.

## Job Search Features

- **Search Page**: Here we display all ads and provide users with more options to refine their job search.
- **Filters**: User can filter by Occupations / Municipalities / Scope / Employment Type / Workplace / Qualifications / Language.
- **Sorting**: Functionality for sorting ads by Relevance / Application Date / Publication Date.
- **Suggestions**: Suggestions are displayed in a dropdown when user types in the searchbar.
- **Map**: Displays the geolocations of the ads in Sweden on a map with popups that can redirect users to the respective job page.
- **Job page**: Can view all information about the job in its own page.

## Authors

- [RalfiSlask](https://github.com/RalfiSlask)
- [DiemBang](https://github.com/DiemBang)
- [armin-164](https://github.com/armin-164)
