$('.apireq').click( function() {
    $.ajax({
             url : "http://localhost:8000/api/todos/",
             dataType: "json",
             success : function (data) {
                      $('#first_name').text( data[0].task);
                      $('#last_name').text( data[0].timeTaskl);
                    }
                 });
             });