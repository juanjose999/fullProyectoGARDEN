
export const findAllEvents = async () => {
    try {

        const req = await fetch('http://localhost:8080/eventos/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        });  
        if(!req.ok){
            throw new Error(`error ${req.status}`)
        }
        let res = await req.json();
        console.log('resultAllEvents:',res)
        return res;
        }catch(error) {
            console.log('error',error)
        }
}

export const findEventById = async (id) => {
     try {
        const req =  authFetch(`http://localhost:8080/eventos/id/${id}`)
        if(!req.ok){
            throw new Error(`error ${req.status}`)
        }
        let res = await req.json();
        return res;
        }catch(error) {
            console.log('error',error)
        }
}

export const authFetch = async (url,) => {

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

