# A2 Speak Mendoza · Exam Prep App

Aplicación web interactiva, moderna y optimizada para smartphones y desktop, diseñada para preparar el examen final de inglés (**ADULTS A2 II - Speak Mendoza**).

---

## ⚡ MODO SPRINT 60 MINUTOS (RINDO MAÑANA)

Preparado especialmente para un repaso intensivo de **1 hora** enfocado 100% en aprobar el **Examen Escrito**:

1. **Minutos 00–15 · Cheat Sheet (8 Reglas & Trampas Fijas):** Las trampas gramaticales y de vocabulario que más se cobran en el examen (`didn't + infinitivo`, `Past Simple vs Present Perfect con fecha`, `comparativos vs superlativos`, `las 4 formas de futuro`, `prohibida doble negación en pronombres indefinidos`, `preposiciones de viaje` y los `25 verbos irregulares clave`).
2. **Minutos 15–35 · 30 Preguntas de Alto Impacto:** Sesión guiada con las 30 preguntas de examen más representativas con retroalimentación explicativa inmediata.
3. **Minutos 35–50 · 3 Plantillas Salvavidas de Writing (*A First-Time Experience*):** Plantillas de 75-85 palabras (*Travelling alone*, *Trying sushi/new food*, *Driving a car*) con todos los conectores (*First, Then, Suddenly, However, Finally, because, so*) y carga en un clic al editor con checklist automático.
4. **Minutos 50–60 · Mini-Simulacro Exprés (15 min):** Examen cronometrado de 15 preguntas + Writing para validar tu puntaje antes de rendir.

---

## 🚀 Características Generales

- **Fase 1 (Examen Escrito):** Modo intensivo de gramática, vocabulario y taller guiado de *Writing*.
- **Fase 2 (Examen Oral):** Entrenador oral con preguntas por unidad, temporizador, banco de *fillers* y práctica con síntesis y reconocimiento de voz (Web Speech API).
- **Metodologías de estudio:**
  - **Active Recall:** Flashcards interactivas (verbos irregulares, life events, travel phrases).
  - **Spaced Repetition (SRS):** Sistema Leitner de 5 cajas guardado en `localStorage`.
  - **Interleaving:** Práctica intercalada con retroalimentación inmediata y explicaciones.
- **Taller de Writing:** Estructura paso a paso para *a first-time experience*, banco clickeable de *linking words*, contador de palabras y checklist de autoevaluación.
- **Simulador de Examen:** Examen cronometrado (Grammar + Vocabulary + Writing) con desglose de puntaje sobre 100 y revisión de errores (opciones de 15, 30, 45 y 60 min).
- **Diseño & PWA:**
  - Optimizado para celulares (botones táctiles de 44px+, navegación inferior con safe-area).
  - Soporte de modo oscuro / claro.
  - PWA instalable con funcionamiento offline.

## 📱 Cómo abrirla

### Opción 1: En tu computadora
Abrir `index.html` con cualquier navegador moderno (Chrome, Edge, Firefox, Brave).

### Opción 2: En tu celular (Red local)
1. En la carpeta del proyecto, iniciá un servidor local:
   ```bash
   python -m http.server 8000
   ```
2. Desde tu celular conectado al mismo Wi-Fi, ingresá a:
   ```
   http://<IP-DE-TU-PC>:8000
   ```
3. Podés tocar en "Agregar a pantalla de inicio" para usarla como app nativa.

### Opción 3: GitHub Pages
En la configuración de este repositorio en GitHub:
1. Andá a **Settings** > **Pages**.
2. En **Build and deployment** > **Branch**, seleccioná `main` y la carpeta `/ (root)`.
3. Tocá **Save** y en 1 minuto tendrás la app online en:
   `https://axelIracheta2414.github.io/final-ingles/`
