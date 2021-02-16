export const getDataFromStorage = name => {
    return JSON.parse(localStorage.getItem(name))
}


export const getAllDataFromStorage = () => {
    let contact = getDataFromStorage('contact');
    let main = getDataFromStorage('main');
    let images = getDataFromStorage('images');
    let services = getDataFromStorage('services');
    const all = { contact, main, services, images}
    return JSON.stringify(all)
}
