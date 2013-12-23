/**
 * Created by Imran on 12/21/13.
 */

var simpleAjax = {};

simpleAjax.createXHR = function(url,options){
    var xhr = false,
        options = options || {},
        method = options.method || 'GET',
        completeCallback = options.complete || false;

    if(!window.XMLHttpRequest){
        return xhr;
    }
    xhr = new XMLHttpRequest();

    //handle the "onreadystatechange"event
    xhr.onreadystatechange = function(){
        //xhr.readyState property values
        //0=unitialized  > request is not open yet
        //1=loading > request is open now
        //2= loaded > request is sent to server
        //3=interactive > server is readying the response
        //4=complete

        if((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304)){
            var response = xhr.responseXML || xhr.responseText;
            if(completeCallback){
                completeCallback(response);
            }
        }
    };
    xhr.open(method,url,true);

    return  xhr;
}

simpleAjax.ajax = function(url,options){
    var xhr = this.createXHR(url,options);


    if(xhr){
        xhr.send(options.data);
    }
}