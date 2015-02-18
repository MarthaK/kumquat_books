/**
 * Created by marthaAK on 2/16/2015.
 */

/*
 * Gets book listing
 */


exports.list = function(req, res) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM product', function(err, rows) {
            if(err) {
                console.log("Error selecting : %s ", err);
                res.render('customers',{page_title: "Book - Kumquat Online Bookservice", data:rows });
            }
        });
    });
};

exports.add = function(req, res) {
    res.render('add_book',{page_title:"Add Book-Kumquat Online Bookservice"});

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        var data = {
            book_title : input.book_title,
            author : input.author,
            quantity : input.quantity,
            price : input.price
        };

        var query = connection.query("INSERT INTO product set ? ",data, function(err, rows)
        {
            if(err){
                console.log("Error inserting : %s ", err);
                res.redirect('/books');
            }
        });
    });

};

exports.view = function(req, res) {

    var id = req.params.id;
    req.getConnection(function(err, connection) {

        connection.query('SELECT * FROM product WHERE id = ?',[id], function(err, rows) {
            if(err) {
                console.log("Error viewing : %s ", err);
                res.render('product',{page_title: "Order Details - Kumquat Online Bookservice", data:rows });
            }
        });
    });
};