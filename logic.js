//Creamos el objeto padre, pieza
function Pieza(subtipo,codigo,fecha){
    this.subtipo=subtipo;
    this.codigo=codigo;
    this.fecha=fecha;
}

//Creamos la pieza especifica, electrica
function piezaElectrica(potencia,voltaje){
    this.potencia=potencia;
    this.voltaje=voltaje;
}

piezaElectrica.prototype=new Pieza; //Creamos la herencia de Pieza->piezaElectrica

//Creamos la pieza especifica,mecanica
function piezaMecanica(material){
    this.material=material;
}

piezaMecanica.prototype=new Pieza; //Creamos la herencia de Pieza->piezaMecanica
