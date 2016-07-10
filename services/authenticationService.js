var jwt = require('jsonwebtoken');

module.exports = {
  authenticate: function(req, res, app)
  {
    var token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
     // decode token
     if (token) {
       // verifies secret and checks exp
       jwt.verify(token, app.get('superSecret'), function(err, decoded) {
         if (err) {
            res.redirect('/');
            res.end();

         } else {
           // if everything is good, save to request for use in other routes
           req.decoded = decoded;
           return true;
         }
       })
     }
     else {
       res.redirect('/');
       res.end();
     }
   }
}
