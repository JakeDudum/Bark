$(document).ready(function () {

  var crd;
  var cityName;
  var cityId;

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    crd = pos.coords;

    createWeatherWidget();
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);


  var apiKey = "e9d3c600773e0277e03e42289aeaf483";

  function createWeatherWidget() {
    $.ajax({
      url: 'https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=' + crd.latitude + '&lon=' + crd.longitude + '&units=imperial&appid=' + apiKey,
      method: "GET"

    }).then(function (response) {

      var weatherCityId = response.id;

      $('#openweathermap-widget-15').empty();
      window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
      window.myWidgetParam.push({ id: 15, cityid: weatherCityId, appid: '945c3adf4a846dc18d8b8ed754fe7142', units: 'imperial', containerid: 'openweathermap-widget-15', });
      (function () {
        var script = document.createElement('script');
        script.async = true;
        script.charset = "utf-8";
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

        cityName = response.name;
        console.log(cityName)
        // remove loader
        $("#loader").slideUp('slow');

        getPosts();
      })();
    });
  }

  function getPosts() {

    $.get("/api/post/" + cityName, function (data) {
      /*
      got to post table get all post by city
      return all post by city
      
      */
     console.log(data);
      if(data !== null) {
       
        // cityId = data.id;
        // console.log(cityId);
  
        if (categoryString !== "") {
          $.get("/api/post/" + cityName + "/category/" + categoryString, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
              displayEmpty();
            }
            else {
              initializeRows(posts);
            }
          });
        }
  
        else {
          $.get("/api/post/" + cityName, function (data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
              // do nothing
            }
            else {
              displayEmpty() 
              initializeRows(posts);
            }
          });
        }
      }
      });
      
  }

  function initializeRows(posts) {
    $("#column-1").empty();
    $("#column-2").empty();

    for (var i = 0; i < posts.length; i++) {
      if (i === 0) {
        $("#column-1").prepend(createNewRow(posts[i]));
      }
      else if (i === 1) {
        $("#column-2").prepend(createNewRow(posts[i]));
      }
      else if ((i + 1) % 2 === 1) {
        $("#column-1").prepend(createNewRow(posts[i]));
      }
      else {
        $("#column-2").prepend(createNewRow(posts[i]));
      }
    }
  };

  function displayEmpty() {
    $("#column-1").html("");
    $("#column-2").html("");
  }

  function createNewRow(post) {
    //CREATE NEW post card
    var newPostCard = $("<div>");
    newPostCard.addClass("card m-2");
    //CREATE NEW psot card img
    var newPostCardImg = $("<img>");
    newPostCardImg.addClass("card-img-top");
    //CREATE NEW post card body
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    //CREATE NEW upvote button
    var upvoteBtn = $("<button>");
    upvoteBtn.text("Upvote");
    upvoteBtn.addClass("upvote btn btn-primary");
    //CREATE NEW post title
    var newPostTitle = $("<h5>");
    newPostTitle.addClass("card-title");
    //CREATE NEW post date
    var newPostDate = $("<p>");
    newPostDate.addClass("card-text");
    //CREATE NEW post time
    var newPostTime = $("<small>")
    newPostTime.addClass("text-muted");
    //CREATE NEW card text
    var newPostCardText = $("<p>");
    newPostCardText.addClass("card-text");


    newPostTitle.text(post.title + " "); //grab title from post
    newPostCardText.text(post.body); //grab body from post
    // need to make fomatted date with moments
    newPostTime.text(post.createdAt); //grab created at from post
    newPostDate.append(newPostTime);

    newPostCardImg.attr('src', post.image);


    newPostCardBody.append(newPostTitle, newPostCardText, newPostDate);

    newPostCard.append(newPostCardImg, newPostCardBody);
    newPostCard.data("post", post);

    return newPostCard;
  };

  $(".post").on('click', function (event) {
    event.preventDefault();

    var post = {
      title: $("#title").val().trim(),
      body: $("#body").val().trim(),
      image: $("#imageLink").val().trim() || null,
      CategoryId: $("#categorySelect").val(),
      city: cityName
    };

    $.post("/api/post", post, function (data) {
      alert("Created new Post!");
      console.log(data);
    });
  });

});