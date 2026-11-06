(function () {
  "use strict";
  var answers = {};
  var current = 1;
  var steps = { 1: "step1", 2: "step2", 3: "step3", 4: "resultStep" };
  var backBtn = document.getElementById("backBtn");

  function show(n) {
    current = n;
    Object.keys(steps).forEach(function (k) {
      document.getElementById(steps[k]).hidden = parseInt(k, 10) !== n;
    });
    document.getElementById("stepLabel").textContent = n < 4 ? "Step " + n + " of 3" : "Your match";
    document.getElementById("progressBar").style.width = (n / 4 * 100) + "%";
    backBtn.hidden = n === 1 || n === 4;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderResult() {
    var r = recommend(answers);
    document.getElementById("resultName").textContent = r.name;
    document.getElementById("resultTag").textContent = r.tagline;
    var ul = document.getElementById("resultWhy");
    ul.innerHTML = "";
    r.why.forEach(function (w) {
      var li = document.createElement("li");
      li.textContent = w;
      ul.appendChild(li);
    });
    var warn = document.getElementById("resultWarning");
    if (r.warning) { warn.textContent = r.warning; warn.hidden = false; } else { warn.hidden = true; }
    var sec = document.getElementById("resultSecondary");
    if (r.secondary) { sec.textContent = r.secondary; sec.hidden = false; } else { sec.hidden = true; }
  }

  document.querySelectorAll(".opt").forEach(function (btn) {
    btn.addEventListener("click", function () {
      answers[btn.getAttribute("data-q")] = btn.getAttribute("data-value");
      if (current < 3) {
        show(current + 1);
      } else {
        renderResult();
        show(4);
      }
    });
  });

  backBtn.addEventListener("click", function () { if (current > 1) show(current - 1); });
  document.getElementById("restartBtn").addEventListener("click", function () {
    answers = {};
    show(1);
  });

  show(1);
})();
