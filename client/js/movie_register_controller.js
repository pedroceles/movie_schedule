
angular.module('movieSchedule').controller('MovieRegisterCtrl', ['$scope', 'MovieDbService', function($scope, MovieDbService) {
  $scope.search = function (query) {
    return MovieDbService.searchMovie(query).then(function(movies){
      // $scope.movies = movies;
      return movies;
    });
  };

  $scope.getImgUrl = function (movie) {
    return MovieDbService.getImgUrl(movie.poster_path);
  };

  $scope.movieWasSelected = function (movie) {
    if (!movie) return;
    MovieDbService.getMovieById(movie.id).then( function (movieData) {
      console.log(movieData, 'data');
      $scope.movieData = angular.copy(movieData);
    });
  };
}]);
