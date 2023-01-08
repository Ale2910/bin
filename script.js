
// Elementos
const resDiv = window.document.getElementById('res')
const input = window.document.getElementById('val')
const rad = window.document.getElementsByName('preferences')


// Se o rad for alterado, a div de resultados e o input são limpos
rad[0].onchange = () => [
    input.value = '',
    input.focus(),
    resDiv.innerHTML = '<strong>(esperando gerar)</strong>', 
    input.placeholder = 'Num. decimal',
    input.title = 'Digite aqui o número decimal que você quer converter em binário'
]

rad[1].onchange = () => [
    input.value = '',
    input.focus(),
    resDiv.innerHTML = '<strong>(esperando gerar)</strong>', 
    input.placeholder = 'Num. binário',
    input.title = 'Digite aqui o número binário que você quer converter em decimal'
]


// Funções
function numToBin () {

    // Declarando um valor
    const num = Number(input.value)


    // Verificando
    if (parseInt(num) !== num) {
        return `err: Digite um valor inteiro! Fornecido: ${num}, sugestão: ${parseInt(num)}`
    }
    
    // Valores
    let res = ''
    let length = ''
    let lastChar = ''


    // Só falta resolver o problema das vezes que o laço é executado (a partir de 12)
   for(let i = 0; i <= num; i++) {

        // Pegando o último caractere
        lastChar = res.charAt(res.length - 1)

        // Se res estiver vazio ele vira 0
        if(!res) {
            res = '0'


         // Se o último char for 0
        } else if(lastChar == '0') {

            for(let z = res.length - 1; z >= 0; z--) {


                if(res.charAt(z) == '0') {

                    // Transformando o 0 em 1
                    res = res.split('')
                    res[z] = '1'
                    res = res.join('')
    
                    // Parando o laço
                    break
                }
            }

         // Se for 1    
        } else if(lastChar == '1') {

            // Laço que vai caçar um número 0 pra virar 1, se n tiver, zera tudo e add 1 na frente
            for(let z = res.length - 1; z >= 0; z--) {


                // Procurando um 0
                if(res.charAt(z) == '0') {

                    // Separando o res e ransformando o 0 em 1
                    res = res.split('')
                    res[z] = '1'

                    // Zerando os num que tem dps do 1
                    for(let x = z + 1; x < res.length; x++) {
                        res[x] = '0'
                    }

                    // Juntando tudo numa string
                    res = res.join('')
    
                    // Parando o laço
                    break
                    

                 // Se for a última verificação e o cod acima for negado
                } else if(z == 0) {


                    // Zerando o res e add 1 na frente
                    length = res.length
                    res = '1'
    
                    for(let x = length; x > 0; x--) {
    
                        res += '0'
                    }
                }
            }
        }
   }


   // Retornando o resultado
    return res
}

function binToNum () {
    
    // Declarando um valor (precisa ser string)
    let num = input.value

    // Se conter algum número que não seja 0 ou 1
    for(let i = 2; i <= 9; i++) {

        if(num.includes(i)) {
            return 'err: O valor não pode conter números diferentes de 0 ou 1!'

        } else if ( parseInt( Number(num) ) !== Number(num) ) {
            
            return `err: Um número binário não pode ser decimal! Fornecido: ${num}, sugestão: ${parseInt(num)}`
        }
    }


    // === //
    
    // Valores
    let res = []
    let res2 = []
    let char = 0

    // Fazendo parte da conta
    for(let i = num.length - 1; i >= 0; i--, char++) {

        res.push( num.charAt(char) * 2**i ) 
    }

    // Se o arr for ímpar, a gente faz ficar par
    if(res.length % 2 !== 0) {
        res.push(0)
    }

    // === //

    // Laço soma os resultados
    for(let i = 0; i < res.length; i += 2){
        res2.push( res[i] + res[i+1] )
    }

    // Se o arr for ímpar, a gente faz ficar par
    if(res2.length % 2 !== 0) {
        res2.push(0)
    }


    // Terminando as contas
    res = []

    for(let i = 0; i < res2.length; i += 2) {
        res.push( res2[i] + res2[i+1] )
    }


    // * Somando todos os valores que restarem
    let backup = res
    res = []

    res = backup[0]
    backup.shift()
    let howManyTimes = backup.length - 1

   
    // Transformando o backup em par caso seja ímpar
    if(backup.length % 2 !== 0) {
        backup.push(0)
    }
    
    // Somando
    for(let i = 0; i <= howManyTimes; i++){
        res = res + backup[0]
        backup.shift()
    }


    // Retornando o resultado
    return res
}


// Função do botão de calcular
function bin() {

    // Valor
    let value = input.value

    // Verificações
    if(value.length === 0) {
        return window.alert('err: Digite o valor!')
    }

    // bin = 11110100001001000000
    // dec = 100000000

    //
    value = Number(value)


    // dec => bin
    if(rad[0].checked) {

        // Verificando
        if(value >= 100000000) {
            return window.alert('err: Esse valor é grande demais, tente algo menor!')
        }

        // Valor
        let x = String(numToBin( value ))

        // Apenas verificando se deu erro e retornando caso sim
        if(x.startsWith('err:')) {
            return window.alert(x)
        }

        // Colocando o resultado na div
        resDiv.innerHTML = `bin de ${value} = ${x}`


     // bin => dec
    } else if(rad[1].checked) {

        // Verificando
        if(value >= 11110100001001000000) {
            return window.alert('err: Esse valor é grande demais, tente algo menor!')
        }

        // Valor
        let x = String(binToNum( value ))

        // Apenas verificando se deu erro e retornando caso sim
        if(x.startsWith('err:')) {
            return window.alert(x)
        }
            
        // Colocando o resultado na div
        resDiv.innerHTML = `dec de ${value} = ${x}`
    }

    // === //

    createReverseButton()
}


// Criar o botão reverse
function createReverseButton (){

    // Criando um botão
    let but = window.document.createElement('input')
    but.type = 'button'
    but.value = 'Inverso'
    but.onclick = reverse

    // Adicionando o botão na div
    resDiv.innerHTML += '<br>'
    resDiv.appendChild(but)
}

function reverse() {

    // Valor
    const value = Number(input.value)
    
    // dec => bin
    if(rad[0].checked) {
        let x = numToBin()

        rad[1].checked = true
        input.value = x
        resDiv.innerHTML = `dec de ${x} = ${value}`

     // bin => dec
    } else if(rad[1].checked) {
        let x = binToNum()

        rad[0].checked = true
        input.value = x
        resDiv.innerHTML = `bin de ${x} = ${value}`
    }

    createReverseButton()
}


// Função que limpa
function clean (){

    resDiv.innerHTML = 'Limpo! 🗑️'
    input.value = ''
    input.focus()
}
