const KEY = 'fc1fef96'

const getData = async (movieName) => {
    const base = `https://www.omdbapi.com/?s=${movieName}&apikey=${KEY}`
    // loader(true)
    const request = await fetch(base)
    if(request.status !== 200){
        throw new Error('Malumot kelishida xatolik bor')
    }
    const data = await request.json()
    // loader(false)
    return data
}
