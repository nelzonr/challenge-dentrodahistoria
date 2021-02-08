import { Injectable, HttpService } from '@nestjs/common';
import { Lgpd } from './lgpd';

@Injectable()
export class LgpdService {

    apiBase: string = 'https://iqm4d3s8w0.execute-api.us-east-1.amazonaws.com/dev';
    apiToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2Zha2UuZmFrZS5jb20iLCJleHAiOjE4OTczMDU5ODksImp0aSI6ImViNTJzZjlhLTg4OGMtNDk5OC0xMjM0LWUzM2M3NTk4NDBmNjMiLCJpYXQiOjE1ODYyNjU5ODksImlzcyI6Imh0dHBzOi8vZmFrZS5mYWtlLmNvbSIsInVzZXJfaWQiOjEyM30.Sp00QoOmeE7LzQfF2EjqUnHkt-ySwSPDKGFTVZh89E0';
    apiTentivasTimeOut = 5;

    dados: Lgpd;

    constructor (private readonly http: HttpService) { }
    
    async getById (id: number) {
        try {
            const dadosUsuario = await this.getUsuarioAPI(id);
            //console.log(id, dadosUsuario.data.email);
            if (dadosUsuario) {
                this.dados = {
                    email: dadosUsuario.data.email,
                    nome: dadosUsuario.data.firstName,
                    sobrenome: dadosUsuario.data.lastName,
                    documento: dadosUsuario.data.document,
                    pedidos: null,
                    historico: null
                };
                
                if (dadosUsuario.data.email) {
                    const dadosPedidos = await this.getPedidosAPI(dadosUsuario.data.email);
                    this.dados.pedidos = dadosPedidos;
                }

                if (dadosUsuario.data.searchKey) {
                    const dadosHistorico = await this.getHistoricoAPI(dadosUsuario.data.searchKey);
                    this.dados.historico = dadosHistorico;
                }

                return this.dados
            } else {
                return 'Usuário inexistente.';
            };
        } catch (error) {
            throw new Error('Não foi possível extrair os dados do usuário no momento.');
        }
    }

    async getUsuarioAPI (id: number) {
        const url = `${this.apiBase}/customer_service/user_data?user_id=${id}`;
        const headersRequest = {'Authorization': `Bearer ${this.apiToken}`};
        return this.http.get(url, { headers: headersRequest })
                .toPromise()
                .then(response => response.data)
                .catch(error => console.log(error));
    }

    async getPedidosAPI (email: string, tentativas = 1) {
        console.log(email, tentativas);
        const url = `${this.apiBase}/orders_service/my_orders`;
        const headersRequest = {'Authorization': `Bearer ${this.apiToken}`};
        const dadosPedidos = await this.http.post(url, {email: email}, { headers: headersRequest })
                                .toPromise()
                                .then(response => response.data)
                                .catch(error => {
                                    console.log(tentativas, error.response.status);
                                    if (error.response.status == 500 && tentativas <= this.apiTentivasTimeOut) {
                                        console.log('IF');
                                        return this.getPedidosAPI(email, tentativas + 1);
                                    } else {
                                        return 'Não foi possível extrair os dados de Pedidos no momento.';
                                    }
                                });
        
        //const pedidos = dadosPedidos.data.orders;
        //console.log(pedidos);
        //this.traduzirPedidos(pedidos);
        return this.traduzirPedidos(dadosPedidos.data.orders);
    }

    async getHistoricoAPI(searchKey: string, limit = 10, page = 1, dados = []) {
        const total = page * limit;
        const url = `${this.apiBase}/search_service/history?key=${searchKey}&limit=${limit}&page=${page}`;
        const headersRequest = {'Authorization': `Bearer ${this.apiToken}`};
        try {
            const dadosHistorico = await this.http.get(url, { headers: headersRequest })
                                            .toPromise()
                                            .then(response => response.data)
                                            .catch(error => console.log(error));

            const historico = dadosHistorico.data.map(item => ({
                data: item.createdOn,
                busca: item.subject,
                resultados: item.results
            }));
            dados.push(...historico);

            return dadosHistorico.totalItems > total ? 
                this.getHistoricoAPI(searchKey, limit, page + 1, dados) : dados;
        } catch (error) {
            throw new Error('Não foi possível extrair os dados de Histórico no momento.');
        }
    }

    traduzirPedidos (dados) {
        const mapa = {
            createdOn: 'dataCriacao',
            orderNumber: 'pedidoNumero',
            installments: 'parcelas',
            orderStatus: 'pedidoStatus',
            shippingStatus: 'entregaStatus',
            paymentStatus: 'pagamentoStatus',
            paymentMethod: 'pagamentoMetodo',
            orderSubtotal: 'pedidoSubtotal',
            orderShipping: 'pedidoFrete',
            orderTotal: 'pedidoTotal',
            orderDiscount: 'pedidoDesconto',
            paidOn: 'dataPagamento',
            shippingMethod: 'entregaMetodo',
            billingAddress: 'enderecoFaturamento',
            shippingAddress: 'enderecoEntrega',
            invoices: 'notasFiscais',
            items: 'itens'
        };

        let dadosArray: object[] = [];
        let dadosTraduzidos: any = {};
        const fnTraduzir = dado => Object.keys(mapa).map(k => {
            dadosTraduzidos[mapa[k]] = dado[k];

        });
        
        dadosArray.push(dados.map(dado => Object.keys(mapa).map(k => {
            dadosTraduzidos[mapa[k]] = dado[k];
        })));

        return dadosTraduzidos;
    }

}
