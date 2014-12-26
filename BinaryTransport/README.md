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

Supported browsers
--------------

BinaryTransport requires XHR2 responseType, ArrayBuffer and Blob response type support from your browser, otherwise it does not work as expected. Currently most major browsers should work fine. 

Firefox: 13.0+
Chrome: 20+
Internet Explorer: 10.0+
Safari: 6.0
Opera: 12.10 
