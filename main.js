// este es un evento que dice que en cuanto cargue el documento leas el contenido que voy a poner
document.addEventListener('DOMContentLoaded', () => {

    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Aretes',
            precio: '50',
            imagen: 'arete.jpeg'
        },
        {
            id: 2,
            nombre: 'Lentes',
            precio: '190',
            imagen: 'lentes.jpeg'
        },
        {
            id: 3,
            nombre: 'Bolsa',
            precio: '230',
            imagen: 'bolsa.jpeg'
        },
        {
            id: 4,
            nombre: 'Zapatos',
            precio: '300',
            imagen: 'zapatos.jpeg'
        }
    ]
    // aqui están todos los elementos que usaré
    let carrito = []
    const divisa = '$'
    const DOMItems = document.querySelector('#items')
    const DOMCarrito = document.querySelector('#carrito')
    const DOMTotal = document.querySelector('#total')




    // funcionalidades
    function renderizarProductos() {
        // for each recorre cada elemento, recibe en su argumento instrucciones
        baseDeDatos.forEach((info) => {
            // estructura del card
            const miNodo = document.createElement('div')
            miNodo.classList.add('card', 'col-sm-4')
            // contenido
            const miNodoCardBody = document.createElement('div')
            miNodoCardBody.classList.add('card-body')
            // titulo
            const miNodoTitle = document.createElement('h5')
            miNodoTitle.classList.add('card-title')
            miNodoTitle.textContent = info.nombre
            // imagen
            const miNodoImagen = document.createElement('img')
            miNodoImagen.classList.add('card-img-top')
            miNodoImagen.setAttribute('src', info.imagen)
            // precio
            const miNodoPrecio = document.createElement('p')
            miNodoPrecio.classList.add('card-text')
            miNodoPrecio.textContent = divisa + ' ' + info.precio
            // boton
            const miNodoBoton = document.createElement('button')
            miNodoBoton.classList.add('btn', 'btn-primary')
            miNodoBoton.textContent = '+'
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anadirProductosAlCarrito);
            // console.log(info)

            // armado del elemento card
            miNodoCardBody.appendChild(miNodoImagen)
            miNodoCardBody.appendChild(miNodoTitle)
            miNodoCardBody.appendChild(miNodoPrecio)
            miNodoCardBody.appendChild(miNodoBoton)
            miNodo.appendChild(miNodoCardBody)

            DOMItems.appendChild(miNodo)
        })

    };



    //  funcion para renderizar carrito
    function renderizarCarrito() {
        //    primero limpiar el carrito
        // spread ... sirve para concatenar a un arreglo lo que sea que haya dentro de un objeto
        DOMCarrito.textContent = '';
        //    quitamos los duplicados del carrito, el operador set elimina duplicados
        const carritoSinDuplicados = [...new Set(carrito)];

        //    generamos los elementos para mostrar a partir del carrito

        carritoSinDuplicados.forEach((item) => {

            console.log(item)

            const miItem = baseDeDatos.filter((itemBaseDeDatos) => {
                return itemBaseDeDatos.id === parseInt(item)
                //   parse int garantiza que me de un valor numerico entero y aqui lo usaremos para verificar si coincide con algun id de la base de datos
                //    la diferencia entre filter y find es que filter trae literla por filtro varias cosas y find solo trae una cosa
            });


            // contar numero de veces que se repite un producto (reduce sirve para reestructurar de muchas formas) el reduce se usa en un arreglo y recibe una funcion con lo que quiero hacer, su valor inicial es como estaba el carrito antes y luego como está ahora
            const numeroDeUnidadesItem = carrito.reduce((total, itemID) => {
                return itemID === item ? total += 1 : total //esto es como un if else en una sola linea
            }, 0)


            console.log(miItem)


            const miNodo = document.createElement('li')
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2')
            miNodo.textContent = `${numeroDeUnidadesItem} * ${miItem[0].nombre} -> ${miItem[0].precio} ${divisa}`;

            //aqui vamos a agregar el boton para eliminar cada elemento del carrito
            //----------------

            //agregamos los nodos al carrito
            DOMCarrito.appendChild(miNodo)
            // funcion para mostrar total del carrito

            DOMTotal.textContent = calcularTotal();

        });

        //-----------



    }



    function anadirProductosAlCarrito(evento) {
        console.log(evento.target.getAttribute('marcador'));
        //añadimos el nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'));
        //actualizarCarrito
        renderizarCarrito()

    }

    function calcularTotal() {
        return carrito.reduce((total, item) => {

            const miProducto = baseDeDatos.filter((itemBaseDeDAtos) => {
                return itemBaseDeDAtos.id === item

            })

            return total + miProducto.precio;

        }, 0)
    }

    renderizarProductos();

})



