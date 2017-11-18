//Creamos el objeto fabrica que contendrá las piezas y las estaciones
function fabrica() {

    var lista = []; //Lista para guardar las piezas
    var subtiposE = ["Placa ABS", "Centralita encendido", "Bornes cableado", "Alternador", "Encendido"];
    var subtiposM = ["Larguero inferior", "Guardabarros", "Larguero superior", "Subchasis", "Puerta"];
    var voltajes = ["3,3", "5", "12", "240"];
    var potencias = ["1", "5", "10", "20"];
    var materiales = ["Acero", "Titanio", "Carbono"];

    //Creamos el objeto padre, pieza
    function Pieza(subtipo, codigo, fecha, procesamiento) {
        this.subtipo = subtipo;
        this.codigo = codigo;
        this.fecha = fecha;
        this.procesamiento = procesamiento;
    }

    //Creamos la pieza especifica, electrica
    function piezaElectrica(potencia, voltaje) {
        this.potencia = potencia;
        this.voltaje = voltaje;

    }

    piezaElectrica.prototype = new Pieza; //Creamos la herencia de Pieza->piezaElectrica

    //Creamos la pieza específica, mecánica
    function piezaMecanica(material) {
        this.material = material;
    }

    piezaMecanica.prototype = new Pieza; //Creamos la herencia de Pieza->piezaMecanica


    //Proceso en factoría
    function Factoria() {
        var contadorE = 0;
        var contadorM = 0;
        this.generarPieza = function () {
            //Genera al azar una pieza eléctrica o mecánica según criterio establecido
            if (Math.floor((Math.random() * 100)) < 30) {
                var nuevaPieza = new piezaElectrica(potencias[Math.floor((Math.random() * 4))], voltajes[Math.floor((Math.random() * 4))]);
                nuevaPieza.subtipo = subtiposE[Math.floor((Math.random() * 5))];
                do {
                    nuevaPieza.codigo = generadorCodigo() + "E";
                } while (lista.includes(nuevaPieza.codigo));
                contadorE++;
            } else {
                var nuevaPieza = new piezaMecanica(materiales[Math.floor((Math.random() * 3))]);
                nuevaPieza.subtipo = subtiposM[Math.floor((Math.random() * 5))];
                do {
                    nuevaPieza.codigo = generadorCodigo() + "M";
                } while (lista.includes(nuevaPieza.codigo));
                contadorM++;
            }
            nuevaPieza.fecha = generadorFecha();
            //Generamos el string parcial de la creación de piezas
            var escrito = "Piezas totales: La factoria ha fabricado " + (contadorE + contadorM) + " piezas, de las cuales " +
                contadorE + " son de tipo electrico y "+"<br>" + contadorM + " son de tipo mecanico";
            var devuelve = [nuevaPieza, escrito]; //Devolvemos el string y la pieza
            return devuelve;
        }

        //Generador de la variable código. La misma lista no tiene dos códigos iguales
        function generadorCodigo() {
            var codigo = "";
            do {
                codigo += (Math.random() * 10).toFixed(0).toString();
            } while (codigo.length < 10);

            return codigo;
        }
        //Generador de la variable fecha
        function generadorFecha() {
            var fecha = new Date();
            var f = fecha.getDate() + " / " + (fecha.getMonth() + 1) + " / " + fecha.getFullYear() + " - " +
                fecha.getHours() + ":" + fecha.getMinutes();

            return f.toString();
        }
    }


    //Proceso en estación de tratamiento
    function estacionTratamiento() {
        //Variable para facilitar la cuenta para mostrar en el string
        var contador = [0, 0, 0, 0, 0];//0=barnizada normal, 1=barnizada especial,2=galvanizada,3=pulida,4=pintada.
        this.tratamientoPiezas = function (pieza) {
            pieza.procesamiento = "";
            if (pieza.codigo.endsWith("E")) {
                if (pieza.potencia == 1 || pieza.potencia == 5) {
                    pieza.procesamiento = "Barnizada normal";
                    contador[0]++;
                } else {
                    pieza.procesamiento = "Barnizada especial";
                    contador[1]++;
                }
            } else if (pieza.codigo.endsWith("M")) {
                if (pieza.material == "Acero") {
                    pieza.procesamiento = "Galvanizada";
                    contador[2]++;
                } else if (pieza.material == "Titanio") {
                    pieza.procesamiento = "Pulida";
                    contador[3]++;
                } else if (pieza.material == "Carbono") {
                    pieza.procesamiento = "Pintada";
                    contador[4]++;
                }
            }

            var escrito = " De las eléctricas, la estación de tratamiento ha aplicado" +
                " barniz<br> normal a " + contador[0] + " y ha aplicado barniz especial a " + contador[1] +
                ". De las mecánicas ha galvanizado " + contador[2] + ", ha <br> pintado " +
                contador[4] + " y ha pulido " + contador[3] + ".";
            var devuelve = [pieza, escrito];//Hacemos lo mismo que en la creación de las piezas recogiendo la pieza y el string a mostrar
            return devuelve;
        }
    }
    //Generamos la función que permite crear las piezas, recibiendo como parámetro el número de las mismas
    this.fabricacion = function (nVeces) {
        //Borramos la tabla al darle al botón de generar piezas
        var tabla = document.getElementById("egt");
            while (tabla.rows.length >1) {
                tabla.deleteRow(-1);
            }

        var fact = new Factoria();
        var est = new estacionTratamiento();
        var procEs;
        var piezaEs;
        for (var i = 0; i < nVeces; i++) {
            piezaEs = fact.generarPieza();
            procEs = est.tratamientoPiezas(piezaEs[0]);
            lista.push(procEs[0]);
        }
        //Juntamos los dos string con el resultado
        document.getElementById("resultado").innerHTML = piezaEs[1] + " " + procEs[1];


    }
    //Creamos la tabla de manera procedural, tal que cada variable célula es una casilla de la tabla
    //y creamos una fila por elemento
    //La tabla mostrará todas las piezas fabricadas hasta el momento
    document.getElementById("boton3").addEventListener("click", function () {
        var table = document.getElementById("egt");
        var fila;
        var celulaNumero;
        var celulaCodigo;
        var celulaSub;
        var celulaProc;
        var celulaFecha;
        var celulaMat;
        var celulaPot;
        var celulaVol;
        for (var i = 0; i < lista.length; i++) {
            fila = table.insertRow(i + 1);
            celulaNumero = fila.insertCell(0);
            celulaCodigo = fila.insertCell(1);
            celulaSub = fila.insertCell(2);
            celulaProc = fila.insertCell(3);
            celulaFecha = fila.insertCell(4);
            celulaMat = fila.insertCell(5);
            celulaPot = fila.insertCell(6);
            celulaVol = fila.insertCell(7);

            celulaNumero.innerHTML = i + 1;
            celulaCodigo.innerHTML = lista[i].codigo;
            celulaSub.innerHTML = lista[i].subtipo;
            celulaProc.innerHTML = lista[i].procesamiento;
            celulaFecha.innerHTML = lista[i].fecha;
            if ((lista[i].material) != undefined) {
                celulaMat.innerHTML = lista[i].material;
            } else {
                celulaMat.innerHTML = "-------";
            }
            if ((lista[i].potencia) != undefined) {
                celulaPot.innerHTML = lista[i].potencia;
            } else {
                celulaPot.innerHTML = "-------";
            }
            if ((lista[i].voltaje) != undefined) {
                celulaVol.innerHTML = lista[i].voltaje;
            } else {
                celulaVol.innerHTML = "-------";
            }
        }
    });
}
//Asignamos la función a los botones
document.getElementById("boton1").addEventListener("click", function () {
    var fab = new fabrica();
    fab.fabricacion(document.getElementById("boton1").value);
});

document.getElementById("boton2").addEventListener("click", function () {
    var fab = new fabrica();
    fab.fabricacion(1000);
});

document.getElementById("about").addEventListener("click",function(){
    alert("Albaráñez Martínez, Javier\nCruz García, Iago");
});