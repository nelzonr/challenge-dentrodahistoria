import { ApiProperty } from "@nestjs/swagger";

export class LgpdResponse {

    @ApiProperty()
    email: string;

    @ApiProperty()
    nome: string;

    @ApiProperty()
    sobrenome: string;

    @ApiProperty()
    documento: string;

    @ApiProperty()
    pedidos: any;

    @ApiProperty()
    historico: object;
}