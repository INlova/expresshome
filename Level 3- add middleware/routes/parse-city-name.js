module.exports = function() {
  return function(request, response, next){
    var name = request.params.name;
    var cityNameNormalized = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.cityName = cityNameNormalized;
    next();
  };
};
//modular file to negate changes in case during data entry