export interface IUsuario {
    nome:string;
    login:string;
    email: string;
    senha: string;
    codSetor: number;
    codUsuario: number; 
}

export interface IUsuarios {
    usuarios: IUsuario[]
}
