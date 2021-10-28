<img src="./public/img/lkd-banner.png" />

# Alison Vandromme - Ynov M1 Majeure - Coordination Front/Back

## Stack

<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"/> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" /> <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" /> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/>

## Automatation

### Jira

Each feature/fix branch has Jira's ticket issue as a reference. 
As such, Jira can automatically update issue's status depending on push/PRs.
### GH Actions

- Open PR for every feature/* or fix/* branch
- Deploy to preview url on PR
- Open PR on merge from staging to prod
- Deploy to live url on master merge
- Run tests on push on test branch (will be integrated in preview build)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
