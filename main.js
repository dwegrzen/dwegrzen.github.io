$(document).ready(function() {

    $.getJSON('https://arcane-shore-86443.herokuapp.com/chirps', function(data) {
        displayData(data)
    })



    function displayData(arr) {
        $.each(arr, function(i, user) {

            var username = user.username
            var time = moment(user.chirptime).format('MMMM Do YYYY @ h:mma')
            var pic = user.userpic
            var body = user.body
            var profile = user.userpage

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
            var html = modelTemplate(obj)
            $("#profilemodal .modal-title").text(obj.name)
            $("#profilemodal .modal-body").html(html)
        })
    }

    function modelTemplate(obj) {
        var source = $("#modaltemplate").html();
        var template = Handlebars.compile(source);
        var context = {
            userimage: obj.userpic,
            name: obj.name,
            joined: obj.created_at,
            chirps: obj.chirp_count,
            followers: obj.followers_count,
            following: obj.followees_count
        };
        var html = template(context);

        return html
    }

    $(document.body).on('show.bs.modal', function(ev) {
        fetchUserProfile(ev.relatedTarget.href)
    })


})
