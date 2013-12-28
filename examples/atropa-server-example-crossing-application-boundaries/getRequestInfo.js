function getRequestInfo() {
    var rq = new XMLHttpRequest();
    function success(json) {
        var pre = document.createElement('pre');
        json = document.createTextNode(json);
        pre.appendChild(json);
        document.body.appendChild(pre);
    }
    
    rq.open("get", "/basic request info.jsn");
    rq.onreadystatechange = function () {
        if(rq.readyState === 4) {
            if(rq.status === 200) {
                success(rq.responseText);
            } else {
                throw new Error('failed to get basic request info.jsn');
            }
        }
    };
    rq.send();
}