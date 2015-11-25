app.factory("api", function($q, $http) {

  var getDeploys = function(){
    return $http.get( DEPDEPHOST + '/deploys')
  };

    var getDependencies = function(){
    return $http.get( DEPDEPHOST + '/dependencies')
  };


  var getWebhooks = function(){
    return $http.get( DEPDEPHOST + '/webhooks')
  };

  var getTestResults = function(){
    return $http.get( REPORT_API + '/reports')
  };


  var getGithubRepos = function(){
    return $http.get("https://api.github.com/users/ukhomeoffice/repos")
  }


var getApplications = function(){
    return $http.get( APPS_API + '/applications?embedded={"components":1}')
  };


var getComponents = function(){
    return $http.get( APPS_API + '/components')
  };


var getHealthchecks = function(){
   return $http.get( APPS_API + '/healthchecks')
}

var getHealthchecksByApp = function(){
   return $http.get( HEALTH_API + '/healthchecks')
}

var getChecksByHealthcheck = function(hchk){
    return $http.get( HEALTH_API + '/checks?where={"healthcheck":"' + hchk + '"}')
}

  return {
    getDeploys: getDeploys,
    getDependencies: getDependencies,
    getWebhooks: getWebhooks,
    getTestResults: getTestResults,
    getGithubRepos: getGithubRepos,
    getApplications: getApplications,
    getComponents: getComponents,
    getHealthchecks: getHealthchecks,
    getHealthchecksByApp: getHealthchecksByApp,
    getChecksByHealthcheck: getChecksByHealthcheck,
  };
});
