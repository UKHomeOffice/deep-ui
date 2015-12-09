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

        $scope.deploys = data._items.reverse();
        $scope.numDeploys = data._meta.total;
    });

    api.getWebhooks().success(function(data){

        $scope.webhooks = data._items.reverse();
        $scope.numBuilds = data._meta.total;

    });

    api.getTestResults().success(function(data){
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
        $scope.githubrepos = data.length;
    });


    $scope.renderHtml = function (htmlCode) {
        console.log(htmlCode);
        return $sce.trustAsHtml(htmlCode);
    };

});


app.controller('BuildCtrl', function($scope, api) {
    api.getWebhooks().success(function(data){
        $scope.webhooks = data._items.reverse();
        console.log($scope.webhooks);
        $scope.numBuilds = data._meta.total;
        _.each($scope.webhooks, function(wh){
            wh.failures = 0;
            api.getTestResultsByWebhook(wh).success(function(data){
                wh.results = data._items;
            });
        });

    });

});


app.controller('AppsCtrl', function($scope, api) {
    $scope.new_component = {};
    $scope.new_application = {};
    $scope.new_application.components = [];

    var refresh = function(){
        api.getApplications().success(function(data){
            $scope.applications = data._items;
        });
        api.getComponents().success(function(data){
            $scope.components = data._items;
        });

    };

    $scope.createComponent = function(){
        api.addComponent($scope.new_component).success(function(data){
            $scope.new_component = {};
            refresh();
        });
    }

    $scope.addCompToApp = function(comp){
        var index = $scope.new_application.components.indexOf(comp._id);
        if (index > -1) {
            $scope.new_application.components.splice(index, 1);
        }else{
            $scope.new_application.components.push(comp._id);
        };
    }

    $scope.createApplication = function(){
        api.addApplication($scope.new_application).success(function(data){
            $scope.new_application = {};
            refresh();
        });
    }

    refresh();
});


app.controller('HealthCtrl', function($scope, api) {
    api.getApplications().success(function(data){
        $scope.apps = data._items;
        console.log($scope.apps);
        _.each($scope.apps, function(app){
            console.log("App: " + app._id + " - " + app.name)
            api.getHealthchecksByApp(app._id).success(function(healthdata){
                console.log(healthdata);
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
