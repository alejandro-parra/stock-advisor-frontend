# Stock Advisor

Stock Advisor es una herramienta que visualiza datos historicos de la bolsa y simula la compra y venta de operaciones con un algoritmo predictivo de futuros precios.

## Manual de Instalación

### Herramientas necesarias

[NodeJS](https://nodejs.org/en/download/)

#### FrontEnd

[Angular](https://angular.io/guide/setup-local#install-the-angular-cli)

#### BackEnd

[Python](https://www.python.org/downloads/)

Asegurate de que se puede correr python desde cmd de manera global

Instalacion de librerias de python (utiliza 'pip3' en lugar de 'pip' si tienes python3) 
```bash
pip install pandas
pip install pandas_datareader
pip install numpy
pip install datetime
pip install matplotlib
```

Ejecuta este compando tanto en la carpeta de frontend como en la de backend despues de descargar los archivos de git
```bash
npm install
```

Es importante agregar un archivo llamado '.env' dentro de la carpeta de backend con los siguientes campos:

KEY (Se recomienda cambiar): Llave secreta con la cual encripta las contraseñas para guardarlas encriptadas en la base de datos

DATABASE_URL (No cambiar): URL de la base de datos de mongo

MAIL (Cambiar): Para utilizar [Nodemailer](https://nodemailer.com/usage/using-gmail/) con gmail sigue el siguiente [tutorial](https://security.google.com/settings/security/apppasswords)

MAIL_USER (Cambiar): Para utilizar [Nodemailer](https://nodemailer.com/usage/using-gmail/) con gmail sigue el siguiente [tutorial](https://security.google.com/settings/security/apppasswords)

PY (Verificar): Debe llevar el nombre con el que corres globalmente python en tu dispositivo. 
Ej: 'python', 'python3', 'py'.

SALT_ROUNDS (Se puede cambiar): Numero de rondas de encriptacion de contraseñas
```
KEY=ab12n23j3423DSA3
DATABASE_URL=mongodb+srv://stockmaster:kycpaco_280198@db.s775v.mongodb.net/StockAdvisor?retryWrites=true&w=majority
MAIL=secretgmailkey
MAIL_USER=example@gmail.com
SALT_ROUNDS=10
PY=python
```
## Ejecución


#### Frontend (desde la carpeta de frontend)
```
ng serve
```
#### Backend (desde la carpeta de backend)
```
node .
```

# StockAdvisor Angular README

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
