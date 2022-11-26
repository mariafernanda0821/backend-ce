


const signut = (req, res)=> {
    try {
        


        return res.status(201).json({
            ok: false,
            message
        })

    } catch (error) {
        console.log(error);
        const {code, message}= {code: 412, message:""}

        return res.status(code).json({
            ok: false,
            message
        })
    }
}


const login = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    signut,
    login
}