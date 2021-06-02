var Upload = function (uploadType) {
    this.uploadType = uploadType;
}
Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this);
    // delete dom;
    // this.dom;
}
var UploadFactor = (function () {
    var createdFlyWeightObjs = {};
    return {
        create: function (uploadType) {
            if (createdFlyWeightObjs.hasOwnProperty(uploadType)) {
                createdFlyWeightObjs[uploadType] = new Upload(uploadType);
            }
            return createdFlyWeightObjs[uploadType];
        }
    }
})();
var uploadManager = (function () {
    var uploadDatabase = {};
    return {
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactor.create(uploadType);
            // dom 操作
            var dom;
            uploadDatabase[id] = {
                fileName, fileSize, dom
            };
            return flyWeightObj;
        },
        setExternalState: function (id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();
var id = 0;
var startUpload = function (uploadType, files) {
    for (var i = 0, file; file = files[i++];) {
        uploadManager.add(++id, uploadType, file.name, file.size);
    }
}
startUpload('plugin', [{
    name: '1',
    size: 1
}, {
    name: '2',
    size: 1
}]);
startUpload('flash', [{
    name: '1',
    size: 1
}, {
    name: '2',
    size: 1
}]);