/* Se declaran variables globales y un array para introducir cada número que se genere aleatoriamente y poder comparar si
los siguientes números ya están en el array. */
let numero;
let indice;
let boton;
cajon = new Array();

//Esta función se encarga de inicializar todo el código mediante el click al botón.
function comenzar() {
    audio = document.getElementById("miaudio");
    boton = document.getElementById("boton");
    boton.addEventListener("click", mezclar, false);
}

/* Las funciones "numerosaleatorios", "mezclar" y "pararintervalos" hacen que los números se muevan al azar al presionar el
botón. Esto se da gracias a un intervalo que se detiene al terminar el sonido */
function numerosaleatorios() {

    let numerorandom = parseInt(Math.random() * 75 + 1);

    if (numerorandom >= 1 && numerorandom <= 15) {
        elnumero.innerHTML = "B" + numerorandom;
    } else if (numerorandom >= 15 && numerorandom <= 30) {
        elnumero.innerHTML = "I" + numerorandom;
    } else if (numerorandom >= 31 && numerorandom <= 45) {
        elnumero.innerHTML = "N" + numerorandom;
    } else if (numerorandom >= 46 && numerorandom <= 60) {
        elnumero.innerHTML = "G" + numerorandom;
    } else if (numerorandom >= 61 && numerorandom <= 75) {
        elnumero.innerHTML = "O" + numerorandom;
    }
}

function mezclar() {

    intervalo = setInterval(numerosaleatorios, 70);
    sonar();
    boton.disabled = true;

}

function pararintervalos() {
    clearInterval(intervalo);
}

//Función para el sonido de ruleta. El código corre al terminar el sonido.
function sonar() {
    audio.play();
    audio.onended = function () {
        pararintervalos();
        validar();
    }
}

//Esta función obtiene un número al azar entre 1 y 75 (se especifica el límite mediante el 75).
function obtenerNumero() {
    numero = parseInt(Math.random() * 75 + 1);
}

/*Esta función se encarga de validar si el número ya existe en el array. Si el número generado es nuevo, se salta la 
validación y llama a la función "agregar" para hacer push al número en el Array. Si es un número repetido, entra en la 
condición hasta obtener un número que no exista en el array.*/
function validar() {

    obtenerNumero();
    indice = cajon.indexOf(numero)

    if (indice > -1) {
        //Se usa un bucle "do-while" con el fin de que se ejecute la instrucción al menos una vez y pueda validar.
        do {
            obtenerNumero();
            //Se usa la variable "control" para controlar el ingreso al "else if" después de que pase por el "if".
            let control = false;
            cajon.forEach(function (item) {

                if (numero == item) {
                    /*Entra en el if luego de recorrer todo el array con el "forEach", pues detectó que el número generado ya existe. El bucle
                    continuará ejecutándose hasta encontrar un número nuevo. */
                    indice = -1;
                    control = true;

                } else if (numero != item && control == false) {
                    /*Entrará en el "else if" solo si el número generado es diferente de los números del array y si la variable control es falsa.
                    La variable "indice" cambia a "-2" para salir del bucle. */
                    indice = -2;
                }
            })
        } while (indice == -1);        
    }
    agregar();
}

//Esta función agrega los números al array mediante un "push". Se llama a la función "colorear" para pintar la tabla.
function agregar() {

        let elnumero = document.getElementById("elnumero")
        cajon.push(numero);

        if (numero >= 1 && numero <= 15) {
            elnumero.innerHTML = "B" + numero;
        } else if (numero >= 15 && numero <= 30) {
            elnumero.innerHTML = "I" + numero;
        } else if (numero >= 31 && numero <= 45) {
            elnumero.innerHTML = "N" + numero;
        } else if (numero >= 46 && numero <= 60) {
            elnumero.innerHTML = "G" + numero;
        } else if (numero >= 61 && numero <= 75) {
            elnumero.innerHTML = "O" + numero;
        }

        document.getElementById("ding").play();
        colorear(numero); 
}

//Esta función pinta las casillas de la tabla de acuerdo al número en cuestión. Se guarda la tabla en una variable.
function colorear(numero) {

    cuadricula = document.getElementById("cuadricula");

    let numerotexto = numero.toString();
    /*El número obtenido se convierte a texto para poder ser comparado posteriormente con los números de la tabla.
    La tabla se recorre con 2 for: el primero recorre las filas; al interior hay otro for que recorre cada celda y, 
    dentro de este,    hay un if para comparar si el número en cuestión es el mismo que está leyendo el for. Si es así,
    se pinta.*/
    for (let i = 0, j = cuadricula.rows.length; i < j; i++) {
        for (let k = 0, l = cuadricula.rows[i].cells.length; k < l; k++) {

            if (numerotexto == cuadricula.rows[i].cells[k].innerHTML) {

                cuadricula.rows[i].cells[k].style.background = "rgb(224, 202, 3)";

            }
        }
    }
    if (cajon.length < 75) {
        boton.disabled = false;
    } else if (cajon.length == 75) {
        boton.disabled = true;        
    }
}

//Evento que permite cargar el JS luego de cargar el HTML.
window.addEventListener("load", comenzar, false);