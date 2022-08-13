// NO PROBLEM HERE 

module.exports = {
    // ensureAuth: (req, res, next)=>{
    //     if(req.isAuthenticated()){
    //         console.log("Authenticated");
    //         return next();
    //     }else{
    //         console.log("Not Authenticated");
    //         res.redirect('/auth');
    //     }
    // },

    // ensureGuest: (req, res, next) =>{
    //     if(req.isAuthenticated()){
    //         console.log("Authenticated");
    //        res.redirect('/dashboard');;
    //     }else{
    //         console.log("Not Authenticated");
    //         return next();
    //     }



    ensureAuthenticated:(req, res, next) =>{
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/auth');
      }
    }




