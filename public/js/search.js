$(document).ready(function(){
  $("#productSearchBar").keyup(function(){
      var searchVal = $("#productSearchBar").val();
      $.get("/products/search/" + searchVal, function(results){
        $("#productList").html(results)
      });
      if(searchVal.length === 0){
         location.reload();
      };
  });
});
