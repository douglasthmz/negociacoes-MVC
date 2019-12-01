class NegociacaoService{
    obterNegociacoesDaSemana(cb){
        let xhr=new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');
        //config
        xhr.onreadystatechange=()=>{
            if(xhr.readyState==4){
                if(xhr.status == 200){
                    
                    cb(null,JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    

                }else{
                    console.log(xhr.responseText);
                    cb('não foi possível obter as negociacoes');

                    
                }
            }

        };

        xhr.send();
    }

}