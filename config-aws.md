## Configurar el backend

Clonar el backend:

```bash
git clone https://github.com/JavierAhumadaCortes/backend-sportclub backend
```

Entrar a la carpeta del backend:

```
cd backend
```

Copiar el archivo .env desde el de demostración:

```
cp .env.example .env
```

Desplegar los contenedores para levantar los servicios.

```
sudo docker compose up -d –-build
```


---

## Configurar el frontend

Clonar el frontend:

```bash
git clone https://github.com/mcherrera-cl/sportlife-react frontend
```

Entrar a la carpeta del frontend:

```
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Publicar:

```bash
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/
```


Configuración nginx:

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo nano /etc/nginx/sites-enabled/default
```

```js
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Probar configuración y reiniciar servicio:

```
sudo nginx -t
sudo systemctl restart nginx
```

---

## Extras

Conectar a servidor:

```
ssh -i "sportlife-2.pem" admin@23.21.79.193
```