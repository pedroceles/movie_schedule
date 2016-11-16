angular.module('movieSchedule').factory('MovieDbService', ['$q', function($q) {

  var tmd = theMovieDb;
  tmd.common.api_key = "3cda1b65a62e4ad02aac04d47b84cbae";

  var config = {};
  function loadConfiguration() {
    tmd.configurations.getConfiguration(function(response){
      config = JSON.parse(response);
    }, function(){});
  }
  loadConfiguration();

  function getConfiguration(){
    return config;
  }

  function getImgUrl(imgPath) {
    var baseURL = config.images.base_url;
    var string = baseURL + 'w92' + imgPath;
    return string;
  }

  function searchMovie(query) {
    var deferred = $q.defer();
    query = query || "";
    tmd.search.getMovie({
      query: encodeURIComponent(query),
      language: 'pt-BR'
    }, function (response) {
      response = JSON.parse(response);
      deferred.resolve(response.results);
    }, function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function getMovieById(movieId) {
    var deferred = $q.defer();
    tmd.movies.getById({"id": movieId, language: 'pt-BR'}, function (response) {
      var data = JSON.parse(response);
      deferred.resolve(data);
    }, function (error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    searchMovie: searchMovie,
    getMovieById: getMovieById,
    getConfiguration: getConfiguration,
    loadConfiguration: loadConfiguration,
    getImgUrl: getImgUrl,
  };
}]);
