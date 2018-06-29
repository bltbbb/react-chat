export function getRedirectPath({type,avatar}){
    console.log(type,avatar)
    let url = type === 'boss' ? '/boss' : '/genius'
    if(!avatar){
        url += 'info'
    }
    return url
}

export function getChatId(to,from){
    return [to,from].sort().join('_')
}