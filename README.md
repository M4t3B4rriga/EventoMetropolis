
# Proyecto Final : Eventos Metropolis
### Nombres: ARMAS - BARRIGA - BASURTO - RIVADENEIRA
### NRC: 14900
### Fecha: 03/03/2024


## Instalación: 
1. Instalación de dependencias para el frontend, ingresamos a la termina y ejecutamos
``` cmd 
npm install
```
2. Instalacion de dependencias para el backend, ingresamos a la termina y ejecutamos
``` cmd 
npm install
```
3. Creamos un archivo en el frontend .env e ingresamos los siguientes campos: 
``` cmd 
PORT = YOU_PORT
EMAIL_USER = YOU_EMAIL
EMAIL_PASSWORD = YOU_PASSWORD
SUPABASE_URL = YOU_SUPABASE_URL
SUPABASE_KEY = YOU_SUPABASE_KEY
```
4. Creamos un archivo en el backend .env e ingresamos los siguientes campos:  
``` cmd 
VITE_FIREBASE_API_KEY =  YOU_FIREBASE_KEY
VITE_SUPABASE_URL = YOU_SUPABASE_URL 
VITE_SUPABASE_KEY =  YOU_SUPABASE_KEY
```

5. Ingresamos al backend e ingresamos lo siguiente para levantar el backend:
``` cmd 
cd backend 
npm run start
```
6. Ingresamos al frontend e ingresamos lo siguiente para levantar el frontend:
``` cmd 
cd frontend 
npm run dev
```
## Tecnologias utilizadas Frontend:
### Firebase: 
Firebase es una plataforma de desarrollo de aplicaciones en la nube que ofrece una variedad de servicios y herramientas para simplificar y acelerar el desarrollo de aplicaciones web y móviles.
Implementamos firebase para el uso del login de nuestra página web al igual que el usuario se guarda en el Supabase.
### Normalize.css:
Usamos normalice para los estilos de nuestra pagina web ya que hace que los navegadores muestren todos los elementos de manera más consistente y acorde con los estándares modernos. Además que se solo se dirige precisamente solo a los estilos que necesitan normalizarse. 
### React: 
Reac utilizamos para construir interfaces de usuarios interactivas y reactivas. Para el uso de rutas usamos lo que es react router dom que es una librería que maneja rutas en aplicaciones de react, esta nos provee de componentes y hooks para realizar navegación y manejo de rutas de forma sencilla. 
Usamos de igual manera lo que es react dom 
### PayPal:
Para nuestro sistema de pagos usaremos lo que es la API de PayPal ya que esta nos permitirá integrar esta funcionalidad de pago y de transacciones en nuestra página web.

## Tecnologías utilizadas Backend: 
### Supabase: 
Para nuestra base de datos de los eventos usaremos la base de datos Supabase que es una plataforma de backend open source que permite agregar funcionalidad como autenticaciones, base de datos y almacenamiento a aplicaciones web y móviles de forma simple. 
### Cors:
Usamos para para el mecanismo de seguridad de los navegadores web que restringe las peticiones HTTP entre los dominios diferentes. Su función es prevenir que un sitio web pueda realizar solicitudes AJAX a otro sitio web sin permiso, como medida de seguridad.

### Express: 
 Express simplifica la construcción de servicios web robustos y escalables en Node.js.
### Nodemailer:
Usamos nodemailer para poder enviar los correos a los clientes ya que esa es su funcionalidad. Además, nos permite configurar un servidor de emails para registrar nuevos usuarios, enviar notificaciones, alertas o confirmaciones de forma simple.
### Nodemon: 
Usamos nodemon para monitorea cambios en el código fuente de una aplicación Node.js y reinicia automáticamente el servidor.
### Pug: 
 Es un motor de plantillas popular para Node.js que se utiliza para generar código HTML mediante una sintaxis más simple y legible. La usamos para lo que es la platilla para el correo. 