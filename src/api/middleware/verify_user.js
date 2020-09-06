const CLIENT_ID = "322673127928-4g24mavintnfpd3guiehig2vf7sj8dgk.apps.googleusercontent.com";
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
var user_db = require('../mongo_connect').users_db;

const verify = async(req, res, next)=> {
    try{
        console.log(req.hostname);
        accessToken= req.header("Authorization");
        //console.log(accessToken);
        const ticket = await client.verifyIdToken({
            idToken: accessToken,
            audience: CLIENT_ID,  
        });

        const payload = ticket.getPayload();

        //email and username recieved after verification from google
        req.gv_user_email = payload['email'];
        req.gv_user_name = payload['name'];

    }
    catch(err){
        return res.sendStatus(403)
    }
    next()
}

const isadmin = async(email)=>{
    user_db.find({["user_id"]:email},{'_id':0,'__v':0},function(err, response){
        if(err){
            return false;
        }
        else{
            if(!response.length){
                return false;
            }
            else{
                if(response[0]['isadmin'] == 1)
                    return true;
                else 
                    return false;
            }
        }
    }); 
}

module.exports = {verify, isadmin};