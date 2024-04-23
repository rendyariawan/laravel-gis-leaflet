<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Upload Image via Ajax</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body>

<form action="{{ url('/api/postsemuatitikkoordinat') }}" id="uploadForm" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="file" name="image" id="fileInput">
    <button type="submit" id="uploadBtn">Upload</button>
</form>

<script>
$(document).ready(function(){

    $("#uploadForm").on("submit", function(e){
        e.preventDefault();
            $.ajax({
                url: "{{ url('/api/postsemuatitikkoordinat') }}", // Ganti dengan URL endpoint untuk mengirim data gambar
                type: 'POST',
                data: new FormData(this),
                contentType: false,
                processData: false,
                success: function(response){
                    console.log(response); // Handle response dari server
                },
                error: function(xhr, status, error){
                    console.error(xhr.responseText); // Handle error jika terjadi
                }
            });

    })

});
</script>

</body>
</html>
