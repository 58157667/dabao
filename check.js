fetch("https://你的render地址/api/reserve", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(async res => {

    const msg = await res.text();

    if (!res.ok) {
        alert(msg);
        return;
    }

    // 数据库成功后
    // 再发送 Formspree 邮件

    fetch("https://formspree.io/f/mqenwlpa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    alert("预约成功");
});