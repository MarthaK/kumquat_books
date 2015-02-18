/**
 * Created by marthaAK on 2/16/2015.
 */

/*
 * GET customer listing
 */

exports.list = function(req, res) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM customer', function(err, rows) {
            if(err) {
                console.log("Error selecting : %s ", err);
                res.render('customers',{page_title: "Customers - Kumquat Online Bookservice", data:rows });
            }
        });
    });
};

exports.add = function(req, res) {
    res.render('add_customer',{page_title:"Add Customer-Kumquat Online Bookservice"});

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        var data = {
            customer_firstname : input.customer_firstname,
            customer_lastname : input.customer_lastname,
            customer_username : input.customer_username,
            customer_email : input.customer_email
        };

        var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
        {
            if(err){
                console.log("Error inserting : %s ", err);
                res.redirect('/customers');
            }
        });
    });

};