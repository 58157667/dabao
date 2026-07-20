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

<p>姓名：${booking.name}</p>

<p>电子邮箱：${booking.email}</p>

<p>手机号码：${booking.phone}</p>

<p>预约日期：${booking.reserveDate}</p>

<p>预约时间：${booking.reserveTime}</p>

<p>服务项目：${booking.service}</p>

`;

document
    .getElementById("submitBtn")
    .addEventListener("click", async () => {

        const message =
            document.getElementById("message");

        try {

            // 提交到 Spring Boot
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

            // 发送邮件（Formspree）
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
                    "<p style='color:red'>邮件发送失败</p>";

                return;
            }

            // 清除本地数据
            localStorage.removeItem("booking");

            // 跳转到完成页面
            window.location.href =
                "complete.html";

        } catch (error) {

            console.error(error);

            message.innerHTML =
                "<p style='color:red'>系统错误，请稍后再试。</p>";

        }

    });
