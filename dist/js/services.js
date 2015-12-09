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

var getHealthchecksByApp = function(app_id){
   return $http.get( HEALTH_API + '/healthchecks?where={"application":"' + app_id + '" }')
}

var getChecksByHealthcheck = function(hchk){
    return $http.get( HEALTH_API + '/checks?where={"healthcheck":"' + hchk + '"}')
}

var getTestResultsByWebhook = function(wh){
  return $http.get( REPORT_API + '/reports?where={"branch":"'+wh.build.branch+'","build":"'+wh.build.number+'","repo":"'+wh.repo.name+'"}')
}

var addComponent = function(comp){
  return $http.post(DEPDEPHOST + '/components', comp);

}

var addApplication = function(app){
  return $http.post(DEPDEPHOST + '/applications', app);

}


  return {
    addApplication: addApplication,
    addComponent: addComponent,
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
    getTestResultsByWebhook: getTestResultsByWebhook,
  };
});
