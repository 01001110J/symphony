# Symphony

Symphony es un proyecto que permite crear pistas de audio utilizando inteligencia artificial con el modelo [facebook/musicgen-small](https://huggingface.co/facebook/musicgen-small). Además, ofrece la posibilidad de generar letras y títulos de canciones mediante la API de [Perplexity](perplexity.ai), facilitando así la búsqueda de inspiración. Symphony incluye un editor de audio sencillo pero eficaz, que permite editar y combinar múltiples pistas para crear piezas únicas y personalizadas.

![Screenshot 2024-08-06 021055](https://github.com/user-attachments/assets/9ef37626-8dc6-4e14-a0e5-9579b7008a8f)
![Screenshot 2024-08-06 021122](https://github.com/user-attachments/assets/9097aef0-1811-48a7-aa97-f5cbf1cf93d3)

### Repositorio de Código

https://github.com/01001110J/symphony

### Proyecto desplegado

https://symphony-alpha.vercel.app/

### Instrucciones de Configuración

## Set up

1. Crea un token en [Hugging Face](https://huggingface.co/settings/tokens), con este token se crean los audios.
2. Crea un token en [Perplexity](https://www.perplexity.ai/settings/api), esto nos permitirá crear los titulos de los audios y canciones.

### Para usar en local
3. Prepara el proyecto:

Instala las dependencias:
``` bash
  npm i 
```
- Inicia el proyecto en local
```bash
 npm run dev
```

- Agrega los tokens creados en los puntos 1 - 2, en el apartado de "settings" en home page .
- Tomar agua.
- Comienza a crear canciones.
