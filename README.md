# encuestapp-mern-code
## Modificaciones
### Backend
1. agregue un .env con el puerto cambiado y la base de datos tambien
2. en el .env hay unos comentarios sobre las consideraciones que hay que tener con la base de datos
3. en el archivo app.js hay unos ajustes comentados (el codigo anterior esta comentado tambien)
4. en el bin/wwww.js esta el puerto cambiado por el del .env
5. agregue un Dockerfile nuevo. Lo + importante es que el puerto EXPOSE coincida con el port del .env. Lo otro es que copia el .env en el build de la imagen
   
### Frontend
1. agregue un archivo default.conf que configura el servidor NGINX
2. agregue un Dockerfile nuevo. Lo + importante es que cambia la configuracion de NGINX para que funcione nuestra app
3. en el .env.production actualice la url: http://encuestapp.local.cloud/api/

### K8S
1. Hay un deployment para cada codigo front y back. Igual service
2. La idea es que los port del dockerfile sean iguales a los targetport de los yaml 
3. El ingress tiene corregido los path y tiene un hostname encuestapp.local.cloud
4. Para usar el hostname es la ip de tu cluster en minikube y el hostaname ej: 198.162.49.2  encuestapp.local.cloud
