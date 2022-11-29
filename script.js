
// Elementos
const resDiv = window.document.getElementById('res')
const input = window.document.getElementById('val')
const rad = window.document.getElementsByName('preferences')


// Se o rad for alterado, a div de resultados e o input são limpos
rad[0].onchange = () => resDiv.innerHTML = [
    '<strong>(esperando gerar)</strong>', input.value = ''
]

rad[1].onchange = () => resDiv.innerHTML = [
    '<strong>(esperando gerar)</strong>', input.value = ''
]


// Funções
function numToBin (num = '') {

    // Verificando o parâmetro (esse !== 0 é pq tava dando erro se botasse 0)
    if(typeof num !== 'number' && num !== 0) {
        return 'Err: O valor precisa ser um número!'
    }

    // === //
    
    // Valores
    let res = ''
    let length = ''
    let lastChar = ''


    // Só falta resolver o problema das vezes que o laço é executado (a partir de 12)
   for(let i = 0; i <= num; i++) {


    // Pegando a última caractere
        lastChar = res.charAt(res.length - 1)


        // Se res estiver vazio ele vira 0
        if(!res) {
            res = '0'


         // Se o último char for 0
        } else if(lastChar == '0') {
            //console.log(`'${res} termina com 0'`)


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
            //console.log(`'${res} termina com 1'`)


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
                        //console.log([res, x, res.length])
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

function binToNum (num = '') {
    
    // Isso vai ser necessário pra frente
    num = String(num)

    // Se conter algum número que não seja 0 ou 1
    for(let i = 2; i <= 9; i++) {

        if(num.includes(i)) {
            return 'Err: O valor não pode conter números diferentes de 0 ou 1!'
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


    // Se forem 2 resultados, eles se somam
    if(res.length === 2) {
        res = res[0] + res[1]
    }

    // Retornando o resultado
    return res
}


// Função do botão de calcular
function bin() {

    // Valor
    const value = input.value


    // Verificações
    if(value.length === 0) {
        return window.alert('Digite o valor!')

    } else if(!Number(value)) {
        return window.alert('O valor só pode conter números')
    }
    

    // dec => bin
    if(rad[0].checked) {

        // Valor
        let x = String(numToBin( Number(value) ))
        //console.log(x)

        // Verificando
        if(x.startsWith('Err:')) {
            return window.alert(x)

        } else {

            // Colocando o resultado na div
            resDiv.innerHTML = `bin de ${value} = ${x}`
        }

     // bin => dec
    } else if(rad[1].checked) {
        
        // Valor
        let x = String(binToNum( Number(value) ))

        // Verificando
        if(x.startsWith('Err:')) {
            return window.alert(x)

        } else {

            resDiv.innerHTML = `dec de ${value} = ${x}`
        }
    }

    // === //

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
    const value = input.value
    
    
    // dec => bin
    if(rad[0].checked) {

        rad[1].checked = true
        input.value = numToBin( Number(value) )
        bin()

     // bin => dec
    } else if(rad[1].checked) {

        rad[0].checked = true
        input.value = binToNum( Number(value) )
        bin()
    }
}
