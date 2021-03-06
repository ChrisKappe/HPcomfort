/**
 * Created by alexander on 31.01.16.
 */
_control.controller('StatusCtrl',['$scope','$http','soapHP',
    '$localStorage','$rootScope','$ionicModal','queueHPs','$ionicListDelegate','networkHP',
    function($scope, $http, soapHP, $localStorage, $rootScope,
             $ionicModal, queueHPs, $ionicListDelegate,networkHP) {

        $scope.$storage = $localStorage;

        resetLastAction();

        $scope.$watch('$storage.lastConnectedServer', function() {
            resetLastAction();
        });


        $scope.dialogData = { "description" : "", "soapid" : "" , "lastValue": "--", "lastUpdate": "", "lastAction" : "new"};

        $ionicModal.fromTemplateUrl('templates/statuslist_dialog.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        //$scope.openModal = function() {
        //    $scope.modal.show();
        //};
        //$scope.closeModal = function() {
        //    $scope.modal.hide();
        //};
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            $scope.dialogData = { "description" : "", "soapid" : "" , "lastValue": "--", "lastUpdate": "", "lastAction" : "new"};
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            $scope.dialogData = { "description" : "", "soapid" : "" , "lastValue": "--", "lastUpdate": "", "lastAction" : "new"};
            // Execute action
        });

        $scope.openDialogNew = function () {
            $scope.modal.show();
        };

        $scope.closeModalSave = function () {
            var newItem = {};
            newItem.description = $scope.dialogData.description;
            newItem.soapid = $scope.dialogData.soapid;
            newItem.lastValue = $scope.dialogData.lastValue;
            newItem.lastAction = $scope.dialogData.lastAction;
            if ( $scope.dialogData.lastAction == 'new') {
                $scope.$storage.statuslist.push(newItem);
            }
            if ( $scope.dialogData.lastAction == 'change') {
                var editIndex = $scope.$storage.statuslist.indexOf($scope.tmpEditItem);
                $scope.$storage.statuslist[editIndex] = newItem;
            }

            $ionicListDelegate.$getByHandle('status-list').closeOptionButtons();
            $scope.modal.hide();
            queueHPs.asyncTask(newItem);
        };

        $scope.closeModalCancel = function () {
            $ionicListDelegate.$getByHandle('status-list').closeOptionButtons();
            $scope.modal.hide();
        };

        $scope.onItemDelete = function(item) {
            $scope.$storage.statuslist.splice($scope.$storage.statuslist.indexOf(item), 1);
        };

        $scope.onItemEdit = function(item) {
            // Remember edit item to change it later
            $scope.tmpEditItem = item;
            $scope.dialogData.lastAction = 'change';
            $scope.dialogData.description = item.description;
            $scope.dialogData.soapid = item.soapid;
            $scope.dialogData.lastValue = item.lastValue;
            $scope.modal.show();
        };

        $scope.doRefresh = function() {
            resetLastAction();
            $scope.$broadcast('scroll.refreshComplete');
        };

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if (toState.views.menuContent.controller === 'StatusCtrl') {
                resetLastAction();
            }
        });

        // reload data if the view is resumed from background
        document.addEventListener("resume", function () {
            resetLastAction();
        }, false);



        function resetLastAction() {

            networkHP.checkConnection();

            $scope.$storage.statuslist.forEach(function(entry, index) {
                queueHPs.asyncTask(entry);
            });
        }

        $scope.onReorder = function (fromIndex, toIndex) {
            var moved = $scope.$storage.statuslist.splice(fromIndex, 1);
            $scope.$storage.statuslist.splice(toIndex, 0, moved[0]);
        };


    }]);
