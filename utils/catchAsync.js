/*
    * Author: Filbert Hartawan
    * Description: Module for try catch for request error handler
*/
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};