/**
* Esta clase se creo para representar la parte del mensaje que contiene los
* datos de la empresa
*/
export class Empresa{

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public id : string;
  public nombre : string;
  public nombreCompleto : string;
  public cuit : string;
  //---------------------------------------------//

  // parseo el mensaje
  constructor( empresa:any ){
    this.id = empresa.Id;
    this.nombre = empresa.Nombre;
    this.nombreCompleto = empresa.NombreCompleto;
    this.cuit = empresa.Cuit;
  }
}
