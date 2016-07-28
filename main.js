$(document).ready(function() {

    // $.getJSON('http://localhost:3000/chirps',function(data){
    // console.log(data)
    // })

    $.getJSON('https://arcane-shore-86443.herokuapp.com/chirps', function(data) {
        displayData(data)
    })



    function displayData(arr) {
        $.each(arr, function(i, user) {

            username = user.username
            time = moment(user.chirptime).format('MMMM Do YYYY @ h:mma')
            pic = user.userpic
            body = user.body
            profile = user.userpage

            source = $("#chirp").html();
            template = Handlebars.compile(source);
            context = {
                userimage: pic,
                name: username,
                createdAt: time,
                body: body,
                profile: profile
            };
            html = template(context);
            $('#index').append(html)
        })
    }

    function fetchUserProfile(url) {
        $.getJSON(url, function(obj) {
            $("#profilemodal .modal-title").text(obj.name)
            $("#profilemodal .modal-body").html("<img src=\"" + obj.userpic + "\" class=\"img-responsive img-rounded center-block\" id=\"userpic\"><p>" + obj.name + " has been a member of Chirpy since " + obj.created_at + "</p><p>Chirp count:" + obj.chirp_count + "</p><p>Followers:" + obj.followers_count + "</p><p>Following:" + obj.followees_count + "</p>")
        })
    }

    function modelTemplate(obj) {
        source = $("#modaltemplate").html();
        template = Handlebars.compile(source);
        context = {
            userimage: obj.userpic,
            name: obj.name,
            joined: obj.created_at,
            chirps: obj.chirp_count,
            followers: obj.followers_count,
            following: obj.followees_count
        };
        html = template(context);

    }

    $(document.body).on('show.bs.modal', function(ev) {
        console.log(ev)
        fetchUserProfile(ev.relatedTarget.href)
    })

    $(".modal").on("hidden.bs.modal", function() {
        $(".modal-body1").html("")
        $(".modal-title").html("")

    })

})
