(function($scope){
    "use strict";

    /**
     * 
     * @param {Event} e 
     */
    function onSubmit(e){
        e.preventDefault()

        console.log(e);
    }


    function init(){
        console.log("init");
        document.getElementById("daForm").onSubmit = onSubmit;
    }

    init();

})(window)