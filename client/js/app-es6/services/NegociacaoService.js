import {HttpService} from './HttpService';
import {ConnectionFactory} from '../services/ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService{
    constructor(){
        this._http=new HttpService();
    }
    
    obterNegociacoesDaSemana(){

        
        
        return this._http
            .get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('nao foi possivel fazer');

            }); 
    
       
    }



    obterNegociacoesDaSemanaAnterior(){

        
        
            return this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    throw new Error('nao foi possivel fazer anterior');
    
                }); 
            
    }
    obterNegociacoesDaSemanaRetrasada(){

            
        
                return this._http
                    .get('negociacoes/retrasada')
                    .then(negociacoes => {
                        return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    })
                    .catch(erro => {
                        console.log(erro);
                        throw new Error('nao foi possivel fazer retrasada');
        
                    });  
                

    }


    obterNegociacoes(){
        return  Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()   
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });
    }

    cadastra(negociacao){
        return ConnectionFactory
            .getConnection()
            .then(connection=>new NegociacaoDao(connection))
            .then(dao=>dao.adiciona(negociacao))
            .then(()=>'Negociacão adicionada com sucesso')
            .catch(erro =>{
                console.log(erro);
                throw new Error ('Não foi possível adicionar a negociação');
            });
    }

    lista(){
        return ConnectionFactory
                .getConnection()
                .then(connection=>new NegociacaoDao(connection))
                .then(dao=>dao.listaTodos())
                .catch(erro=>{
                    console.log(erro);
                    throw new Error('Não foi possivel listar');
                })
    }

    apaga(){
        return ConnectionFactory
            .getConnection()
            .then(connection =>new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Apagamento bem sucedido')
            .catch(erro=>{
                console.log(erro)
                throw new Error('Não foi possível apagar');
            });
        }

    importa(listaAtual){
        return this.obterNegociacoes()
            .then(negociacoes=>negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                    negociacao.isEqual(negociacaoExistente)))
            )
            .catch(erro=>{
                 console.log(erro);
                 throw new Error('não foi possível importar');
            })
    }
}