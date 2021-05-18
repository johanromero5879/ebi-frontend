export const obtenerUsuario = () => {
    const usuario = localStorage.getItem('usuario')
    return JSON.parse(usuario)
}

export const cerrarSesion = (router) => {
    localStorage.removeItem('usuario')
    router.push({ path: '/ingresar' })
}