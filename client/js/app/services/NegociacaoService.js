class NegociacaoService{
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

}