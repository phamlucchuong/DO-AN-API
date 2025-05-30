const form = document.getElementById("job-form");
const submitBtn = document.getElementById("submit-job-btn");

submitBtn.addEventListener("click", function () {
  const formData = new FormData(form);
  const data = {};

  data.employerId = 1;

  formData.forEach((value, key) => {
    data[key] = value;
  });

  if (data.hasOwnProperty('_remoteOk')) {
    delete data._remoteOk;
  }

  data.remoteOk = form.remoteOk.checked;

  if (!data.status || data.status.trim() === "") {
    data.status = "Open";
  }

  if (data.numberOfVacancies) {
    data.numberOfVacancies = parseInt(data.numberOfVacancies, 10);
    if (isNaN(data.numberOfVacancies)) {
      data.numberOfVacancies = 0;
    }
  }

  console.log("Job Data:", data);

  fetch("/employer/job/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      if (result.success) {
        alert("Save true");
        window.location.href = "/employer/dashboard";
      } else {
        alert("Save failed: " + (result.message || "Unknown error"));
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Save failed: " + error.message);
    });
});
