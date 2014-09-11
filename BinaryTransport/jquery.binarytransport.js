 /**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0 
 * @copyright 2014 Henry ALgus. All rights reserved.
 *
 */

// use this transport for "binary" data type
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(_, callback){
		// setup all variables
                var xhr = new XMLHttpRequest(),
                    url = options.url,
                    type = options.type,
		// blob or arraybuffer. Default is blob
                    dataType = options.responseType || "blob",
                    data = options.data || null;
				
                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
		// make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, true);
                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});
