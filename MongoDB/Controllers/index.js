import 'dotenv/config'
import { Users } from '../Models/index.js'

const insertUser = async(req, res)=>{
    try{
        const user = await Users.findOne({id: req.body.id})

        if(!user){
            const newUser = new Users(req.body)
    
            try{
                await newUser.save()
                console.log('Successfully inserted')
				res.sendStatus(200)
            } catch(e){ 
                console.log('An error occurred while inserting into the Database: ' + e)
            }
        }
    } catch(e){
        console.log('An error occurred when trying to search for the existence of the user in the Database: ' + e)
    }    
}

const deleteUser = async (req, res) => {
    try{
        const user = await Users.findOne({id: req.body.id})
		
        if(user){

            try{
            	await Users.deleteOne({id: req.body.id})
            	console.log('Successfully deleted')
            	res.sendStatus(200)
            } catch(e){ 
                console.log('An error occurred while deleting the Database: ' + e)
            }
        }
    } catch(e){
        console.log('An error occurred when trying to search for the existence of the user in the Database: ' + e)
    }    
}

const renameUser = async (req, res) => {
    try{
        const user = await Users.findOne({id: req.body.id})

        if(user){
            
            try{
                await Users.updateOne({id: req.body.id}, {nickName: req.body.nickName})
                console.log('Successfully renamed')
				res.sendStatus(200)
            }catch(e){
                console.log('An error occurred when trying to rename the user in the Database: ' + e)
            }
        }

    } catch(e){
        console.log('An error occurred when trying to search for the existence of the user in the Database: ' + e)
    }
}

const getUsersList = async (req, res) => {
    try{
        const users = await Users.find({})
        res.send(users)
        
    }catch(e){
        console.log('An error occurred while trying to obtain the complete list of users: ' + e)
    }
}

export { 
    insertUser,
    deleteUser,
    renameUser,
    getUsersList
}