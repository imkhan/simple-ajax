/**
 * Created by Imran on 12/21/13.
 */
(function(){

    var link = document.getElementsByTagName('a')[0];
    var resources  = (function(){
        var basePath = "resources/";
        return {
            text: basePath + "ajax.txt",
            html: basePath + "ajax.html",
            json: basePath + "ajax.json",
            xml: basePath + "ajax.xml"
        }

    })();

    link.onclick = function(){

//        fetchTxtFile(resources.txt);
//        fetchHtmlFile(resources.html);
//        fetchJsonFile(resources.json);
        fetchXmlFile(resources.xml);

        document.body.removeChild(link);

    }
})();

function fetchXmlFile(url){
    simpleAjax.ajax(url,{
        method:'GET',
        complete:function(response){
            var body = document.body;
            /* to handle html response
             var div = document.createElement('div');
             div.innerHTML = xhr.responseText;
             body.appendChild(div);
             */
            var heading =  response.getElementsByTagName('heading')[0].firstChild.nodeValue;
            var h2 = document.createElement('h2');
            var h2Text = document.createTextNode(heading);
            h2.appendChild(h2Text);
            body.appendChild(h2);

            var ul = document.createElement('ul');
            var items= response.getElementsByTagName('step');
            for(var i = 0; i < items.length; i++){
                var li = document.createElement('li'),
                    stepText = items[i].firstChild.nodeValue,
                    liText = document.createTextNode(stepText);

                li.appendChild(liText);
                ul.appendChild(li);

            }
            body.appendChild(ul);
        }
    });

}
