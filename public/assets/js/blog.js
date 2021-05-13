function getPosts(categoryId) {
  if (categoryId !== undefined) {
    $.get("/api/post/" + cityName + "/category/" + categoryId, function (data) {
      if (!data || !data.length) {
        displayEmpty();
      }
      else {
        initializeRows(data);
      }
    });
  }

  else {
    $.get("/api/post/" + cityName, function (data) {
      if (!data || !data.length) {
        displayEmpty();
      }
      else {
        initializeRows(data);
      }
    });
  }
}

function initializeRows(posts) {
  $("#column-1").empty();
  $("#column-2").empty();

  for (var i = 0; i < posts.length; i++) {
    if (i === 0) {
      $("#column-2").prepend(createNewRow(posts[i]));
    }
    else if (i === 1) {
      $("#column-1").prepend(createNewRow(posts[i]));
    }
    else if ((i + 1) % 2 === 1) {
      $("#column-2").prepend(createNewRow(posts[i]));
    }
    else {
      $("#column-1").prepend(createNewRow(posts[i]));
    }
  }
};

function displayEmpty() {
  $("#column-1").html("<h2>Nothing Here<h2>");
  $("#column-2").html("<h2>Nothing Here<h2>");
}

function createNewRow(post) {
  console.log(post);
  //CREATE NEW post card
  var newPostCard = $("<div>");
  newPostCard.addClass("card m-2");

  //CREATE NEW post card img
  var newPostCardImg = $("<img>");
  newPostCardImg.addClass("card-img-top");

  //CREATE NEW post card body
  var newPostCardBody = $("<div>");
  newPostCardBody.addClass("card-body");

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

  //CREATE NEW username
  var userName = $("<p>").text(post.Blogger.name);
  userName.addClass("username");

  var upvoteImg = $("<img>").attr('src', "assets/images/bone.jpg");
  upvoteImg.addClass("bone");

  newPostTitle.text(post.title + " "); //grab title from post
  newPostCardText.text(post.body); //grab body from post
  // need to make fomatted date with moments

  formattedDate = post.createdAt
  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a")

  newPostTime.text(formattedDate); //grab created at from post
  newPostDate.append(newPostTime);
  newPostCardImg.attr('src', post.image);

  //CREATE NEW upvote button
  var likeBtn = $("<button>");
  likeBtn.addClass("btn-sm btn-primary");

  //CREATE NEW like counter
  var newPostLikes = $("<small>");
  newPostLikes.attr('id', post.id);
  newPostLikes.text(post.likes);

  if (post.Likes.length != 0) {
    likeBtn.text("Dislike");
    likeBtn.addClass("downvote");
    likeBtn.data("like", post.Likes[0].id);
  } else {
    likeBtn.text("Like");
    likeBtn.addClass("upvote");
  }

  likeBtn.attr('value', post.id);

  newPostCardBody.append(newPostTitle, newPostCardText, newPostDate, newPostLikes, likeBtn, upvoteImg, userName);
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
  });

  $('#exampleModal').modal('hide');
  highlightCategory($("#categorySelect").val());
  getPosts($("#categorySelect").val());
});

$(document).on('click', ".upvote", function (event) {
  event.preventDefault();

  var btn = $(this);
  var target = $(this).val();
  var likes = parseInt($("#" + target).text());
  likes++;

  $.ajax("/api/post/like/" + $(this).val(), {
    type: "PUT"
  }).then(function (data) {
    btn.removeClass("upvote");
    btn.addClass("downvote");
    btn.text("Dislike");
    $("#" + target).text(likes);
    $.ajax("/api/like/post/" + target, {
      type: "POST"
    }).then(function (data) {
      console.log(data);
      btn.data("like", data.id)
    })
  }
  );
});

$(document).on('click', ".downvote", function (event) {
  event.preventDefault();

  var btn = $(this);
  var target = $(this).val();
  var likes = parseInt($("#" + target).text());
  var likeId = $(this).data("like");
  console.log(btn.data("like"));
  likes--;

  $.ajax("/api/post/dislike/" + $(this).val(), {
    type: "PUT"
  }).then(function (data) {
    btn.removeClass("downvote");
    btn.addClass("upvote");
    btn.text("Like");
    $("#" + target).text(likes);
    $.ajax("/api/like/" + likeId, {
      type: "DELETE"
    }).then(function (data) {

    });
  }
  );
});

$(".category-btn").on('click', function (event) {
  event.preventDefault();

  var dataId = $(this).data("id");
  highlightCategory(dataId);

  getPosts(dataId);
});

function highlightCategory(selectionId) {

  for (var i = 1; i < 9; i++) {
    if (i !== selectionId) {
      $("#category-" + i).css("background-image", "none");
    }
  }

  $("#category-" + selectionId).css("background-image", "url(assets/images/nav_bg.png)");
}