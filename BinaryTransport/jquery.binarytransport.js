 /**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0 
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */

// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, complete){
		// setup all variables
                var xhr = options.xhr();
				
		xhr.open(
			options.type,
			options.url,
			options.async,
			options.username,
			options.password
		);
		
		if ( !options.crossDomain && !headers["X-Requested-With"] ) {
                	headers["X-Requested-With"] = "XMLHttpRequest";
            	}
	
        	for ( i in headers ) {
	                xhr.setRequestHeader( i, headers[ i ] );
            	}
		
                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
			// make callback and send data
                    complete(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.responseType = options.responseType || "blob";
                xhr.send( options.hasContent && options.data || null );
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});
