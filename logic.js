function fabrica() {

    var lista = [];
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

//Creamos la pieza especifica,mecanica
    function piezaMecanica(material) {
        this.material = material;
    }

    piezaMecanica.prototype = new Pieza; //Creamos la herencia de Pieza->piezaMecanica


//falta hacer que el boton cambie una variable que cambie el numero de piezas a fabricar
//por defecto esta en crear 100 piezas
//falta imprimir todo lo que se ha hecho
    /*String a mostrar como resultado es (Piezas totales: La factoría ha fabricado XX de las cuales YY son
    de tipo eléctrico y ZZ son de tipo mecánico. De las eléctricas, la estación de tratamiento ha aplicado
    barniz normal a AA y ha aplicado barniz especial a BB. De las mecánicas ha galvanizado CC, ha pintado
    DD y ha pulido EE.)*/

//Proceso en factoría
    function Factoria() {
        var contadorE = 0;
        var contadorM = 0;
        this.generarPieza = function () {

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
            var escrito = "Piezas totales: La factoria ha fabricado " + (contadorE + contadorM) + " piezas, de las cuales " +
                contadorE + " son de tipo electrico y " + contadorM + " son de tipo mecanico";
            var devuelve = [nuevaPieza, escrito];
            return devuelve;
        }


        function generadorCodigo() {
            var codigo = "";
            do {
                codigo += (Math.random() * 10).toFixed(0).toString();
            } while (codigo.length < 10);

            return codigo;
        }

        function generadorFecha() {
            var fecha = new Date();
            var f = fecha.getDate() + " / " + (fecha.getMonth() + 1) + " / " + fecha.getFullYear() + " - " + fecha.getHours() + ":" + fecha.getMinutes();

            return f.toString();
        }
    }


//Proceso en estación de tratamiento
    function estacionTratamiento() {
        var contador = [0, 0, 0, 0, 0];

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

            var escrito=" De las eléctricas, la estación de tratamiento ha aplicado " +
                "barniz normal a "+contador[0]+" y ha aplicado barniz especial a "+contador[1]+". De las mecánicas ha galvanizado "+contador[2]+", ha pintado " +
                contador[4]+" y ha pulido "+contador[3]+".";
            var devuelve=[pieza,escrito];
            return devuelve;
        }
    }

    this.fabricacion = function (nVeces) {
        var fact = new Factoria();
        var est = new estacionTratamiento();
        var procEs;
        var piezaEs;
        for (var i = 0; i < nVeces; i++) {
            piezaEs=fact.generarPieza();
            procEs = est.tratamientoPiezas(piezaEs[0]);
            lista.push(procEs[0]);
        }
        document.getElementById("resultado").innerHTML=piezaEs[1]+" "+procEs[1];
        //alert(piezaEs[1]+" "+procEs[1]);
    }
}
document.getElementById("boton1").addEventListener("click",function(){
    var fab = new fabrica();
    fab.fabricacion(document.getElementById("boton1").value);
});

document.getElementById("boton2").addEventListener("click",function(){
    var fab = new fabrica();
    fab.fabricacion(1000);
});


