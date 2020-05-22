// Backend

export function urlApiBase(){
    return 'http://127.0.0.1:8000/bugfeed/'
}

export function urlUserApi(){
    return `${urlApiBase()}users/`
}

export function urlProjectApi(){
    return `${urlApiBase()}projects/`
}

export function urlTeamApi(){
    return `${urlApiBase()}teams/`
}

//Frontend

export function urlAppBase(){
    return 'http://localhost:3000/'
}

export function urlProjectsApp(){
    return `${urlAppBase}projects/`
}
