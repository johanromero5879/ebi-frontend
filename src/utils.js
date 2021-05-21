export const obtenerUsuario = () => {
    const usuario = localStorage.getItem('usuario')
    return JSON.parse(usuario)
}

export const cerrarSesion = (router) => {
    localStorage.removeItem('usuario')
    router.push({ path: '/ingresar' })
}

export const http = async (url, metodo = 'GET', datos = {}) => {

    let request = {
        method: metodo
    }

    if(metodo != 'GET'){
        request = {
            ...request, 
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(datos)
        }
    }
    
    const response = await fetch(url, request)
    const data = await response.json()
    return JSON.parse(JSON.stringify(data))
}