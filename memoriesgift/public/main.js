const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKMU4W7iGU69cwJHxyVQL-dyrQuu5lmyGT6xh57h04gbsl1KJpatjwIIeoAQkDj-OH/exec";
const SHARED_TOKEN = "X9@d2L!k7#Qz1pF4^bH6wM3&yT8rU5$eG0jC"; // Must match your Apps Script

const giftForm = document.getElementById("giftForm");
const formStatus = document.getElementById("form-status");

if (giftForm) {
  giftForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    formStatus.textContent = "Đang gửi...";
    formStatus.style.color = "black";

    const formData = {
      token: SHARED_TOKEN,
      product_name: documentgit push -u origin main.getElementById("luachon").value,
      price: document.getElementById("gia").value,
      quantity: document.getElementById("soluong").value,
      customer_name: document.getElementById("ten").value,
      phone: document.getElementById("sdt").value,
      email: document.getElementById("email").value,
      address: document.getElementById("diachi").value,
      note: document.getElementById("loinhan").value,
      source: "website",
      user_agent: navigator.userAgent,
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        formStatus.textContent = "✅ Đặt hàng thành công! Mã đơn: " + data.order_id;
        formStatus.style.color = "green";
        giftForm.reset();
      } else {
        formStatus.textContent = "❌ Lỗi: " + data.message;
        formStatus.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      formStatus.textContent = "❌ Có lỗi xảy ra!";
      formStatus.style.color = "red";
    }
  });
}


