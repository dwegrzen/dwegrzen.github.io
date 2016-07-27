$(document).ready(function(){

// $.getJSON('http://localhost:3000/chirps',function(data){
// console.log(data)
// })

$.getJSON('http://arcane-shore-86443.herokuapp.com/chirps',function(data){
  displayData(data)
})



  function displayData(arr) {
    $.each(arr, function(i, user){

      username = user.username
      time = moment(user.chirptime).format('MMMM Do YYYY @ h:mma')
      pic = user.userpic
      body = user.body

      source = $("#chirp").html();
      template = Handlebars.compile(source);
      context = {userimage: pic, name: username, createdAt: time, body: body};
      html = template(context);
      $('#index').append(html)
    })
  }





// source = $("#chirp").html();
// template = Handlebars.compile(source);

// context = {userimage: pic, name: user, createdAt: time, body: body};
// html = template(context);

})
