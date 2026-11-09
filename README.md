# Torneos EFIL

Pantalla de TV (Fire Stick) y panel de carga desde el celular para el campeonato.

- `public/app.html`: la app. `#admin` es el panel del celular y `#tv` es la pantalla de la tele.
- `api/data.js`: servidor chico (Vercel) que guarda y entrega los datos.
- `android/`: app para el Fire Stick. Lleva la pantalla adentro y guarda el último dato, así funciona sin internet.
- `.github/workflows/apk.yml`: compila el APK solo en GitHub.

## Puesta en marcha

### 1. GitHub
Creá un repositorio público llamado `efil-torneos` y subí todo el contenido de esta carpeta:

    git init && git add . && git commit -m "EFIL torneos"
    git branch -M main
    git remote add origin https://github.com/TU-USUARIO/efil-torneos.git
    git push -u origin main

Al subirlo, GitHub empieza a compilar el APK (todavía con una dirección de servidor de ejemplo).

### 2. Vercel
1. Importá el repositorio en Vercel (Add New, Project).
2. Antes de desplegar: en Storage creá un **Blob** y conectalo al proyecto.
3. En Settings, Environment Variables, creá `ADMIN_KEY` con la clave que quieras para cargar datos.
4. Desplegá. Te da una dirección como `https://efil-torneos.vercel.app`.

### 3. Conectar el APK con el servidor
Editá `android/app/src/main/assets/config.js` y poné tu dirección terminada en `/api/data`.
Al guardar el cambio, GitHub vuelve a compilar (tarda unos minutos).
El APK queda en: `https://github.com/TU-USUARIO/efil-torneos/releases/download/apk-latest/efil-tv.apk`

### 4. Panel del celular
Abrí `https://TU-PROYECTO.vercel.app/app.html#admin`, andá a Datos, escribí la clave y tocá Guardar clave.
Conviene agregarlo a la pantalla de inicio del celular.

### 5. Instalar en el Fire Stick
1. En el Stick instalá la app **Downloader**.
2. Ajustes, Mi Fire TV, Opciones para desarrolladores: permití instalar apps de origen desconocido para Downloader.
3. En Downloader pegá la dirección del APK e instalá.
4. Abrí **EFIL TV** desde Tus aplicaciones.

### 6. El día del campeonato
1. Dejá guardadas en el Stick la red del hotspot del celular y la de tu casa.
2. Prendé el hotspot en el club. El Stick se conecta solo.
3. En la app apretá **OK** del control para sincronizar. También sincroniza solo cada 5 minutos si hay conexión.
4. Sin conexión sigue rotando con los últimos datos descargados.

## Prueba antes de la fecha
Cargá un resultado desde el celular, sincronizá el Stick, apagá el hotspot, cerrá y abrí la app: tiene que seguir mostrando los datos.
