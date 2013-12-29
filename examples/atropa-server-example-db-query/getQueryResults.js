function getQueryResults(query) {
    var rq = new XMLHttpRequest();
    function success(json) {
        var pre = document.getElementById('display');
        pre.textContent = json;
        document.body.appendChild(pre);
    }
    
    rq.open("get", "/sqliteQuery.jsn?q=" + encodeURIComponent(query));
    rq.onreadystatechange = function () {
        if(rq.readyState === 4) {
            if(rq.status === 200) {
                success(rq.responseText);
            } else {
                throw new Error('failed to get sqliteQuery.jsn');
            }
        }
    };
    rq.send();
}