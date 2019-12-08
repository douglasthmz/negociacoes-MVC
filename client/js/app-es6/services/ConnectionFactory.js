

    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'negociacoesDB';
    
    var connection = null;
    var close =null;

    export class ConnectionFactory{
        constructor(){
            throw new Error('Não é possível instanciar esta classe');
        }

        static getConnection(){
            return new Promise((resolve, reject)=>{
                let openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStore(e.target.result);
                };
                openRequest.onsuccess = e =>{
                    if(!connection) {
                        connection = e.target.result;
                        close=connection.close.bind(connection);
                        connection.close = function(){
                            throw new Error("não é possível fechar a conexão");
                        };
                    }
                    resolve(connection);
                };
                openRequest.onerror = e =>{
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }

        static _createStore(connection){
            stores.forEach(store =>{
                if(connection.objectStoreNames.contains(store)) 
                connection.deleteObjectStore

            connection.createObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection(){
            if (connection) {
                close();
                connection=null;
            }
        }
    }


