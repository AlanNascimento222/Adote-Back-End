function gerarSenhaPadrao() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const getRandom = (lista) => lista[Math.floor(Math.random() * lista.length)]

    // seguir ordem padrao
    const senha =
        getRandom(letras) +
        getRandom(numeros) +
        getRandom(letras) +
        getRandom(numeros) +
        getRandom(letras) +
        getRandom(numeros)

    return senha
}

export { gerarSenhaPadrao }