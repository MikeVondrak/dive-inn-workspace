# Dive Inn Denver<br>
## Project Setup - Yarn, Angular
<br>

### **Install Prereqs**
Install nvm / node (from web for Windows, curl for OS X)<br>
`e.g. curl...`<br>

Install yarn using npm<br>
`npm i -g yarn`

<br>

### **Update Global Installs**
Optional: clear global npm cache<br>
`npm cache clean --force`<br>
`npm cache verify`<br>

#### *Error: The term 'ng' is not recognized...*
* Reinstall Angular CLI globally<br>
  `npm i -g @angular/cli@latest`
#### *Error: EMFILE: too many open files*
* Run `npm cache clean --force`
* Look into graceful-fs (how to use it globally?)

<br>

### **Update to latest Node**
`nvm install <version>`<br>
`nvm use <version>`<br>

### **Create multi-project workspace using Yarn**
Create container workspace for all projects<br>
`ng new <workspace-name> --create-application false --skip-install`<br>

Create applications<br>
`cd <workspace-name>`<br>
`ng generate application <app-name> --skip-install`

Create libraries<br>
`ng generate library <library-name> --skip-install`

<br>

### **For each project:**
Change the package manager for the project to Yarn<br>
`cd <project-name>`<br>
`ng config cli.packageManager yarn`

Create / initialize package.json<br>
`yarn init`

<br>

### **Connect to GitHub**
Connect to remote repository (set up on GitHub)<br>
`git remote add origin <url>`

<br>

### **Install** 
Install packages<br>
`cd ../../`<br>
`yarn`

<br>

#### **Edit root package.json to enable Workspaces**
In package.json of root folder:
```
{
  "private": true,
  "workspaces": ["projects/*"]
}
```

<br>

### **Initialize root for git repo**
`git init`

#### **Ignore node_modules**
`code .gitignore`
```
# Ignore Mac system files
.DS_store

# Ignore node_modules folder
**/node_modules/*

# Ignore files related to API keys
**/env/*
```

<br>

### **GraphQL Setup**
In each project:<br>
`yarn add graphql @apollo/client`<br>
In workspace root:<br>
`yarn add -W -D @graphql-codegen/cli`<br>
-W = workspace<br>-D = add to dev dependencies<br>

Initialize graphql-code-generator<br>
`yarn graphql-code-generator init`
* Can use defaults and edit `codegen.yml` manually
* Need URL of GQL instance
<br>

Add GraphQL module to library<br>


Run GQL generator<br>
* Need `x-hasura-admin-secret/x-hasura-access-key` for Hasura (from environments)
  * How to share common environment settings? From lib?

---

---

<br>

## Updating the Projects

### **Update Angular CLI globally**
Administrator (Windows) or add `sudo`<br>
`npm uninstall -g angular-cli`<br>
`npm i -g @angular/cli@latest`<br>

### **Update Angular CLI per project**
From each PROJECT root folder:
`ng update @angular/cli @angular/core`

<br>

---

---

<br>

## Reference

#### Multiple Angular projects structure
https://angular.io/guide/file-structure#multiple-projects

#### Yarn with Angular
https://upmostly.com/angular/using-yarn-with-angular

#### Yarn Workspaces
https://classic.yarnpkg.com/lang/en/docs/workspaces/

#### Angular library creation
https://javascript.plainenglish.io/create-angular-library-2022-3965beee6dc6

#### GraphQL Code Generator Install
https://www.graphql-code-generator.com/docs/getting-started/installation

<br><br>

#### Old Dive Inn Site
https://dev.diveinndenver.com/Home

#### CSS / JS 3d transform follow mouse
https://codepen.io/onge/pen/NPGaGP

#### Design example from Dayna
https://www.roomformilly.com/