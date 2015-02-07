jQuery BinaryTransport
==========

jQuery ajax transport for making binary data type requests.

How to use?
--------------

While creating request, setup dataType as "binary"

	$.ajax({
			  url: "image.png",
			  type: "GET",
			  dataType: 'binary',
			  processData: false,
			  success: function(result){
			  }
	});				

Default response type is blob. If you want receive ArrayBuffer as a response type, you can use responseType parameter while creating an Ajax request:

`responseType:'arraybuffer',`

How to setup custom headers?
--------------

It is possible to set multiple custom headers when you are making the request. To set custom headers, you can use "header" parameter and set its value as an object, which has list of headers:

	$.ajax({
			  url: "image.png",
			  type: "GET",
			  dataType: 'binary',
			  headers:{'Content-Type':'image/png','X-Requested-With':'XMLHttpRequest'},
			  processData: false,
			  success: function(result){
			  }
	});	

Another options
--------------

** Asynchronous or synchronous execution **

It is possible to change execution type from asynchronous to synchrous when setting parameter "async" to false. 

`async:false,`

** Login with user name and password **

If your script needs to have authentication during the request, you can use username and password parameters.

`username:'john',`
`password:'smith',`

Supported browsers
--------------

BinaryTransport requires XHR2 responseType, ArrayBuffer and Blob response type support from your browser, otherwise it does not work as expected. Currently most major browsers should work fine. 

Firefox: 13.0+
Chrome: 20+
Internet Explorer: 10.0+
Safari: 6.0
Opera: 12.10 
