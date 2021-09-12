module.exports = {
    client: "mysql",
    connection:{
        port:'3306',
        host:"localhost",
        user:"root",
        password:"asd123456",
        database: "ecommerce"//"test"
    },
    pool:{min:0,max:7}
};