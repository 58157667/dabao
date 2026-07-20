const form =
    document.getElementById("bookingForm");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const booking = {

        name:
            document.getElementById("name").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        reserveDate:
            document.getElementById("date").value,

        reserveTime:
            document.getElementById("time").value,

        service:
            document.getElementById("service").value

    };

    // 保存到浏览器
    localStorage.setItem(
        "booking",
        JSON.stringify(booking)
    );

    // 跳转确认页面
    window.location.href =
        "confirm.html";

});
