$(document).ready(function(){
        $("#productSearchBar").keyup(function(){
            var searchVal = $("#productSearchBar").val();
            console.log(searchVal);
            $.get("/products/search/" + searchVal, function(results){
                $("#productsList").html(results)
              console.log(results);
            })
        })
});
