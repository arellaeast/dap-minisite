"use strict";
/*
 * Ask a DAP Expert - knowledge base (concept demo).
 * Every answer is grounded in DAP published material surfaced in research:
 * the Alex Plus FAQ on dap.com, DAP technical data sheets, DAP's own
 * retailer review replies, and DAP's published warranty text.
 * This demo is rule-based on purpose: answers are traceable to a source,
 * never invented. A production version would ground an AI assistant in
 * the same FAQ/TDS corpus the same way.
 */
var KB = [
  {
    keys: ["ducha", "banera", "bañera", "espanol", "español"],
    answer: "No. Alex Plus no es para duchas ni bañeras. La propia página de preguntas frecuentes de DAP lo dice claramente. Para la ducha usa un sellador de silicona 100% de la línea de cocina y baño, como Silicone Max. (Demo en español: dap.com no tiene sitio en español para EE. UU. todavía, y esta es la prueba de cómo se vería.)",
    source: "Alex Plus FAQ, dap.com"
  },
  {
    keys: ["shower", "tub", "bath", "alex plus in", "alex in"],
    answer: "No, not Alex Plus. DAP's own Alex Plus FAQ answers \"Can I use this in a shower?\" with a flat \"No,\" and DAP's retailer replies say it is not designed or recommended as a kitchen and bath sealant. For a shower or tub, use a 100% silicone from the kitchen & bath line, like Silicone Max.",
    source: "Alex Plus FAQ, dap.com"
  },
  {
    priority: 1,
    keys: ["still white", "dries clear", "dry clear", "clear caulk", "clear sealant", "turn clear", "white after"],
    answer: "That is normal for clear sealant. It applies white so you can see where it is going, and dries clear over 7 to 14 days. DAP's own support replies explain the same thing, which tells you the expectation should be set on the product page, not discovered in a review.",
    source: "DAP support reply, retailer reviews"
  },
  {
    keys: ["how long to paint", "paint over", "paint it", "paintable", "before i can paint", "paint in", "dry before paint"],
    answer: "For Alex Plus, 30 minutes. Its FAQ lists paint-ready in 30 minutes, which is why painters like it for trim. Give wider or deeper joints a bit longer, and if paint goes on too early it can crack the skin. Silicone, on the other hand, is not paintable at all, so pick your color first.",
    source: "Alex Plus FAQ, dap.com"
  },
  {
    priority: 2,
    keys: ["how many tubes", "how much caulk", "how much sealant", "coverage", "cover", "calculator", "linear feet", "tubes do i need"],
    answer: "Quick anchor: one 10.1 oz cartridge covers about 55 linear feet at a 3/16\" bead. Bigger joint, way less footage: a 1/2\" bead only gets about 8 feet per cartridge. For your exact joint, run the Sealant Calculator in this demo suite and it will do the volume math with a waste factor built in.",
    source: "DAP published coverage data (Alex Plus TDS)",
    link: { label: "Open the Sealant Calculator", url: "https://arellaeast.github.io/dap-sealant-calculator/" }
  },
  {
    priority: 1,
    keys: ["mold", "mould", "black spots", "mildew"],
    answer: "Mold is the most painful kitchen & bath complaint in the reviews, including one where a sealant with a 20-year warranty started molding after 2 years. Honest process: cut the failed sealant out completely (new sealant will not bond to moldy old sealant), clean and fully dry the joint, then reseal with a mold-resistant kitchen & bath silicone like Silicone Max and let it cure before the shower runs.",
    source: "DAP product positioning + reviewer reports"
  },
  {
    priority: 1,
    keys: ["crack", "shrink", "shrunk", "split", "pull away", "pulled away", "separate"],
    answer: "Shrinking and cracking is the number one 1-star theme for latex caulk, and the cause is usually joint design, not a bad tube. Three checks: 1) Is the joint deeper than half its width? Sealant needs a 1:2 depth-to-width ratio and backer rod on deep joints, or it bonds on three sides and tears. 2) Is it a butt joint? DAP's label excludes butt joints. 3) Was it painted before the 30-minute skin formed? Any of those will crack a good product.",
    source: "Alex Plus FAQ + DAP label exclusions"
  },
  {
    priority: 2,
    keys: ["kwik seal", "never cured", "not curing", "won't cure", "wont cure", "washed away", "washes off", "paste", "cure time", "how long to cure", "dry time", "get wet"],
    answer: "If a kitchen & bath caulk turned to paste or washed out, water reached it before it cured. That is the exact failure in the Kwik Seal Plus reviews: exposed to moisture too early, it never set. Keep the joint dry for the full cure window on the label, run the fan, and do not shower against a fresh seal the same night.",
    source: "Kwik Seal Plus reviewer reports + label cure guidance"
  },
  {
    keys: ["warranty", "claim", "refund", "guarantee", "money back"],
    answer: "Here is the part the website should make easy and does not: DAP's warranty is mail-in. You return the used container and the sales receipt to DAP Products Inc., TCS, 2400 Boston St., Baltimore, MD 21224, for a replacement product or a refund of the sales price, and the warranty does not cover incidental or consequential damage. A self-serve online claim with status tracking is one of the clearest gaps this demo suite points at.",
    source: "DAP published warranty text"
  },
  {
    keys: ["backer rod", "deep joint", "max joint", "maximum joint", "big gap", "wide joint", "how deep", "butt joint"],
    answer: "Most DAP latex sealants are rated for joints up to 1/2\" wide by 1/2\" deep. For anything deeper, push in backer rod first so the sealant depth lands at about half the width (the 1:2 ratio). That saves product and, more important, lets the joint flex without tearing. And skip butt joints and continuous underwater use: DAP's label excludes both.",
    source: "Alex Plus FAQ + DAP label exclusions"
  },
  {
    keys: ["where to buy", "where can i buy", "store", "buy dap", "home depot", "lowes", "in stock"],
    answer: "DAP products are sold at The Home Depot, Lowe's, independent hardware and paint stores, and pro distributors. That is DAP's own answer, and it is also the weak spot: the site cannot tell you if your store has your product in stock today. SKU-level where-to-buy with real inventory is a roadmap item in this demo's research.",
    source: "dap.com FAQ"
  },
  {
    keys: ["phone", "call", "human", "real person", "contact", "customer service", "talk to"],
    answer: "You can reach DAP Technical Customer Service at 888-327-8477. That is the number DAP itself posts in its review replies. This chat exists so the simple questions never need that call, and the hard ones get to a human faster.",
    source: "DAP review replies"
  },
  {
    keys: ["which product", "which caulk", "which sealant", "recommend", "what should i use", "what do i need", "choose", "finder"],
    answer: "That depends on the project, and guessing is how people end up with shower caulk that fails. The Product Finder in this demo suite asks three questions (project, paint, joint size) and gives you the match, plus the warning when the popular pick is wrong.",
    source: "Demo suite",
    link: { label: "Open the Product Finder", url: "https://arellaeast.github.io/dap-product-finder/" }
  },
  {
    keys: ["silicone vs", "latex vs", "difference between silicone", "acrylic", "difference"],
    answer: "Short version: acrylic latex (like Alex Plus) is paintable, cleans up with water, and suits trim and paint prep, but it is not for showers or standing water. 100% silicone (like Silicone Max) is waterproof and flexible for wet areas, but it is not paintable and needs mineral spirits for clean-up. Pick by water first, paint second.",
    source: "DAP product line positioning"
  }
];

var FALLBACK = {
  answer: "I do not have that one in my demo knowledge base yet, and I would rather say that than make something up. Try me on showers, painting, coverage, cracking, mold, cure problems, warranty or where to buy. For anything else, a human at DAP Technical Customer Service can help: 888-327-8477.",
  source: "Demo scope"
};

function matchAnswer(query) {
  var q = " " + String(query || "").toLowerCase() + " ";
  var order = KB.map(function (entry, i) { return { entry: entry, i: i }; });
  order.sort(function (x, y) {
    var px = x.entry.priority || 0, py = y.entry.priority || 0;
    return py !== px ? py - px : x.i - y.i;
  });
  for (var n = 0; n < order.length; n++) {
    var entry = order[n].entry;
    for (var j = 0; j < entry.keys.length; j++) {
      var k = entry.keys[j];
      var hit;
      if (k.indexOf(" ") === -1 && k.indexOf("'") === -1) {
        // Word-start match for single words: "crack" hits "cracked", "mold" hits
        // "moldy", and priority ordering keeps "tubes" with coverage, not "tub"
        hit = new RegExp("\\b" + k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).test(q);
      } else {
        hit = q.indexOf(k) !== -1;
      }
      if (hit) return entry;
    }
  }
  return FALLBACK;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { matchAnswer: matchAnswer, KB: KB, FALLBACK: FALLBACK };
}
