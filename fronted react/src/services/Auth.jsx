

export const AuthLogin = async (bodyStr)  => {
    try{
        let req = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(bodyStr)
        })

        if(!req.ok){
            throw new Error ('Error:', req)
        }

        const data = await req.json();
        console.log('datalogin:',data)
   
        let status = await req.status;
        return {
            status: status,
            success : data.success,
            token: data.data.token,
            user: data.user
        }
    }catch( error ){
        console.log('error:',error)
        throw new Error('Error en la peticion de login', error)
    }
}


