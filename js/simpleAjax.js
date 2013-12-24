/**
 * Created by Imran on 12/21/13.
 */

var simpleAjax = {};

simpleAjax.createXHR = function(url,options){
    var that = this,
        options = options || {},
        xhr = false;
        completeCallback = options.complete || false;

    options.data = options.data || null,
    options.method = options.method.toUpperCase() || 'GET';


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
            var response = that._response(xhr);
            if(completeCallback){
                completeCallback(response);
            }
        }
    };
    xhr.open(options.method,url,true);

    return  xhr;
}

simpleAjax.ajax = function(url,options){
    var that = this,
        xhr = that.createXHR(url,options);


    if(xhr){
        //* for making POST ajax

        xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
        if(options.method.toUpperCase() === "POST"){
            xhr.setRequestHeader('Content-Type','x-www-form-urlencoded');
        }

        //*  end of POST ajax related code

        xhr.send(options.data);
    }
}

simpleAjax._response = function(xhr){
    var responseType = xhr.getResponseHeader('Content-Type');

    if( responseType === "application/json"){
        return xhr.responseText;
    } else if( responseType === 'text/xml' || responseType === 'application/xml'){
        return  xhr.responseXML;
    } else{
        return  xhr.responseText;
    }
}