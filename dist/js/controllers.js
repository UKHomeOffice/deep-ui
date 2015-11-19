function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



app.controller('MainCtrl', function($scope, $location, api, $sce) {

    // api.getDependencies().success(function(data){
    //     console.log(data._items);
    //     $scope.dependencies = data._items;
    // });

    console.log("Main");



    api.getDeploys().success(function(data){
        console.log(data);
        $scope.deploys = data._items;
        $scope.numDeploys = data._meta.total;
    });

    api.getWebhooks().success(function(data){
        console.log(data._items);
        $scope.webhooks = data._items;
        $scope.numBuilds = data._meta.total;
    });

    api.getTestResults().success(function(data){
        console.log(data._items);
        $scope.results = data._items;
    });



    $scope.renderHtml = function (htmlCode) {
        console.log(htmlCode);
        return $sce.trustAsHtml(htmlCode);
    };

});
