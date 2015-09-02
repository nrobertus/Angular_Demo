app.controller('mainController', ['$scope', function($scope){
  $scope.title = 'Angular Test App';
  $scope.promo = 'For the edification and frustration of developers everywhere';
  $scope.products = 
    [
    { 
        name: 'The Book of Trees', 
        price: 19, 
        pubdate: new Date('2014', '03', '08'), 
        cover: 'img/the-book-of-trees.jpg',
        likes:0,
        dislikes:0
      }, 
      { 
        name: 'Program or be Programmed', 
        price: 8, 
        pubdate: new Date('2013', '08', '01'), 
        cover: 'img/program-or-be-programmed.jpg' ,
        likes:0,
        dislikes:0
      },
    { 
        name: 'Twenty One Balloons', 
        price: 11, 
        pubdate: new Date('1972', '08', '01'), 
        cover: 'img/program-or-be-programmed.jpg' ,
        likes:0,
        dislikes:0
      },
    { 
        name: 'A Tale of Two Cities', 
        price: 22, 
        pubdate: new Date('1859', '08', '01'), 
        cover: 'img/program-or-be-programmed.jpg' ,
        likes:0,
        dislikes:0
      }
    ]
  $scope.plusOne = function(index){
    $scope.products[index].likes += 1;
  }
  $scope.minusOne = function(index){
    $scope.products[index].dislikes += 1;
  }
}]);