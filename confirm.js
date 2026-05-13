const API_URL =
    "https://yoyaku8.onrender.com/api/reservations";

const FORMSPREE_URL =
    "https://formspree.io/f/mqenwlpa";

const booking =
    JSON.parse(
        localStorage.getItem("booking")
    );

const confirmArea =
    document.getElementById("confirmArea");

confirmArea.innerHTML = `

<p>名前：${booking.name}</p>

<p>メール：${booking.email}</p>

<p>電話番号：${booking.phone}</p>

<p>予約日：${booking.reserveDate}</p>

<p>予約時間：${booking.reserveTime}</p>

<p>サービス：${booking.service}</p>

`;

document
    .getElementById("submitBtn")
    .addEventListener("click", async () => {

        const message =
            document.getElementById("message");

        try {

            // Spring Boot
            const response =
                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(booking)

                });

            const result =
                await response.text();

            // 时间冲突
            if (!response.ok) {

                message.innerHTML =
                    "<p style='color:red'>"
                    + result +
                    "</p>";

                return;
            }

            // Formspree
            const mailResponse =
                await fetch(FORMSPREE_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify(booking)

                });

            if (!mailResponse.ok) {

                message.innerHTML =
                    "<p style='color:red'>メール送信失敗</p>";

                return;
            }

            // 清除数据
            localStorage.removeItem("booking");

            // 跳转完成页
            window.location.href =
                "complete.html";

        } catch (error) {

            console.error(error);

            message.innerHTML =
                "<p style='color:red'>システムエラー</p>";

        }

    });
