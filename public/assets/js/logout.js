$(".logout-btn").click(function () {
    $.get('/api/auth/logout', function (response) {
        if (response) {
            location.reload();
        } else {
            alert("Please try it again!");
        }
    });
});