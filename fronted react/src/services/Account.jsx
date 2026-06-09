
export const FindDataUser = async () => {
    let token = localStorage.getItem('token')
    console.log('token:',token)
    try{
        const request = await fetch('http://localhost:8080/usuarios',
            {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }
        )
         console.log("request:", request);
         console.log("request:", request);
        console.log(request.constructor.name);
         if (!request.ok) {
            throw new Error(
                `Error HTTP ${request.status}`
            );
        }
        return await request.json()

    }catch(error){
        console.log('error:',error)
        return null
    } 
}