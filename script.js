document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const documento = document.getElementById("documento").value;
  const contrasena = document.getElementById("contrasena").value;
  console.log('ada', contrasena);

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documento: documento,
        contrasena: contrasena
      })
    });

    const data = await res.json();
    console.log(data);
    document.getElementById("mensaje").innerText = data.message;
    console.log(data);

    if (data.success && data.user.is_admin) {
      window.location.href = "menu.html"
      sessionStorage.setItem('usuario', data.user.is_admin);
      document.getElementById("mensaje").style.color = "green";
    } else {
      document.getElementById("mensaje").innerText = "No tienes permisos para ingresar"
      document.getElementById("mensaje").style.color = "red";
    }
  } catch (error) {
    document.getElementById("mensaje").innerText = "Error de conexión con el servidor.";
    document.getElementById("mensaje").style.color = "red";
  }
});
