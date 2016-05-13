// Load an interactive environment (IE) from a remote URL
// @param {String} notebook_access_url: the URL embeded in the page and loaded
function load_notebook(notebook_access_url){
    // When the page has completely loaded...
    $( document ).ready(function() {
        // Test if we can access the GIE, and if so, execute the function
        // to load the GIE for the user.
        test_ie_availability(notebook_access_url, function(){
            append_notebook(notebook_access_url);
        });
    });
}

function keep_alive(){
    /**
    * This is needed to keep the container alive. If the user leaves this site
    * this function is not constantly pinging the container, the container will
    * terminate itself.
    */

    var request_count = 0;
    interval = setInterval(function(){
        $.ajax({
            url: notebook_access_url,
            xhrFields: {
                withCredentials: true
            },
            type: "GET",
            timeout: 500,
            success: function(){
                console.log("Connected to IE, returning");
            },
            error: function(jqxhr, status, error){
                request_count++;
                console.log("Request " + request_count);
                if(request_count > 30){
                    clearInterval(interval);
                    clear_main_area();
                    toastr.error(
                        "Could not connect to IE, contact your administrator",
                        "Error",
                        {'closeButton': true, 'timeOut': 20000, 'tapToDismiss': false}
                    );
                }
            }
        });
    }, 30000);
}