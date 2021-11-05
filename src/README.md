# Alison Vandromme - Ynov M1 Majeure - Coordination Front/Back

<a href="../dev.html"> Back to Dev Utils</a>

## Stack

<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"/> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" /> <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" /> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/> <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" /> <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" /> <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" /> <img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" />

## Dev

dev.html can be found in the root directory.
This file links to documentation, e2e report and unit report.
A build report can also be found.
To be able to see it, run :

```sh
npm run build

# Or
npm run build-report
```

## Docker

- Uncomment the devServer config in vue.config.js
- Create a .env.local with environment variables
- Run:

```sh
docker-compose --env-file .env.local up --build

# Or
npm run docker
```


## Automation
### Tests

- Jest : Tests coverage can be found in jest-cover/index.html
- Cypress: Tests coverage can be found in cypress-cover/index.html

To run cypress with coverage (using Instanbul), run :

```sh
npm run cover
```

### Jira

Each feature/fix branch has Jira's ticket issue as a reference. 
As such, Jira can automatically update issue's status depending on push/PRs.

### GH Actions

- Open PR for every feature/* or fix/* branch
- Deploy to preview url on PR
- Open PR on merge from staging to prod
- Deploy to live url on master merge
- Run tests on push on test branch (will be integrated in preview build)

### jsDocs

Generates documentation from jsDocs annotations.
To see the documentation, open docs/index.html

To generate docs, run : 

```sh 
npm run docs 
```

### Sentry

Sentry is integrated in the app as well as in Github repo and Jira.
A bidirectionnal flow is set between Sentry's issues and Jira's. 

### Sider

Automated Code Review on each PR.
For now, test mode is enable so it doesn't block any PRs. 

## APIs

- Reverse Geocode (MapQuest)
- Geo API Gouv

## Performance

Sentry is implemented for monitoring and includes performance data.
A build report can also be viewed in dist/report.html.
To generate a new report, run : 

```sh
npm run build-report
```

If you have Vue CLI globally installed, the data is also available with 

```sh
vue ui
```

## Project setup

```sh
# Install dependencies
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Run unit tests
npm run test:unit

# Run your end-to-end tests
npm run test:e2e

# Lints and fixes files
npm run lint
```
