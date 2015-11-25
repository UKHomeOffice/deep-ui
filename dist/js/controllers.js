function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



app.controller('MainCtrl', function($scope, $location, api, $sce) {

    api.getDeploys().success(function(data){
        console.log(data);
        $scope.deploys = data._items.reverse();
        $scope.numDeploys = data._meta.total;
    });

    api.getWebhooks().success(function(data){
        console.log(data._items);
        $scope.webhooks = data._items.reverse();
        $scope.numBuilds = data._meta.total;
    });

    api.getTestResults().success(function(data){
        console.log(data._items);
        $scope.results = data._items;
        var numFailures = 0;
        _.each(data._items, function(item){
            var tests = item.report.testsuite;
            _.each(tests, function(test){
                if(test.failure){
                    numFailures++;
                }
            });
        });
        $scope.failedBuilds = numFailures;
    });

    api.getGithubRepos().success(function(data){
        console.log(data);
        $scope.githubrepos = data.length;
    });


    $scope.renderHtml = function (htmlCode) {
        console.log(htmlCode);
        return $sce.trustAsHtml(htmlCode);
    };

});



app.controller('AppsCtrl', function($scope, api) {
    api.getApplications().success(function(data){
        console.log(data._items);

        $scope.applications = data._items;
    });

});


app.controller('HealthCtrl', function($scope, api) {
    api.getApplications().success(function(data){
        $scope.apps = data._items;
        console.log($scope.apps);
        _.each($scope.apps, function(app){
            api.getHealthchecksByApp(app._id).success(function(healthdata){
                app.healthchecks = healthdata._items;
                _.each(app.healthchecks, function(hchk){
                    api.getChecksByHealthcheck(hchk._id).success(function(chk){
                        hchk.status = chk._items;
                    });
                });
            });
        });
    });

});
