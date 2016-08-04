var config = {
    apiurl: "http://teste-inacio.rhcloud.com/fatec/map/",			//teste-inacio.rhcloud.com
   //weburl: "http://localhost:16178/",

    generateApiUrl: function (serviceUrl) {
        return config.apiurl + serviceUrl;
    }
}