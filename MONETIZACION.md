# 💰 Cómo activar la monetización de TechGearLab

El sitio ya está preparado para ganar dinero con **Amazon Afiliados** y **Google AdSense**.
Solo tenés que completar 2 datos en un archivo. Mientras estén vacíos, no se rompe nada:
los botones de Amazon llevan a una búsqueda normal y no aparece ningún anuncio.

---

## 📍 Dónde se configura

Todo está en **un solo lugar**: el archivo `js/main.js`, en las primeras líneas:

```js
const MONETIZACION = {
  amazonTag: '',            // ← tu tag de Amazon Afiliados
  adsensePublisherId: '',   // ← tu ID de Google AdSense
  amazonDominio: 'es'       // es = España · com = EE.UU. · com.mx = México
};
```

---

## 🛒 1. Amazon Afiliados

1. Registrate gratis en **https://afiliados.amazon.es** (o `.com` / `.com.mx` según tu país).
2. Cuando te aprueben, te dan un **tag** con forma `algo-21` (ej: `techgearlab-21`).
3. Pegalo entre las comillas de `amazonTag`:
   ```js
   amazonTag: 'techgearlab-21',
   ```
4. Listo. Todos los botones "Ver precio en Amazon" pasarán a generar comisiones.

> ⚠️ Amazon exige tener el aviso de afiliados visible. Ya está incluido automáticamente
> al inicio de cada artículo y en el Aviso Legal.

---

## 📢 2. Google AdSense

1. Registrate en **https://adsense.google.com**.
2. Te van a pedir agregar tu sitio y verificarlo (por eso ya tenés las páginas legales ✓).
3. Cuando te aprueben, te dan un ID con forma `ca-pub-XXXXXXXXXXXXXXXX`.
4. Pegalo en `adsensePublisherId`:
   ```js
   adsensePublisherId: 'ca-pub-1234567890123456',
   ```
5. Activá los **Anuncios Automáticos** ("Auto Ads") desde el panel de AdSense.
   Google colocará los anuncios solo, en los mejores lugares.

> 💡 AdSense suele tardar unos días en aprobar un sitio nuevo y pide algo de tráfico
> y contenido. El sitio ya cumple los requisitos básicos.

---

## ✅ Resumen

| Paso | Qué hacés | Resultado |
|------|-----------|-----------|
| Amazon | Pegás tu `amazonTag` | Botones generan comisiones |
| AdSense | Pegás tu `adsensePublisherId` + activás Auto Ads | Aparecen anuncios pagados |

Después de editar `js/main.js`, guardá, hacé commit y subí los cambios. ¡Eso es todo!
