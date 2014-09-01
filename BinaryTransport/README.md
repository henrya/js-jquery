jQuery BinaryTransport
==========

jQuery ajax transport for making binary data type requests.

How to use?
--------------

While creating request, setup dataType as "binary"

`$.ajax({`
		`url: "image.png",`
		`type: "GET",`
		`dataType: 'binary',`
		`processData: false,`
		`success: function(result){`
		`}`
`});`			

Default response type is blob. If you want receive ArrayBuffer as a response type, you can use responseType parameter while creating an Ajax request:

`responseType:'arraybuffer',`