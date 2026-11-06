(function () {
  "use strict";
  var log = document.getElementById("chatLog");
  var form = document.getElementById("chatForm");
  var input = document.getElementById("chatInput");

  function addMsg(text, who, source, link) {
    var div = document.createElement("div");
    div.className = "msg " + who;
    var p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);
    if (link) {
      var a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label + " →";
      a.target = "_blank";
      a.rel = "noopener";
      div.appendChild(a);
    }
    if (source) {
      var s = document.createElement("span");
      s.className = "src";
      s.textContent = "Source: " + source;
      div.appendChild(s);
    }
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  function ask(text) {
    var q = (text || "").trim();
    if (!q) return;
    addMsg(q, "user");
    input.value = "";
    var typing = addMsg("Expert is checking DAP's published answers...", "expert typing");
    setTimeout(function () {
      typing.remove();
      var r = matchAnswer(q);
      addMsg(r.answer, "expert", r.source, r.link || null);
    }, 650);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });
  document.querySelectorAll("#chipsRow button").forEach(function (btn) {
    btn.addEventListener("click", function () { ask(btn.textContent); });
  });

  addMsg("Hi, I am the DAP Expert assistant. Ask me about a product, a joint, or a job that went sideways. My answers come from DAP's own FAQs, data sheets and support replies, and I cite the source every time. Try a question below.", "expert", "Demo knowledge base");
})();
