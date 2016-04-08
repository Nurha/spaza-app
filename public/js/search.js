$(document).ready(function(){
  $("#productSearchBar").keyup(function(){
      var searchVal = $("#productSearchBar").val();
      // console.log(searchVal.length);
      $.get("/products/search/" + searchVal, function(results){
        $("#productList").html(results)
      });
      if(searchVal.length === 0){
        console.log('true');
         location.reload();
      };
  });
});
