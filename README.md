# TEST - BACKEND AVILATEK

Primero copie y configure el archivo __.env__:

```
cp .env.example .env
```

Para generar un secret key para el __JWT__ abra el terminal y ejecute:

```
node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
```

una vez tenga el secret key para el uso local copielo en la variable de entorno __SECRET_JWT_SEED__

Para la base de datos puede hacer uso de servicios como __Mongo Atlas__.

Instalar las dependecias del proyecto con:
```
npm install
```

Para correr la aplicacion en modo desarrollo ejecute:
```
npm run dev
```

para correr la aplicacion en modo produccion
```
npm run start
```

Para ver la documentacion del proyecto
ir a la url: 
```
localhost:${port}/api-docs
```
