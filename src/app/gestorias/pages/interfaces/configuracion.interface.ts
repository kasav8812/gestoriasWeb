export interface Catalogo {
    id: number;
    descripcion: string;
    comentario: string;
    enabled: boolean;
    activo: number;
}
export interface CatGeneric{
    id: number;
    descripcion: string;
    comentario: string;
    activo: number;
}

export interface RequerimientoGeneric{
  idRequerimiento: number;//
	folio: string;
	importe: string;
	paydate: string;
	registroContable: string;
	nombreContacto: string;
	proveedor: string;
	sistema: string;
	tipoSolicitud: string;
	folioEgreso: string;
	area: number;
	cc: string;
	nombreCc: string;
	postFin: string;
	incluidoPermiso: string;
	horario: string;
	perNeg: string;
	catidad: number;
	vigencia: number;
	medida: number;
	formaPago: string;
	cobertura: number;
	actividad: string;
	descripcion: string;
}
