exports.showUser = function(req, res, next){
  req.getConnection(function(err, connection){
    if(err) return next(err);
    connection.query('SELECT * FROM Users', [], function(err, result){
      res.rendera('Users',{
        users : result 
      });
    });
  });
};
