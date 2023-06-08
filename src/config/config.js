// eslint-disable-next-line import/no-anonymous-default-export
export default {
    messageGanado: 'Has ganado!',
    messagePerdido: 'Has perdido!',
    messageDesconocido: 'Nadie ganó. Que tengas suerte!',
    messageNuevo: 'Vamos a jugar de nuevo ?',
    defaultPlayer: 1,

    errorMessages: {
        username: 'Por favor impute el correo electrónico',
        password: 'Por favor impute la contraseña',
        firstname: 'Por favor impute el nombre',
        UserNotFoundException: 'No podemos encontrar este usuario. Crea la cuenta!',
        InvalidPasswordException: 'Por favor use la contraseña con las letras y los números. Longitud mínima 8',
        CodeMismatchException: 'Código incorrecto',
        NotAuthorizedException: 'El usuario o la contraseña estan incorrecto',
    }
}
