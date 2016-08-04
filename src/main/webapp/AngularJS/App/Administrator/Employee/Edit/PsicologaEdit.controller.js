FatecControllers.controller('PsicologaEditController',
    ['$scope', '$routeParams', 'PsicologaService', 'InstitutionService','$log', 'localStorageService',
        function ($scope, $routeParams, psicologaService, institutionService, $log, localStorageService) {

            //Declaração de funções
            
    		var institutionLoad = _institutionLoad;
            $scope.psicologaUpdate = _psicologaUpdate;
            $scope.cancel = _cancel;
            $scope.admin;
            $scope.psicologa;
            $scope.institution;
            

            init();

            function init() {
                $scope.admin = localStorageService.get('user');
                $scope.psicologa = psicologaService.getPsicologaCurrent();
                institutionLoad();
            }

            function _cancel() {
                document.location.href = "#/psicologa/list";
            }

            function _psicologaUpdate(psicologa) {
                
                if(psicologa.password != psicologa.password2){
                	alert('confira as senhas..');
                }else{
                	delete psicologa['password2'];
                	psicologa['type'] = 'psicologa';
                    psicologa['instCode'] = $scope.admin.instCode;
                    
                	psicologaService.updatePsicologa(psicologa).then(function (status) {
        
                            if (status != 200) {
                                alert(':/ Ops! erro ao atualizar..');
                            } else {
                                alert('Alterado com sucesso.');
                                document.location.href = "#/psicologa/list";
                            }
                            
                        });
                        
                }
                
            }

            function _institutionLoad() {

                var code = $scope.admin.instCode;

                institutionService.institutionFindCode(code).then(function (data) {
                	
                    if (data == null) {
                        alert('ops algum erro aqui..');
                    } else {
                        $scope.institution = data;
                    }

                });

            }



        }]);