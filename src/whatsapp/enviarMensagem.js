async function enviarMensagem(destinatario,conteudo) {
    try{
        console.log('Enviando mensagem para ${destinatario}',conteudo);
        return{sucesso:true}

    }catch (error){
        console.error('Error ao se enviar mesnagem',error);
        return{sucesso:false,erro:error.message};
    }
}
module.exports = { enviarMensagem };