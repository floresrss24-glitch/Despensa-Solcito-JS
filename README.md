# Despensa Solcito
Sitio web estático (HTML, CSS y JavaScript). Se abre directamente `index.html`.

proyecto/
├── index.html, producto.html, promociones.html, blog.html,
│   sobre_nosotros.html, contactos.html, compras.html,
│   configuracion.html, login.html, curso.html, cv.html,
│   preguntas_frecuentes.html
|
├── categorias/
│   └── bebidas.html
|
├── css/
│   ├── style.css            estilos generales, modo oscuro y componentes
│   └── <pagina>.css         estilos propios de cada página
|
├── js/
│   ├── funciones/           código reutilizable
│   │   ├── tema.js              modo oscuro (guarda la preferencia)
│   │   ├── menus.js             menú de perfil y enlace activo
│   │   ├── fecha-hora.js        fecha y hora en tiempo real
│   │   ├── alerta.js            saludo de bienvenida
│   │   ├── validaciones.js      validación de formularios [data-validar]
│   │   ├── resumen-formulario.js resumen de formularios [data-resumen]
│   │   └── galeria.js           visor de imágenes [data-galeria]
|   |
│   └── paginas/             código de una sola página
│       ├── inicio.js, compras.js, contactos.js,
│       └── configuracion.js, login.js
|
└── img/
    ├── marca/  iconos/  productos/  fotos/


Reglas: nombres de archivo en minúscula, un CSS y un JS de página por cada
página que lo necesite, y scripts al final del `<body>`.

#	Punto	                  | Dónde está	                                                          | Estado
1	Saludo al cargar	      | alerta.js en index.html: alert("¡Bienvenido a Despensa Solcito!…")	  | Hecho
2	Validación de formularios | validaciones.js en Contactos y Compras, y login.js en Login	          | Hecho, con la corrección de abajo
3	Fecha y hora	          | fecha-hora.js en index.html, con Date() y setInterval() cada segundo  | Hecho
4	Menú desplegable	      | Menú “Mi perfil”, que se abre y cierra con clic, clic afuera o Escape | Hecho
5	Galería	                  | galeria.js en categorias/bebidas.html	                              | Hecho, con una aclaración
6	Modo oscuro	              | Interruptor en configuracion.html y tema.js, que alterna la clase     | Hecho, con una aclaración
                              | modo-oscuro	                                                          |
7	Resumen de formulario	  | resumen-formulario.js en compras.html	                              | Hecho

Correcion del punto 2: Contactos y Compras dejaban que el navegador validara solos, así que aparecía el globito del navegador y no el mensaje debajo del campo. Ahora validaciones.js desactiva esa validación nativa, y los mensajes personalizados aparecen debajo de cada campo (vacío, formato de correo, casilla sin marcar, opción sin elegir). Además lleva el cursor al primer campo con error. Probé que Contactos muestra “Este campo es obligatorio” y “Ingresá un correo electrónico válido”, y que Compras no muestra el resumen hasta que todo está completo.

Aclaraciones/ideas a futuro:
Galería: la ampliada se abre al hacer clic en las dos imágenes de Bebidas (Coca Cola y Pepsi), con botones anterior y siguiente. No son miniaturas en una tira por la falta elementos. Importante: Agregar mas imagenes de productos
Interruptor del tema: solo está en Configuración. Funciona y el tema se aplica a todo el sitio, pero hay que entrar al menú de perfil para cambiarlo. Puedo agregar un botón luna/sol en el encabezado de todas las páginas.
Menu desplegable: el punto 4 pedía “menú desplegable o acordeón”, y el menú desplegable ya lo cumple. Tambien podria sumar un acordeón, preguntas_frecuentes.html es el lugar natural.