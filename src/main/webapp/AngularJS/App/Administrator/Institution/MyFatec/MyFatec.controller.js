FatecControllers.controller('MyFatecController',
    ['$scope', '$routeParams', 'InstitutionService', 'UserService', '$log', 'localStorageService',
        function ($scope, $routeParams, institutionService, userService, $log, localStorageService) {

            //Declaração de funções
            $scope.institutionLoad = _institutionLoad;
            $scope.institutionUpdate = _institutionUpdate;

            $scope.btnLabel = "Alterar";

            $scope.institution;
            $scope.admin;
            $scope.user;

            init();

            function init() {
                $scope.admin = localStorageService.get('user');
                $scope.institutionLoad();
                
            }

            

            function _institutionLoad() {

                var FatecCode = $scope.admin.instCode;
                var UserCode = $scope.admin.userCode;

                institutionService.institutionFindCode(FatecCode).then(function (data) {
                    
                    if (data == 'null') {
                        alert(':/ Ops! Algum problema ao procurar seus dados.');
                    } else {
                        $scope.institution = data;
                    }

                });
                
                userService.getUser(UserCode).then(function (data) {
                    
                    if (data == 'null') {
                        alert(':/ Ops! Algum problema ao procurar seus dados.');
                    } else {
                        $scope.user = data;
                    }

                });

            }

            function _institutionUpdate(institution, user) {
                // aqui chama a função da service que irá salvar
                
                user.type = "Administrador";
                
                institutionService.institutionUpdate(institution).then(function (status) {

                    $scope.institutionLoad();
                }); 
                
                userService.userUpdate(user).then(function (status) {
                    
                	alert("Alterado com sucesso!");
                	$scope.institutionLoad();
                	
                });

            }

            

        }]);