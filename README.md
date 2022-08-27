# Dive Inn Denver<br>
## Project Setup - Yarn, Lerna, Angular

### Install yarn
`npm i -g yarn`
<br>

### Update Global Installs
Optional: clear global npm cache<br>
`npm cache clean --force`<br>
`npm cache verify`<br>

#### Error: The term 'ng' is not recognized...
* Reinstall Angular CLI globally<br>
  `npm i -g @angular/cli@latest`
#### Error: EMFILE: too many open files
* Run `npm cache clean --force`
* Look into graceful-fs (how to use it globally?)
<br>

### Update to latest Node
`nvm install <version>`<br>
`nvm use <version>`
<br>

---

### Multi-project workspace
Create container workspace for all projects<br>
`ng new <workspace-name> --create-application false --skip-install`<br>

Create applications
`cd <workspace-name>`<br>
`ng generate application <app-name> --skip-install`

Create libraries
`ng generate library <library-name> --skip-install`

Change the package manager for the project to yarn
`cd <project-name>`<br>
`ng config cli.packageManager yarn`


Connect to remote repository (set up on GitHub)
`git remote add origin <url>`



Initialize package.json
`yarn init`

Install packages
`cd ../../`
`yarn`
---

### Set up workspace root
Create folder structure e.g:
```
root
  assets
  env
  projects
    shared
```

#### Create root package.json to enable Workspaces
In package.json of root folder:
```
{
  "private": true,
  "workspaces": ["projects/*"]
}
```

---

### Initialize root for git repo
`git init`

#### Ignore node_modules
`code .gitignore`
```
# Ignore Mac system files
.DS_store

# Ignore node_modules folder
**/node_modules/*

# Ignore files related to API keys
**/env/*
```

---

### Initialize Lerna
`npx lerna init`

---
---

## Updating the Projects

### Update Angular CLI globally
Administrator (Windows) or add `sudo`
`npm uninstall -g angular-cli`
`npm cache verify`
`npm cache clean`
`npm i -g @angular/cli@latest`

### Update Angular CLI per project
From each PROJECT root folder:
`ng update @angular/cli @angular/core`

---
---

## Reference

https://angular.io/guide/file-structure#multiple-projects

https://upmostly.com/angular/using-yarn-with-angular

https://classic.yarnpkg.com/lang/en/docs/workspaces/

https://levelup.gitconnected.com/angular-mono-repo-using-lerna-and-yarn-workspaces-for-reusability-5aafff9ab5f2
