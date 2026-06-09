const CreateTicket = async (body) => {
    try{
        console.log('body:',body)
        let url = 'http://localhost:8080/tickets'
        
        let token = localStorage.getItem('token')
        console.log('token:',token)

        const request = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(body)
        })

        const result = await request.json()
        console.log('resultadoTicket:',result)

        if(!request.ok){
            return {
                success: false,
                status: request.status,
                message: result.message || 'Error al realizar la compra'
            }
        }

        return {
            success: true,
            status: request.status,
            message: "Compra realizada correctamente"
        }

    }catch(error){
        console.log('error:',error)
        return {
            success: false,
            status: 500,
            message: error.message
        }
    }
}

const FindAllTicketsByUser = async () => {
    let token = localStorage.getItem('token')
    console.log('token:', token)
    try {
        const response = await fetch(
            `http://localhost:8080/tickets`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if(!response.ok){
            throw new Error('error '+ response.status)
        }
        const result = await response.json();
        console.log("ticketsUser:", result);

        return result;

    } catch (error) {
        console.log("error:", error);
    }
           
}

export {
    CreateTicket, FindAllTicketsByUser
}