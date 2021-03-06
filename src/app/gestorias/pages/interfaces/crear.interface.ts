
export interface CrearResponse {
  id: number;
  permiso: string;
  ubicacion: string;
  estado: string;
  municipio: string;
  vigencia: string
  fechareq: string;
  fechavencimiento: string;
  area: string;
  idestado: number;
  idUser: string;
}

export interface CrearComentario {
  id: number;
  idUser: number;
  usuario: string;
  comentario: string;
  fechaCreacion: string;
  idRequerimiento: number;
  idComentarioReply: number;
}

export interface UsuariosResponse{
  id: number;
  name: string;
  username: string;
  created : string;
  role : [string];
  areaID : string;
  email : string;
}

export interface RolesResponse{
  id : number;
  role : string;
  description : string;
  enabled : string;
}

export interface ArchivosResponse{
  name: string;
  url:string;
  typeFile:string;
}