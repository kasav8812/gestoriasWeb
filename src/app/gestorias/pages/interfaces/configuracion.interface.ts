export interface Catalogo {
    id: number;
    descripcion: string;
    comentario: string;
    enabled: boolean;
    activo: number;
	selected:boolean;
	tpgregion:string;
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
	foliosap: string;
	folioseg:string;
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
	idUserAdmon:string;
	idUserAut:string;
	mIdUser:string;
}

export interface ActividadesModel{
	id:string;
	tpgcreqid:string;
	tpgcacid:string;
}

export interface CentroCModel{
	id: string;
	cc:string;
	nombreCC: string;
	responsableCC:string;
	enabled : number;
}