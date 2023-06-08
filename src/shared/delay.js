export default async function delay(seconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        },seconds * 100)
    })
}