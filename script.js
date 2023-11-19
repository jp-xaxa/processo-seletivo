lucide.createIcons()

const conversionRealEmRomanosNumber = document.getElementById("real-number")
const resultConversionRealRomanos = document.getElementById("result-romanos")

const conversionRomanosEmRealNumber = document.getElementById("romanos-number")
const resultConversionRomanosReal = document.getElementById("result-real")

/*Conversão de número Inteiro em Romanos */
conversionRealEmRomanosNumber.addEventListener("input", () => {
  /*Armazena o valor contido na input */
  let realNumber = conversionRealEmRomanosNumber.value

  /*Aviso caso o número sejá negativo */
  if (realNumber < 0) {
    alert("O número é menor que 0, digite um número positivo!")
  }

  /*Arrays que armazena o respectivo número inteiro em Romanos*/
  const valoresRomanos = [
    ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    ["", "M", "MM", "MMM", "I̅V̅", "V̅", "V̅I̅", "V̅I̅I̅", "V̅I̅I̅I̅", "I̅X̅"],
    ["", "X̅", "X̅X̅", "X̅X̅X̅", "X̅L̅", "L̅", "L̅X̅", "L̅X̅X̅", "L̅X̅X̅X̅", "X̅C̅"],
    ["", "C̅", "C̅C̅", "C̅C̅C̅", "C̅D̅", "D̅", "D̅C̅", "D̅C̅C̅", "D̅C̅C̅C̅", "C̅M̅", "M̅"],
  ]

  /*Faz a contagem entre 100000 <> 999999 */
  const bilhares = valoresRomanos[5][Math.floor(realNumber / 100000)]
  /*Faz a contagem entre 10000 <> 99999 */
  const milhares = valoresRomanos[4][Math.floor((realNumber % 100000) / 10000)]
  /*Faz a contagem entre 1000 <> 9999 */
  const milhar = valoresRomanos[3][Math.floor((realNumber % 10000) / 1000)]
  /*Faz a contagem entre 100 <> 999 */
  const centenas = valoresRomanos[2][Math.floor((realNumber % 1000) / 100)]
  /*Faz a contagem entre 10 <> 99 */
  const dezenas = valoresRomanos[1][Math.floor((realNumber % 100) / 10)]
  /*Faz a contagem a baixo de 10*/
  const unidades = valoresRomanos[0][realNumber % 10]

  const resultConversionRomanos =
    bilhares + milhares + milhar + centenas + dezenas + unidades

  resultConversionRealRomanos.value = resultConversionRomanos
})

/*Não aceitar o digito 0 com primeiro número*/
conversionRealEmRomanosNumber.addEventListener("input", () => {
  // Verifique se o valor da input começa com "0"
  if (conversionRealEmRomanosNumber.value.startsWith("0")) {
    // Se começar com "0", remova o "0" do início do valor
    conversionRealEmRomanosNumber.value =
      conversionRealEmRomanosNumber.value.slice(1)
  }
})

/*Conversão de número Romanos em Inteiro*/
conversionRomanosEmRealNumber.addEventListener("input", () => {
  let realRomanos = conversionRomanosEmRealNumber.value

  /*Objeto que armazena as letras e seus números*/
  const romanNumerals = {
    I: 1,
    i: 1,
    V: 5,
    v: 5,
    X: 10,
    x: 10,
    L: 50,
    l: 50,
    C: 100,
    c: 100,
    D: 500,
    d: 500,
    M: 1000,
    m: 1000,
    /*Números maiores por serem Unicode, esta ocorrendo erro ai criarmos o objeto, assim dando erro na conversão. */
  }

  /*Variável para armazenar o resultado final */
  let resultConversionReal = 0
  /*Variável que armazena o número do caractere anterior do loop */
  let previousValue = 0

  for (let i = realRomanos.length - 1; i >= 0; i--) {
    /*Variável que armazena o respectivo caracter da string, começa da direta para a esquerda (ordem decrescente)*/
    const currentRoman = realRomanos[i]
    /*Essa variável irá armazenar o número que corresponde a caractere romano. Ao buscar o caracter correspondente no objeto, irá encontrar o valor correto*/
    const currentValue = romanNumerals[currentRoman]

    /*Condição para comparar o valor do loop anterior com o atual, para que assim possamos encontrar números como 4, 9, 14, 19, ..., pois esses números em romas são a jução de uma subtração.*/
    if (currentValue < previousValue) {
      /*Caso o número sejá menor que do loop anterior, ocorrera a subtração do maior com o menor para termos os números 4 ou 9. Ex: IV = 4, logo primeiro encontrou 5 e depois 1, assim subtraindo para ter o 4. */
      resultConversionReal -= currentValue
    } else {
      /*Caso o número sejá maior que do loop anterior, ocorrera a soma normal. */
      resultConversionReal += currentValue
    }
    /*Variável que armazena o número do loop para ser usado na comparação da condição depois.*/
    previousValue = currentValue
  }

  resultConversionRomanosReal.value = resultConversionReal
})

/*impedir de digitar números que não são romanos*/
function validarLetras(input) {
  // Remove caracteres que não são números romanos
  input.value = input.value.replace(/[^IiVvXxLlCcDdMm]/g, "")
}
