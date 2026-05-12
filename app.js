const API_URL =
    "https://你的render地址.onrender.com/api/reservations";

const FORMSPREE_URL =
    "https://formspree.io/f/xzzabcde";

const form =
    document.getElementById("bookingForm");

const message =
    document.getElementById("message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.innerHTML = "";

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

    try {

        // 1. 先发送到 Spring Boot

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(booking)

        });

        const result = await response.text();

        // 时间冲突

        if (!response.ok) {

            message.innerHTML =
                "<p style='color:red'>" + result + "</p>";

            return;
        }

        // 2. 再发送 Formspree 邮件

        await fetch(FORMSPREE_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },

            body: JSON.stringify(booking)

        });

        message.innerHTML =
            "<p style='color:green'>予約成功</p>";

        form.reset();

    } catch (error) {

        message.innerHTML =
            "<p style='color:red'>システムエラー</p>";

    }

});
